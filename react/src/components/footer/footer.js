import './footer.css'
import {useEffect, useRef} from "react";
import navbarIcon from "../../images/navbar-icon.png";


function Footer() {
    let socialMedia = [
        {
            text: "telegram",
            link: ""
        },{
            text: "whatsapp",
            link: ""
        },{
            text: "twitter",
            link: ""
        },{
            text: "email",
            link: ""
        },
    ];
    let legal = [
        {
            text: "terms & conditions",
            link: ""
        },{
            text: "privacy policy",
            link: ""
        },{
            text: "terms of use",
            link: ""
        }
    ];
    let main = useRef();
    useEffect(() => {
        let sections  = [
            main.current
        ]
        window.addEventListener("scroll", () => {
            sections.forEach(element => {
                if(element.getBoundingClientRect().top < window.innerHeight - 20  && element.getBoundingClientRect().top > -50) {
                    element.classList.add("in-view")
                }
            })
        })
    },[])
    return (
        <section className="footer-main my-3" ref={main}>
            <div className="navbar-icon-container mb-5 justify-content-center d-flex">
                <div className="navbar-icon">
                    <img className="navbar-icon-img" src={navbarIcon} alt="navbar-icon" />
                </div>
                <div className="navbar-icon-description flex-column d-flex justify-content-center">
                    <div className="description-title">SCIENTIFIC Q&A</div>
                    <div className="small-description">THE POWER OF TOGETHERNESS</div>
                </div>
            </div>
            <div className="footer-container flex-wrap container-fluid d-flex justify-content-between">
                <div className="footer-section footer-social-container">
                    <div className="footer-title" >SOCIAL</div>
                    <ul className="nav flex-column" >
                        {socialMedia.map((item, index) => {
                            return (
                              <li key={index + 'socialMedia'} className="nav-item" style={{transitionDelay: `${0.2 * (index + 8)}s`}}>
                                  <a className="nav-link" href={item.link}>{item.text}</a>
                              </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="footer-section footer-social-container" style={{transitionDelay: "0.5s"}}>
                    <div className="footer-title">LEGAL</div>
                    <ul className="nav flex-column">
                        {legal.map((item, index) => {
                            return (
                                <li key={index + 'legal'} className="nav-item" style={{transitionDelay: `${(((socialMedia.length + 7) * 0.2) + (0.2 * (index + 1)))}s`}}>
                                    <a className="nav-link" href={item.link}>{item.text}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="footer-section footer-send-main" style={{transitionDelay: "1s"}}>
                    <div className="footer-title">GET UPDATES</div>
                    <form className="footer-form">
                        <div className="footer-input-container position-relative">
                            <i className="fa position-absolute fa-envelope"></i>
                            <input type="email" className="send-main-input form-control bg-transparent text-white"/>
                            <a className="submit-button position-absolute">
                                <i className="fa fa-arrow-up"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}


export default Footer;