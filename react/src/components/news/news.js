import './news.css';
import shaipor from '../../images/shaipor.png';
import newsImage from '../../images/MIT-MathProblemSolver-01-press.jpg';
import googlePlay from '../../images/google-play.jpg';
import {useEffect, useRef} from "react";
import news from "./news";

function News(props) {
    let titleIcon = useRef();
    let news1 = useRef();
    let news2 = useRef();
    let newsTitle = useRef();
    useEffect(() => {
        let sections  = [
            titleIcon.current,
            newsTitle.current,
            news1.current,
            news2.current
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
        <section className="news-section" id="news" ref={props.newsEl}>
            <div className="news-section-title d-flex">
                <div ref={titleIcon} className="title-icon">
                    <img src={shaipor} alt="title-icon" />
                </div>
                <div ref={newsTitle} className="title-text">
                    NEWS
                </div>
            </div>
            <div className="news-section-content">
                <div ref={news1} className="news-item news-item-1 d-flex justify-content-between news-million-users-celebration">
                    <div className="news-image">
                        <img src={newsImage} alt="news-image"/>
                    </div>
                    <div className="news-text">
                        MORE THAN ONE
                        MILLION QUESTIONS
                        WEWE ASKED AND
                        ANSWER IN OUR
                        MATHEMATICS
                        SECTION!!!!
                        <div className="link-news-container position-relative" style={{width: '12rem'}}>
                            <a href="" className="news-link link">READ MORE!</a>
                            <div className="link-background position-absolute w-0 h-100"></div>
                        </div>
                    </div>
                </div>
                <div ref={news2} className="news-item news-item-2 pb-5 d-flex justify-content-between news-our-app">
                    <div className="news-text">
                        AFTER YEARS
                        OF TRYING,
                        FINALLY OUR
                        APP IS OUT!
                        <div className="link-news-container position-relative" style={{width: '12rem'}}>
                            <a href="" className="news-link link">READ MORE!</a>
                            <div className="link-background position-absolute w-0 h-100"></div>
                        </div>
                    </div>
                    <div className="news-image">
                        <img src={googlePlay} alt="news-image"/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default News;