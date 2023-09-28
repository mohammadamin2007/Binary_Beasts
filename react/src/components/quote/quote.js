import './quote.css';
import {useEffect, useRef} from "react";


function Quote(props) {
    let title = useRef();
    let description = useRef();
    let button = useRef();
    useEffect(() => {
        let sections  = [
            title.current,
            description.current,
            button.current
        ]
        window.addEventListener("scroll", () => {
            sections.forEach(element => {
                if(element.getBoundingClientRect().top < window.innerHeight  && element.getBoundingClientRect().top > -50) {
                    element.classList.add("in-view")
                }
            })
        })
    },[])
    return (
        <section className="quote-main" id="quote" ref={props.quoteEl}>
            <div className="quote-main-container container-fluid p-0 d-flex flex-column">
                <div ref={title} className="title text-white mb-2 flex">QUOTE OF THE DAY</div>
                <div ref={description} className="description text-white position-relative d-flex flex-wrap">
                    “The important thing is not to stop questioning. Curiosity has its own
                    reason for existence. One cannot help but be in awe when he
                    contemplates the mysteries of eternity, of life, of the marvelous
                    structure of reality. It is enough if one tries merely to comprehend a
                    little of this mystery each day’’
                </div>
                <div ref={button} className="link-container position-relative">
                    <a href="" className="text-white link text-decoration-underline">Albert Einstein</a>
                    <div className="link-background position-absolute w-0 h-100"></div>
                </div>
            </div>
        </section>
    );
}


export default Quote;