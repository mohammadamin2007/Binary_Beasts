import {useEffect, useState} from "react";
import './detailedSearch.css';
import backgroundImage from "../../images/e8441fedbb09943dd68295ff6040629f.mp4";
import '../../css/media-querys.css';
import navbarIcon from "../../images/navbar-icon.png";
import {useLocation, useNavigate} from "react-router-dom";

function DetailedSearch() {
    const [field, setField] = useState('');
    const [questioner, setQuestioner] = useState('');
    const [date, setDate] = useState('');
    const [tag, setTag] = useState('');
    const [formError, setFormError] = useState('');
    const navigator = useNavigate();

    const location = useLocation();

    useEffect(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }, [location]);


    function handleSubmit(e) {
        e.preventDefault();
        navigator(`/search?field=${field}&questioner=${questioner}&date=${date}&tag=${tag}`);
    }

    function handleSelect(e) {
        setField(e.target.value);
        setFormError('');
    }

    return (
        <>
            <div className={`navbar detailed-search-navbar position-fixed w-100 d-flex`}>
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
            <div className="detailed-search-main d-flex align-items-center h-100 justify-content-center">
                <div className="background-gif position-fixed top-0 right-0 w-100 h-100">
                    <video autoPlay={true} loop muted={true} src={backgroundImage}/>
                </div>
                <div className="detailed-search-container d-flex flex-column">
                   <div className="detailed-title-container title-text in-view mb-2 text-center ms-0">SEARCH</div>
                    <form noValidate className="sign-in-form flex-grow-1 justify-content-between d-flex flex-column" onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <div className="form-floating mb-3">
                                <select onChange={handleSelect} value={field} required className="form-select text-white" id="field-input" name="fieldInput">
                                    <option hidden>Field</option>
                                    <option value="biology">Biology</option>
                                    <option value="mathematics">Mathematics</option>
                                    <option value="chemistry">Chemistry</option>
                                    <option value="physics">Physics</option>
                                </select>
                                <label htmlFor="field-input">Field</label>
                                {formError && <div className="invalid-feedback">{formError}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    className={`form-control text-white ${formError ? 'is-invalid' : ''}`}
                                    id="questioner"
                                    placeholder="Password"
                                    value={questioner}
                                    onChange={(e) => setQuestioner(e.target.value)}
                                />
                                <label htmlFor="questioner">Questioner</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="date"
                                    className={`form-control text-white ${formError ? 'is-invalid' : ''}`}
                                    id="date-input"
                                    placeholder="Password"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <label htmlFor="date-input">Date</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    required
                                    type="text"
                                    className={`form-control text-white ${formError ? 'is-invalid' : ''}`}
                                    id="tag-input"
                                    placeholder="Password"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                                <label htmlFor="tag-input">Tag</label>
                                <div className="text-black warning-text bg-warning">Put commas to separate tags</div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-light">
                            FIND!
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default DetailedSearch;