import navbarIcon from "../../images/navbar-icon.png";
import {Link, useLocation} from "react-router-dom";
import questions from "../../images/feaccce658c919a0c09d63c6653fefd8.mp4";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import getUserData from "../../js/getUserData";


function Search() {
    let navbarNavListPage = [
        {
            text: "profile",
            to: "/profile"
        }, {
            text: "main page",
            to: "/"
        }, {
            text: "add yours",
            to: "/add"
        }, {
            text: "Detailed search",
            to: "/detailedSearch"
        }
    ]
    const [scrolled, setScrolled] = useState('');
    const [mobileNavbarOpacity, setMobileNavbarOpacity] = useState(false);
    const [mobileNavbarDisplay, setMobileNavbarDisplay] = useState(false);
    let allContainer = useRef();
    let [changedObject, setChangedObject] = useState([]);
    let [notFound, setNotFound] = useState(true);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let searchedValue = {};
    let [loading, setLoading] = useState(true);

    function openMobileNavbar() {
        setMobileNavbarDisplay(true);
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
        setTimeout(() => {
            setMobileNavbarOpacity(true);
        }, 200)
    }
    function closeMobileNavbar() {
        setMobileNavbarOpacity(false);
        setTimeout(() => {
            setMobileNavbarDisplay(false);
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }, 500)
    }

    function isSubset(list1, list2) {
        let list2C = []
        let list1C = []
        for(let listItem of list2) {
            list2C.push(listItem.trim())
        }
        for(let listItem of list1) {
            list1C.push(listItem.trim())
        }
        return list1C.every(item => list2C.includes(item));
    }

    useEffect(() => {
        let sections  = [
            allContainer.current
        ]
        window.addEventListener("scroll", () => {
            sections.forEach(element => {
                if(element.getBoundingClientRect().top < window.innerHeight - 50  && element.getBoundingClientRect().top > -50) {
                    element.classList.add("in-view")
                }
            })
            if(window.scrollY > 50) {
                setScrolled('scrolled');
            } else {
                setScrolled('');
            }
        })
        searchedValue.field = queryParams.get("field") === null?"":queryParams.get('field');
        searchedValue.questioner = queryParams.get('questioner') === null?"":queryParams.get('questioner');
        searchedValue.date = queryParams.get("date") === null?"":queryParams.get('date');
        searchedValue.tags = queryParams.get("tag") === null?"":queryParams.get('tag');
        axios.post("http://localhost:8000/getRangeQuestion", {"start_number": 0}).then(next => {
            let object = next.data;
            updateSenderDetails(object).then(next => {
                let foundObj = [];
                setLoading(false);
                next.forEach(objectItem => {
                    if((objectItem.field === searchedValue.field || searchedValue.field === "") && (objectItem.senderName === searchedValue.questioner || searchedValue.questioner === "") && (objectItem.date === searchedValue.date || searchedValue.date === "") && (isSubset(searchedValue.tags.split(","), objectItem.tags) || searchedValue.tags === "")) {
                        foundObj.push(objectItem);
                    }
                })
                if(foundObj.length === 0) {
                    setNotFound(true);
                } else {
                    setNotFound(false);
                    setChangedObject(foundObj)
                }
            })
        })
    },[])

    async function getMore() {
        setLoading(true);
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "16px";
        let startNumber = changedObject.length + 2;
        setTimeout(() => {
            axios.post("http://localhost:8000/getRangeQuestion", {"start_number": startNumber}).then(next => {
                let object = next.data;
                updateSenderDetails(object).then(next => {
                    let foundObj = [];
                    setLoading(false);
                    next.forEach(objectItem => {
                        if((objectItem.field === searchedValue.field || searchedValue.field === "") && (objectItem.senderName === searchedValue.questioner || searchedValue.questioner === "") && (objectItem.date === searchedValue.date || searchedValue.date === "") && (isSubset(searchedValue.tags.split(","), objectItem.tags) || searchedValue.tags === "")) {
                            foundObj.push(objectItem);
                        }
                    })
                    if(foundObj.length !== 0) {
                        setChangedObject(foundObj);
                    }
                    document.body.style.overflow = "";
                    document.body.style.paddingRight = "";
                })
            })
        }, 2000)
    }

    async function updateSenderDetails(objects) {
        for (const object of objects.reverse()) {
            const sender = await axios.get(`http://localhost:8000/api/user/${object.sender}/`);
            object.senderName = await sender.data['user_name'];
            object.senderField = await sender.data.field;
            object.tags = object.tags.split(",")
        }
        return [...removeDuplicates(objects)]
    }

    function removeDuplicates(array) {
        const uniqueArray = array.filter(
            (obj, index, self) =>
                index ===
                self.findIndex(
                    (o) => JSON.stringify(o) === JSON.stringify(obj)
                )
        );
        return uniqueArray;
    }

    return (
        <div className="questions-main position-relative w-100 h-100">
            <div className={`mobile-nav position-fixed top-0 end-0 w-100 h-100 ${mobileNavbarDisplay?'d-block':'d-none'}  ${mobileNavbarOpacity?'opacity-100':'opacity-0'}`}>
                <div className="navbar-icon-container justify-content-center d-flex">
                    <div className="navbar-icon">
                        <img className="navbar-icon-img" src={navbarIcon} alt="navbar-icon" />
                    </div>
                    <div className="navbar-icon-description flex-column d-flex justify-content-center">
                        <div className="description-title">SCIENTIFIC Q&A</div>
                        <div className="small-description">THE POWER OF TOGETHERNESS</div>
                    </div>
                </div>
                <ul className="navbar-nav nav d-flex h-100 align-items-center">
                    <a onClick={closeMobileNavbar} className="close-button nav-link for-mobile position-absolute end-0">
                        <i className="fa fa-close"></i>
                    </a>
                    {
                        navbarNavListPage.map((navbarNav, index) => {
                            return (
                                <li key={"search-open-model-navbar"+ index} className="nav-item w-100">
                                    <Link to={navbarNav.to} className="nav-link d-flex justify-content-center w-100 for-mobile">
                                        <div className="nav-link-text">{navbarNav.text}</div>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <div className={`navbar position-fixed justify-content-center  w-100 d-flex ${scrolled}`}>
                <div className="navbar-icon-container d-flex">
                    <div className="navbar-icon">
                        <img className="navbar-icon-img" src={navbarIcon} alt="navbar-icon" />
                    </div>
                    <div className="navbar-icon-description flex-column d-flex justify-content-center">
                        <div className="description-title">SCIENTIFIC Q&A</div>
                        <div className="small-description">THE POWER OF TOGETHERNESS</div>
                    </div>
                </div>
                <ul className="navbar-nav nav d-flex flex-row">
                    {
                        navbarNavListPage.map((navbarNav, index) => {
                            return (
                                <li key={"search-main-navbar" + index} className="nav-item">
                                    <Link to={navbarNav.to} className="nav-link">
                                        <div className="nav-link-text">{navbarNav.text}</div>
                                    </Link>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className="navbar-mobile-open d-none" onClick={openMobileNavbar}>
                    <div className="navbar-open-icon-container">
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </div>
            <div className={`loading-container position-fixed w-100 h-100 ${loading?'show-loading':''}`}>
                <svg className="bike" viewBox="0 0 48 30" width="48px" height="30px">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
                        <g transform="translate(9.5,19)">
                            <circle className="bike__tire" r="9" strokeDasharray="56.549 56.549" />
                            <g className="bike__spokes-spin" strokeDasharray="31.416 31.416" strokeDashoffset="-23.562">
                                <circle className="bike__spokes" r="5" />
                                <circle className="bike__spokes" r="5" transform="rotate(180,0,0)" />
                            </g>
                        </g>
                        <g transform="translate(24,19)">
                            <g className="bike__pedals-spin" strokeDasharray="25.133 25.133" strokeDashoffset="-21.991" transform="rotate(67.5,0,0)">
                                <circle className="bike__pedals" r="4" />
                                <circle className="bike__pedals" r="4" transform="rotate(180,0,0)" />
                            </g>
                        </g>
                        <g transform="translate(38.5,19)">
                            <circle className="bike__tire" r="9" strokeDasharray="56.549 56.549" />
                            <g className="bike__spokes-spin" strokeDasharray="31.416 31.416" strokeDashoffset="-23.562">
                                <circle className="bike__spokes" r="5" />
                                <circle className="bike__spokes" r="5" transform="rotate(180,0,0)" />
                            </g>
                        </g>
                        <polyline className="bike__seat" points="14 3,18 3" strokeDasharray="5 5" />
                        <polyline className="bike__body" points="16 3,24 19,9.5 19,18 8,34 7,24 19" strokeDasharray="79 79" />
                        <path className="bike__handlebars" d="m30,2h6s1,0,1,1-1,1-1,1" strokeDasharray="10 10" />
                        <polyline className="bike__front" points="32.5 2,38.5 19" strokeDasharray="19 19" />
                    </g>
                </svg>
            </div>
            <div className="background-gif position-fixed top-0 right-0 w-100 h-100">
                <video autoPlay={true} loop muted={true} src={questions}/>
            </div>
            <div className="question-container d-flex flex-column">
                <div ref={allContainer} className="category-container in-view main-container all">
                    <div className="all title-text category-title text-white">ALL QUESTIONS</div>
                    <div className="d-flex flex-wrap ">
                        {
                            notFound?<div className="bg-warning">no items found please change your filters</div>:changedObject.map((question, index) => {
                                return (
                                    <Link key={"found-item" + index} to={`/question/${question.id}`} className="text-decoration-none question-item all-questions m-2 mt-3 p-3">
                                        <div className="sender-info d-flex">
                                            <div className="sender-pic-placeholder">
                                                <i className="fa fa-user"></i>
                                            </div>
                                            <div className="name-field text-white ps-3 d-flex align-items-center">
                                                <span className="text">{question.senderName}, {question.senderField}</span>
                                            </div>
                                        </div>
                                        <div className="question-description d-flex flex-column">
                                        <span className="question-title text-white">
                                            {question.title}
                                        </span>
                                            <span className="question-tags text-white d-flex">
                                            TAGS: {question.tags.map((item, index1) => {
                                                return <a key={"found-item-tag" + index + index1} className="text-white mx-1 nav-link text-decoration-underline p-0" href="">{item} ,</a>
                                            })}
                                        </span>
                                        </div>
                                    </Link>
                                );
                            })
                        }
                    </div>
                    {notFound?'':<div className="get-more mt-5">
                        <button type="button" onClick={getMore} className="btn btn-outline-light">get More!</button>
                    </div>}

                </div>
            </div>
        </div>

    )
}


export default Search;