import Navbar from "../navbar/navbar";
import './mainPage.css';
import backgroundImage from '../../images/db4fcf677cced7c85d1937df5586693f.mp4';
import Header from "../header/header";
import Quote from "../quote/quote";
import News from "../news/news";
import ContactUs from "../contactUs/contactUs";
import {useEffect, useRef, useState} from "react";
import AboutUs from "../aboutUs/aboutUs";
import Footer from "../footer/footer";
import {useLocation} from "react-router-dom";

function MainPage() {
    let quoteEl = useRef();
    let newsEl = useRef();
    let contactUsEl = useRef();
    let aboutUsEl = useRef();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        let sections  = [
            quoteEl.current,
            newsEl.current,
            contactUsEl.current,
            aboutUsEl.current
        ]
        sections.forEach(element => {
            if(element.getBoundingClientRect().top < window.innerHeight - 50  && element.getBoundingClientRect().top > -50) {
                element.classList.add("in-view")
            }
            if(element.getBoundingClientRect().top < window.innerHeight / 2) {
                setNavbarLinks(navbarNavList.map(item => {
                    if(navbarNavList.indexOf(item) === sections.indexOf(element)) {
                        return {...item, active: true};
                    } else {
                        return {...item, active: false};
                    }
                }));
            }
        })
        window.addEventListener("scroll", () => {
            sections.forEach(element => {
                if(element.getBoundingClientRect().top < window.innerHeight - 50  && element.getBoundingClientRect().top > -50) {
                    element.classList.add("in-view")
                }
                if(element.getBoundingClientRect().top < window.innerHeight / 2) {
                    setNavbarLinks(navbarNavList.map(item => {
                        if(navbarNavList.indexOf(item) === sections.indexOf(element)) {
                            return {...item, active: true};
                        } else {
                            return {...item, active: false};
                        }
                    }));
                }
            })
        })
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    },[])

    const location = useLocation();

    useEffect(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }, [location]);


    let [navbarNavList , setNavbarLinks] = useState([
        {
            text: "QUOTE OF THE DAY",
            active: false,
            link: "#quote"
        }, {
            text: "NEWS",
            active: false,
            link: "#news"
        }, {
            text: "CONTACT US",
            active: false,
            link: "#contact-us"
        }, {
            text: "ABOUT US",
            active: false,
            link: "#about-us"
        }
    ]);

    return (
        <div className="main-page-container position-relative w-100 h-100">
            <div className="background-gif position-fixed top-0 right-0 w-100 h-100">
                <video autoPlay={true} loop muted={true} src={backgroundImage}/>
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
            <Navbar navbarNavList={navbarNavList} />
            <Header />
            <Quote quoteEl={quoteEl}/>
            <News  newsEl={newsEl}/>
            <ContactUs contactUs={contactUsEl}/>
            <AboutUs aboutUs={aboutUsEl} />
            <Footer />
        </div>
    );
}

export default MainPage;