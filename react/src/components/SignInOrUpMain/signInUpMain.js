import './signInUpMain.css';
import backgroundImage from "../../images/db4fcf677cced7c85d1937df5586693f.mp4";
import {useEffect, useState} from "react";
import '../../css/media-querys.css';
import navbarIcon from "../../images/navbar-icon.png";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import checkUser from "../../js/checkUser";

function SignInUpMain() {
    let [activeTab, setActiveTab] = useState("signIn");
    let [loginError, setLoginError] = useState(false);
    let [signUpForm, setSignUpForm] = useState({
        inputs: ['userName', 'email', 'password', 'repeatPassword'],
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
    let [userExistError, setUserExistError] = useState(false);
    let [userEmailError, setUserEmailError] = useState(false);
    let navigate = useNavigate();
    const [formError, setFormError] = useState('');
    const [field, setField] = useState('');
    const location = useLocation();
    let [loading, setLoading] = useState(false);

    function handleSelect(e) {
        setField(e.target.value);
        setFormError(e.target.value === "Field");
    }

    function signUpSubmit() {
        setLoading(true);
        let formValid = true;
        setSignUpForm({...signUpForm, formClicked: true})
        for (let i = 0; i < signUpForm.inputs.length; i++) {
            if(!signUpForm[signUpForm.inputs[i]].valid) {
                formValid = false;
                break;
            }
        }
        axios.get("http://localhost:8000/api/user/").then(next => {
            let userJson = {
                "user_name": signUpForm.userName.value,
                "password": signUpForm.password.value,
                "email": signUpForm.email.value,
                "field": field,
            }
            for(let user of next.data) {
                if(user['user_name'] === userJson.user_name) {
                    userExistError = true;
                    break;
                } else {
                    userExistError = false;
                }
            }
            setUserExistError(userExistError);
            if(formValid && !userExistError) {
                axios.post('http://localhost:8000/api/user/',userJson).then(next => {
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000)
                    window.location.reload();
                }).catch(error => {
                    setUserEmailError(true);
                })
            } else {
                setTimeout(() => {
                    setLoading(false);
                }, 3000)
            }
        })
    }
    function loginSubmit() {
        let formValid = true;
        setLoading(true);
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
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000)
                } else {
                    setTimeout(() => {
                        localStorage.setItem("USPSPA", next.data['passwordHash']);
                        window.location.reload();
                    },4000);
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000)
                }
            })
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 3000)
        }
    }

    useEffect(() => {
        checkUser().then(logged => {
            if(logged) {
                navigate('/profile');
            }
        })
    }, []);

    useEffect(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }, [location]);


    return (
        <>
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
                                <div className={`invalid-feedback justify-content-center pb-3 ${userExistError?'d-flex':''}`}>
                                    user name already exists
                                </div>
                                <div className={`invalid-feedback justify-content-center pb-3 ${userEmailError?'d-flex':''}`}>
                                    email already exists
                                </div>
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
                                    }} value={signUpForm.password.value}  className={`form-control text-white ${!signUpForm.password.valid && signUpForm.formClicked?'is-invalid':''}`} id="password-input" placeholder="repeat password"/>
                                    <label htmlFor="repeat-password-input">password</label>
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
                                <div className="form-floating mb-5 pb-5">
                                    <div className="form-floating mb-3">
                                        <select onChange={handleSelect} value={field} required className="form-select text-white" id="field-sign-up-input" name="fieldInput">
                                            <option hidden>Field</option>
                                            <option value="biology">Biology</option>
                                            <option value="mathematics">Mathematics</option>
                                            <option value="chemistry">Chemistry</option>
                                            <option value="physics">Physics</option>
                                        </select>
                                        <label htmlFor="field-input">Field</label>
                                        {formError && <div className="invalid-feedback">{formError}</div>}
                                    </div>
                                    <div className={`invalid-tooltip ${!signUpForm.password.valid && signUpForm.formClicked?'d-flex':''}`}>
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