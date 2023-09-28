import './addYours.css';
import backgroundImage from "../../images/0b95abf5f96cdd0d9638a751854124a6.mp4";
import '../../css/media-querys.css';
import navbarIcon from "../../images/navbar-icon.png";
import {useEffect, useRef} from "react";
import getUserData from "../../js/getUserData";
import axios from "axios";
import checkUser from "../../js/checkUser";
import {useLocation, useNavigate} from "react-router-dom";

function AddYours() {
    let formRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }, [location]);

    useEffect(() => {
        checkUser().then(logged => {
            if(!logged) {
                window.history.go(-1);
            }
        })
    }, []);
    function formOnSubmit(event) {
        event.preventDefault();

        let form = formRef.current;
        const today = new Date();
        const selectedDate = new Date(form.dateInput.value);

        if (selectedDate <= today) {
            form.dateInput.setCustomValidity('Please select a date later than today.');
            form.reportValidity();
            return;
        }
        if (form.fieldInput.value === 'Field') {
            form.fieldInput.setCustomValidity('Please select a valid field.');
            form.reportValidity();
            return;
        }

        if ((form.checkValidity() || form.fieldInput.value !== 'Field') && today <= selectedDate) {
            if (selectedDate <= today) {
                form.dateInput.setCustomValidity('Please select a date later than today.');
                form.reportValidity();
                return;
            }
            if (form.fieldInput.value === 'Field') {
                form.fieldInput.setCustomValidity('Please select a valid field.');
                form.reportValidity();
                return;
            }
            let formData = new FormData();
            formData.append('title', form.titleInput.value);
            formData.append('explanation', form.explanationInput.value);
            formData.append('deadLine', form.dateInput.value);
            formData.append('file1', form.file1Input.files[0] || null);
            formData.append('file2', form.file2Input.files[0] || null);
            formData.append('field', form.fieldInput.value);
            formData.append('peopleToShow', 'everyOne');
            formData.append('tags', form.tagInput.value);

            getUserData().then(user => {
                formData.append('userName', user['user_name']);
                axios.post("http://localhost:8000/addNewQuestion", formData).then(next => {
                    navigate("/questions");
                })
            })
        } else {
            form.classList.add('was-validated');
        }
    }

    return (
        <>
            <div className={`navbar add-yours-navbar position-fixed w-100 d-flex`}>
                <div className="navbar-icon-container d-flex">
                    <div className="navbar-icon">
                        <img className="navbar-icon-img" src={navbarIcon} alt="navbar-icon" />
                    </div>
                    <div className="navbar-icon-description flex-column d-flex justify-content-center">
                        <div className="description-title">SCIENTIFIC Q&A</div>
                        <div className="small-description">THE POWER OF TOGETHERNESS</div>
                    </div>add-yours
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
            <div className="add-yours-main d-flex align-items-center justify-content-center">
                <div className="background-gif position-fixed top-0 right-0 w-100 h-100">
                    <video autoPlay={true} loop muted={true} src={backgroundImage}/>
                </div>
                <div className="add-yours-container d-flex flex-column">
                    <div className="add-yours-container-title title-text in-view mb-2 text-center ms-0">ADD QUESTION</div>
                    <form
                        className="sign-in-form flex-grow-1 justify-content-between d-flex flex-column"
                        noValidate
                        ref={formRef}
                    >
                        <div className="form-inputs">
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    className="form-control text-white"
                                    id="title-input"
                                    placeholder="Email"
                                    name="titleInput"
                                />
                                <label htmlFor="title-input">Title</label>
                                <div className="invalid-feedback py-2">This field is required</div>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    required
                                    className="form-control text-white"
                                    id="explanation-input"
                                    placeholder="Password"
                                    name="explanationInput"
                                />
                                <label htmlFor="explanation-input">Explanation</label>
                                <div className="invalid-feedback py-2">This field is required</div>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="date"
                                    required
                                    className="form-control text-white"
                                    id="date-input"
                                    placeholder="Password"
                                    name="dateInput"
                                />
                                <label htmlFor="date-input">Deadline</label>
                                <div className="invalid-feedback py-2">This field is required</div>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    required
                                    className="form-control text-white"
                                    id="tag-input"
                                    placeholder="Password"
                                    name="tagInput"
                                />
                                <label htmlFor="date-input">tag</label>
                                <div className="invalid-feedback py-2">This field is required</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">
                                    File/Document
                                </label>
                                <input className="form-control" type="file" id="formFile1" name="file1Input" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">
                                    File/Document
                                </label>
                                <input className="form-control" type="file" id="formFile2" name="file2Input" />
                            </div>

                            <div className="form-floating mb-3">
                                <select required className="form-select text-white" id="field-input" name="fieldInput">
                                    <option hidden>Field</option>
                                    <option value="biology">Biology</option>
                                    <option value="mathematics">Mathematics</option>
                                    <option value="chemistry">Chemistry</option>
                                    <option value="physics">Physics</option>
                                </select>
                                <label htmlFor="field-input">Field</label>
                                <div className="invalid-feedback py-2">This field is required</div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-outline-light" onClick={(e) => {formOnSubmit(e);}}>
                            Submit!
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddYours;