import './profile.css';
import navbarIcon from "../../images/navbar-icon.png";
import backgroundImage from "../../images/d1b90c6b190ae790e59aca70b08fc0e2.mp4";
import {useEffect, useRef, useState} from "react";
import checkUser from "../../js/checkUser";
import getUserData from "../../js/getUserData";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";


function Profile() {
    let [userData, setUserData] = useState({
        "user_name": ""
    });
    let [currentFeedback, setCurrentFeedback] = useState(false);
    let currentPassword = useRef();
    let newPassword = useRef();
    const navigate = useNavigate();
    let [changedObject, setChangedObject] = useState([]);

    useEffect(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        checkUser().then(logged => {
            if(!logged) {
                window.history.go(-3);
            }
        })
        getUserData().then(data => {
            setUserData(data);
            axios.get("http://localhost:8000/api/questions/").then(next => {
                let object = next.data
                updateSenderDetails(object).then(next => {
                    let foundObj = [];
                    next.forEach(objectItem => {
                        if(objectItem.senderName === data['user_name']) {
                            foundObj.push(objectItem);
                        }
                    })
                    setChangedObject(foundObj)
                })
            })
        });

    },[])

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
    function changePassword() {
        if(currentPassword.current.value === userData['password']) {
            let changePasswordData = {
                "userName": userData['user_name'],
                "password": newPassword.current.value
            }
            axios.post("http://localhost:8000/changePassword/", changePasswordData).then(next => {
                localStorage.removeItem("USPSPA");
                navigate("/");
            })
            setCurrentFeedback(false);
        } else {
            setCurrentFeedback(true);
        }
    }


    function logOutHandel(e) {
        localStorage.removeItem("USPSPA");
        navigate("/");
    }

    return (
        <div className="profile-main-section">
            <div className={`navbar profile-navbar position-fixed w-100 d-flex`}>
                <div className="navbar-icon-container d-flex">
                    <div className="navbar-icon">
                        <img className="navbar-icon-img" src={navbarIcon} alt="navbar-icon" />
                    </div>
                    <div className="navbar-icon-description flex-column d-flex justify-content-center">
                        <div className="description-title">SCIENTIFIC Q&A</div>
                        <div className="small-description">THE POWER OF TOGETHERNESS</div>
                    </div>
                </div>
                <div className="navbar-mobile-open navbar-back" onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    history.go(-3);
                }}>
                    <div className="navbar-open-icon-container">
                        <i className="fa fa-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div className="profile-main d-flex align-items-center h-100 justify-content-center">
                <div className="background-gif position-fixed top-0 right-0 w-100 h-100">
                    <video autoPlay={true} loop muted={true} src={backgroundImage}/>
                </div>
                <div className="profile-main-container w-100 d-flex flex-column align-items-center">
                    <div className="profile-image-place-holder">
                        <div className="profile-image">
                            <i className="fa fa-user"></i>
                        </div>
                    </div>
                    <div className="profile-info">
                        <div className="username title-text mt-0 in-view">user Name: {userData['user_name']}</div>
                        <div className="user-score title-text mt-0 in-view">score: {userData['score']}</div>
                        <form className="change-password-form flex-grow-1 justify-content-between d-flex flex-column">
                            <div className="form-inputs">
                                <div className="form-floating mb-3">
                                    <input required ref={currentPassword} type="password" className="form-control text-white" id="change-password" placeholder="Email" />
                                    <label htmlFor="change-password">current password</label>
                                </div>
                                <div className={`invalid-feedback pb-3 ${currentFeedback?'d-flex':''}`}>
                                    current password is wrong
                                </div>
                            </div>
                            <div className="form-inputs">
                                <div className="form-floating mb-3">
                                    <input required ref={newPassword} type="password" className="form-control text-white" id="new-password" placeholder="Email" />
                                    <label htmlFor="new-password">new password</label>
                                </div>
                            </div>
                            <button onClick={() => {
                                changePassword();
                            }} type="button" className="btn btn-outline-light">change password</button>
                        </form>
                        <div className="asked-questions flex flex-column mt-5">
                            <div className="asked-question-title title-text in-view">Asked Questions</div>
                            <div className="category-container in-view question-container main-container all">
                                <div className="d-flex flex-wrap ">
                                    {
                                        changedObject.map((question, index) => {
                                            return (
                                                <Link key={index + 'question-item'} to={`/question/${question.id}`} className="text-decoration-none question-item all-questions m-2 mt-3 p-3">
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
                                                                            return <a key={"question-main-page-tag" + index + index1} className="text-white mx-1 nav-link text-decoration-underline p-0" href="">{item} ,</a>
                                                                        })}
                                                        </span>
                                                    </div>
                                                </Link>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={logOutHandel} type="button" className="btn btn-outline-danger w-100">EXIT</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;