import navbarIcon from '../../images/navbar-icon.png';
import './navbar.css';
import '../../css/media-querys.css';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import checkUser from "../../js/checkUser";


function Navbar({navbarNavList}) {
    const [scrolled, setScrolled] = useState('');
    const [mobileNavbarOpacity, setMobileNavbarOpacity] = useState(false);
    const [mobileNavbarDisplay, setMobileNavbarDisplay] = useState(false);
    const [logged, setLogged] = useState(false);
    window.addEventListener('scroll', e => {
        if(window.scrollY > 50) {
            setScrolled('scrolled');
        } else {
            setScrolled('');
        }

    })
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

    useEffect(() => {
        checkUser().then(logged => {
            if(logged) {
                setLogged(true);
            } else {
                setLogged(false);
            }
        })
    }, []);

    return (
        <>
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
                        navbarNavList.map((navbarNav, index) => {
                            return (
                                <li key={index + 'navbarNavList'} className="nav-item w-100">
                                    <a href={`${navbarNav.link}`} className={`nav-link d-flex justify-content-center w-100 for-mobile ${navbarNav.active?'active':''}`}>
                                        <div className="nav-link-text">{navbarNav.text}</div>
                                    </a>
                                </li>
                            );
                        })
                    }
                    <li className="nav-item w-100">
                        <Link to="/questions" className="nav-link d-flex justify-content-center w-100 for-mobile">
                            <div className="nav-link-text">Qs&As</div>
                        </Link>
                    </li>
                    {
                        !logged?<li className="nav-item w-100">
                            <Link to="/signInUp" className="nav-link d-flex justify-content-center w-100 for-mobile">
                                <div className="nav-link-text">LOGIN OR REGISTER</div>
                            </Link>
                        </li>:<li className="nav-item w-100">
                            <Link to="/profile" className="nav-link d-flex justify-content-center w-100 for-mobile">
                                <div className="nav-link-text">PROFILE</div>
                            </Link>
                        </li>
                    }
                </ul>
            </div>
            <div className={`navbar position-fixed justify-content-center w-100 d-flex ${scrolled}`}>
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
                        navbarNavList.map((navbarNav, index) => {
                            return (
                                <li key={index + 'navbarNav2'} className="nav-item">
                                    <a href={navbarNav.link} className="nav-link">
                                        <div className="nav-link-text">{navbarNav.text}</div>
                                    </a>
                                </li>
                            );
                        })
                    }
                    <li className="nav-item">
                        <Link to="/questions" className="nav-link">
                            <div className="nav-link-text">QS&AS</div>
                        </Link>
                    </li>
                    {
                        !logged?
                            <li className="nav-item">
                                <Link to="/signInUp" className="nav-link">
                                    <div className="nav-link-text">LOGIN OR REGISTER</div>
                                </Link>
                            </li>:<li className="nav-item">
                                <Link to="/profile" className="nav-link">
                                    <div className="nav-link-text">PROFILE</div>
                                </Link>
                            </li>
                    }
                </ul>
                <div className="navbar-mobile-open d-none" onClick={openMobileNavbar}>
                    <div className="navbar-open-icon-container">
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Navbar;