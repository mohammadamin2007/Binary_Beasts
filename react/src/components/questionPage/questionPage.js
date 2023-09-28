import './questionPage.css';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import navbarIcon from "../../images/navbar-icon.png";
import backgroundImage from "../../images/8316e1cb15500f145901e68555985f64 (1).mp4";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import getUserData from "../../js/getUserData";
import checkUser from "../../js/checkUser";


function QuestionPage(s) {
    const params = useParams();
    const navigate = useNavigate();
    const [logged, setLogged] = useState(false);
    let [changedDetail, setChangeDetail] = useState({
        id: 1,
        title: "Does the universe have to be metrizable, according to string theory?",
        explanation: "I was thinking about a question in string theory the hole day, after i talked to my professor about that. So i asked it here. help me! Does the universe have to be metrizable, according to string theo",
        field: "physics",
        peopleToShow: "everyOne",
        deadLine: "2023-09-27",
        file1: "http://localhost:8000/uploads/SCIENTIFIC_QA_THE_POWER_OF_TOGETHERNESS_3.pdf",
        file2: "http://localhost:8000/uploads/SCIENTIFIC_QA_THE_POWER_OF_TOGETHERNESS_8.pdf",
        tags: ["THEORICAL PHYSICS , UNIVERSE , STRING THEORY"],
        sender: 9,
        comments: []
    });
    let [canSendAnswer, setCanSendAnswer] = useState(true);
    const [answer, setAnswer] = useState('');
    const [answerError, setAnswerError] = useState('');
    let answerForm = useRef();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/questions/${params['id']}/`).then(next => {
            let object = next.data;
            updateSenderDetails(object, true).then(next => {
                setChangeDetail(next);
                const date = new Date();
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;

                if(formattedDate === next.deadLine) {
                    setCanSendAnswer(false);
                }
            })
        }).catch(error => {
            navigate("/");
        })
        checkUser().then(logged => {
            if(logged) {
                setLogged(true)
            }
        })
    }, []);

    const location = useLocation();

    useEffect(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    }, [location]);


    async function updateSenderDetails(object, commentOrNot) {
        const sender = await axios.get(`http://localhost:8000/api/user/${object.sender}/`);
        if(commentOrNot) {
            const comments = await getComments(object.comments);
            object.comments = comments;
        }
        object.senderName = await sender.data['user_name'];
        object.senderField = await sender.data.field;
        if(commentOrNot) {
            object.tags = object.tags.split(",")
        }
        return object
    }

    async function getComments(commentArray) {
        let commentList = []
        for(const comment of commentArray) {
            const gotCommentFromServer = await axios.get(`http://localhost:8000/api/comment/${comment}/`);
            const updatedComment = await updateSenderDetails(gotCommentFromServer.data, false);
            commentList.push(updatedComment);
        }
        return commentList;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!answer.trim()) {
            setAnswerError('This field is required.');
            return;
        }

        let form = answerForm.current;
        getUserData().then(user => {
            let formData = new FormData();
            formData.append("file1", form.file1Input.files[0] || null);
            formData.append("file2", form.file2Input.files[0] || null);
            formData.append("id", changedDetail.id);
            formData.append("body", answer)
            formData.append("sender", user['user_name'])

            axios.post('http://localhost:8000/addComment/', formData);
            window.location.reload();
        })

        setAnswer('');
        setAnswerError('');
    }

    return (
        <>
            <div className={`navbar question-page-navbar position-fixed w-100 d-flex`}>
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
            <div className="background-gif position-fixed top-0 right-0 w-100 h-100">
                <video autoPlay={true} loop muted={true} src={backgroundImage}/>
            </div>
            <div className="question-page-main d-flex align-items-center justify-content-center">
                <div className="question-page-container w-100 py-3">
                    <div className="question-detail-container">
                        <div className="question-item m-2 mt-3 p-3">
                            <div className="sender-info d-flex">
                                <div className="sender-pic-placeholder">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="name-field text-white ps-3 d-flex align-items-center">
                                    <span className="text">{changedDetail.senderName}, {changedDetail.senderField}</span>
                                </div>
                            </div>
                            <div className="question-description d-flex flex-column">
                                <span className="question-title text-white">
                                    {changedDetail.title}
                                </span>
                                <span className="question-description-text text-white">
                                    {changedDetail.explanation}
                                </span>
                                <span className="question-tags text-white d-flex">
                                    TAGS: {
                                        changedDetail.tags.map((tag, index) => {
                                            return (
                                                <a key={index + 'question-tag-page'} className="text-white nav-link text-decoration-underline p-0" href="">{tag}, </a>
                                            );
                                        })
                                    }
                                </span>
                                <div className="attached-files">
                                    <a className="nav-link"  href={changedDetail.file1}>{changedDetail.file1.replace(/http:\/\/localhost:8000\/uploads\/uploads\//, "")}</a>
                                    <a className="nav-link" href={changedDetail.file2}>{changedDetail.file2.replace(/http:\/\/localhost:8000\/uploads\/uploads\//, "")}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="answers title-text in-view mt-5">ANSWERS</div>
                    {
                        changedDetail.comments.map((comment, index) => {
                            return (
                                <div key={index + 'comment-item'} className="question-answers mt-5">
                                    <div className="question-item m-2 p-3">
                                        <div className="sender-info d-flex">
                                            <div className="sender-pic-placeholder">
                                                <i className="fa fa-user"></i>
                                            </div>
                                            <div className="name-field text-white ps-3 d-flex align-items-center">
                                                <span className="text">{comment.senderName}, {comment.senderField}</span>
                                            </div>
                                        </div>
                                        <div className="question-description d-flex flex-column">
                                            <span className="question-description-text text-white">
                                                {comment.body}
                                            </span>
                                        </div>
                                        <div className="attached-files">
                                            {comment.file1 !== null?<a className="nav-link"  href={comment.file1}>{comment.file1.replace(/http:\/\/localhost:8000\/uploads\/uploads\//, "")}</a>: ''}
                                            {comment.file2 !== null?<a className="nav-link"  href={comment.file2}>{comment.file2.replace(/http:\/\/localhost:8000\/uploads\/uploads\//, "")}</a>: ''}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                    {canSendAnswer && logged?<div className="question-answers send-answer my-5" >
                        <div className="answers title-text in-view">YOUR ANSWER</div>
                        <form ref={answerForm} noValidate className="answer-form mx-3 flex-grow-1 justify-content-between d-flex flex-column" onSubmit={handleSubmit}>
                            <div className="form-inputs">
                                <div className="form-floating mb-3">
                                  <textarea
                                      required
                                      className={`form-control text-white ${answerError ? 'is-invalid' : ''}`}
                                      id="your-answer"
                                      placeholder="Email"
                                      value={answer}
                                      onChange={(e) => setAnswer(e.target.value)}
                                  />
                                <label htmlFor="your-answer">Your answer</label>
                                {answerError && <div className="invalid-feedback">{answerError}</div>}
                                </div>
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
                            <button type="submit" className="btn btn-outline-light">SUBMIT</button>
                        </form>
                    </div>:<div className="bg-warning text-black py-3 px-2 mx-2 my-5 circle">{logged?'The deadline for this question is over, so you cannot send an answer':'you cant send answer until you login'}</div>}
                </div>
            </div>
        </>
    );
}


export default QuestionPage;