import './signInUpMain.css';
import backgroundImage from "../../images/db4fcf677cced7c85d1937df5586693f.mp4";
import {useEffect, useState} from "react";
import '../../css/media-querys.css';
import navbarIcon from "../../images/navbar-icon.png";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import CheckUser from "../../js/checkUser";
import checkUser from "../../js/checkUser";

function SignInUpMain() {
    let [activeTab, setActiveTab] = useState("signIn");
    let [loginError, setLoginError] = useState(false);
    let [signUpForm, setSignUpForm] = useState({
        inputs: ['userName', 'email', 'password', 'repeatPassword', 'field', 'degree'],
        formClicked: false,
        userName: {
            value: "",
            valid: false,
        },
        email: {
            value: "",
            valid: false,
        }, password: {
            value: "",
            valid: false,
        }, repeatPassword: {
            value: "",
            valid: false,
        }, field: {
            value: "",
            valid: false,
        }, degree: {
            value: "",
            valid: false,
        }
    });
    let [loginForm, setLoginForm] = useState({
        inputs: ['userName', 'password'],
        formClicked: false,
        userName: {
            value: "",
            valid: false,
        },
        password: {
            value: "",
            valid: false,
        }
    });
    let [userExistError, setUserExistError] = useState(true);
    let navigate = useNavigate();

    function signUpSubmit() {
        let formValid = true;
        setSignUpForm({...signUpForm, formClicked: true})
        for (let i = 0; i < signUpForm.inputs.length; i++) {
            if(!signUpForm[signUpForm.inputs[i]].valid) {
                formValid = false;
                break;
            }
        }
        axios.get("http://localhost:8000/api/user").then(next => {
            for(let user of next) {
                console.log(user)
            }
            if(formValid && !userExistError) {
                let userJson = {
                    "user_name": signUpForm.userName.value,
                    "password": signUpForm.password.value,
                    "email": signUpForm.email.value,
                    "field": signUpForm.field.value,
                    "degree": signUpForm.degree.value
                }

                axios.post('http://localhost:8000/api/user/',userJson).then(next => {
                    window.location.reload();
                })
            }
        })
    }
    function loginSubmit() {
        let formValid = true;
        setLoginForm({...loginForm, formClicked: true})
        for (let i = 0; i < loginForm.inputs.length; i++) {
            if(!loginForm[loginForm.inputs[i]].valid) {
                formValid = false;
                break;
            }
        }
        if(formValid) {
            let userJson = {
                "user_name": loginForm.userName.value,
                "password": loginForm.password.value,
            }
            axios.post('http://localhost:8000/login/', userJson).then(next => {
                if(next.data.error) {
                    setLoginError(true);
                } else {
                    localStorage.setItem("USPSPA", next.data['passwordHash']);
                    window.location.reload();
                }
            })
        }
    }

    useEffect(() => {
        checkUser().then(logged => {
            if(logged) {
                navigate('/profile');
            }
        })
    }, []);

    const location = useLocation();

    useEffect(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }, [location]);


    return (
        <>
            <div className={`navbar sign-in-up-navbar position-fixed w-100 d-flex`}>
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
                    history.back();
                }}>
                    <div className="navbar-open-icon-container">
                        <i className="fa fa-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div className="sign-in-up-main d-flex align-items-center h-100 justify-content-center">
                <div className="background-gif position-fixed top-0 right-0 w-100 h-100">
                    <video autoPlay={true} loop muted={true} src={backgroundImage}/>
                </div>
                <div className="sign-in-up-container d-flex flex-column">
                    <div className="sign-in-up-nav-container mb-3">
                        <ul className="sign-in-up-nav nav">
                            <li className="nav-item">
                                <a onClick={() => {setActiveTab("signIn")}} className={`nav-link ${activeTab === "signIn"?"active":""}`}>
                                    SING IN
                                </a>
                            </li>
                            <li className="nav-item">
                                <a onClick={() => {setActiveTab("signUp")}} className={`nav-link ${activeTab === "signUp"?"active":""}`}>
                                    SIGN UP
                                </a>
                            </li>
                        </ul>
                    </div>
                    {activeTab === "signIn"?
                        <form onSubmit={e => {
                            e.preventDefault();
                            loginSubmit();
                        }} className="sign-in-form flex-grow-1 justify-content-between d-flex flex-column">
                            <div className="form-inputs">
                                <div className={`invalid-feedback justify-content-center pb-3 ${loginError?'d-flex':''}`}>
                                    username or password is wrong
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={(e ) => {
                                        setLoginForm({...loginForm, userName: {
                                                value: e.target.value,
                                                valid: e.target !== ''
                                            }})
                                    }} value={loginForm.userName.value}  type="text" className="form-control text-white" id="floatingInput" placeholder="Email" />
                                    <label htmlFor="floatingInput">user name</label>
                                    <div className={`invalid-tooltip ${!loginForm.userName.valid && loginForm.formClicked?'d-flex':''}`}>
                                        this field shouldn't be empty
                                    </div>
                                </div>
                                <div className="form-floating mb-5">
                                    <input onChange={(e ) => {
                                        setLoginForm({...loginForm, password: {
                                                value: e.target.value,
                                                valid: e.target.value !== '',
                                            }})
                                    }} value={loginForm.password.value}  type="password" className="form-control text-white" id="floatingPassword" placeholder="Password"/>
                                    <label htmlFor="floatingPassword">Password</label>
                                    <div className={`invalid-tooltip ${!loginForm.password.valid && loginForm.formClicked?'d-flex':''}`}>
                                        this field shouldn't be empty
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-light">Login</button>
                        </form> :
                        <form onSubmit={e => {
                            e.preventDefault();
                            signUpSubmit();
                        }} className="sign-in-form flex-grow-1 justify-content-between d-flex flex-column">
                            <div className="form-inputs">
                                <div className="form-floating mb-3">
                                    <input onChange={(e ) => {
                                        setSignUpForm({...signUpForm, userName: {
                                            value: e.target.value,
                                            valid: e.target.value !== '',
                                        }})
                                    }} value={signUpForm.userName.value} type="text" className={`form-control text-white ${!signUpForm.userName.valid && signUpForm.formClicked?'is-invalid':''}`} id="user-name-input" placeholder="user name" />
                                    <label htmlFor="user-name-input">User name</label>
                                    <div className={`invalid-tooltip ${!signUpForm.userName.valid && signUpForm.formClicked?'d-flex':''}`}>
                                        this field shouldn't be empty
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={(e ) => {
                                        setSignUpForm({...signUpForm, email: {
                                                value: e.target.value,
                                                valid: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)
                                        }})
                                    }} value={signUpForm.email.value} type="email" className={`form-control text-white ${!signUpForm.email.valid && signUpForm.formClicked?'is-invalid':''}`} id="email-input" placeholder="Email" />
                                    <label htmlFor="email-input">Email address</label>
                                    <div className={`invalid-tooltip ${!signUpForm.email.valid && signUpForm.formClicked?'d-flex':''}`}>
                                        email isn't correct
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" onChange={(e ) => {
                                        setSignUpForm({...signUpForm, password: {
                                                value: e.target.value,
                                                valid: e.target.value !== ''
                                        }})
                                    }} value={signUpForm.password.value} className={`form-control text-white ${!signUpForm.password.valid && signUpForm.formClicked?'is-invalid':''}`} id="password-input" placeholder="Password"/>
                                    <label htmlFor="password-input">Password</label>
                                    <div className={`invalid-tooltip ${!signUpForm.password.valid && signUpForm.formClicked?'d-flex':''}`}>
                                        this field shouldn't be empty
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" onChange={(e ) => {
                                        setSignUpForm({...signUpForm, repeatPassword: {
                                                value: e.target.value,
                                                valid: e.target.value !== '' && e.target.value === signUpForm.password.value
                                        }})
                                    }} value={signUpForm.repeatPassword.value}  className={`form-control text-white ${!signUpForm.repeatPassword.valid && signUpForm.formClicked?'is-invalid':''}`} id="repeat-password-input" placeholder="repeat password"/>
                                    <label htmlFor="repeat-password-input">Repeat password</label>
                                    <div className={`invalid-tooltip ${!signUpForm.repeatPassword.valid && signUpForm.formClicked?'d-flex':''}`}>
                                        repeat password doesn't match
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" onChange={(e ) => {
                                        setSignUpForm({...signUpForm, field: {
                                                value: e.target.value,
                                                valid: e.target.value !== ''
                                            }})
                                    }} value={signUpForm.field.value}  className={`form-control text-white ${!signUpForm.field.valid && signUpForm.formClicked?'is-invalid':''}`} id="field-input" placeholder="field"/>
                                    <label htmlFor="field-input">Field</label>
                                    <div className={`invalid-tooltip ${!signUpForm.field.valid && signUpForm.formClicked?'d-flex':''}`}>
                                        this field shouldn't be empty
                                    </div>
                                </div>
                                <div className="form-floating mb-5">
                                    <input type="text" onChange={(e ) => {
                                        setSignUpForm({...signUpForm, degree: {
                                                value: e.target.value,
                                                valid: e.target.value !== ''
                                            }})
                                    }} value={signUpForm.degree.value} className={`form-control text-white ${!signUpForm.degree.valid && signUpForm.formClicked?'is-invalid':''}`} id="degree-input" placeholder="field"/>
                                    <label htmlFor="degree-input">degree</label>
                                    <div className={`invalid-tooltip ${!signUpForm.degree.valid && signUpForm.formClicked?'d-flex':''}`}>
                                        this field shouldn't be empty
                                    </div>
                                </div>
                            </div>
                        <button type="submit" className="btn btn-outline-light">Register</button>
                        </form>}
                </div>
            </div>
        </>
    );
}

export default SignInUpMain;