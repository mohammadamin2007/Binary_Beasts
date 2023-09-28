import {useEffect, useRef} from "react";
import './aboutUs.css'

function AboutUs({aboutUs}) {
    let title = useRef();
    let description = useRef();
    useEffect(() => {
        let sections  = [
            title.current,
            description.current,
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
      <section className="about-us-main pb-5 mt-5 d-flex flex-column" ref={aboutUs} id="about-us">
          <div className="about-us-title title-text" ref={title}>ABOUT US</div>
          <div className="about-us-description description text-white" ref={description}>
              Five years ago our group decided to design this website as a solution to a common problem.
              As a student, we realized that it is time-consuming and difficult to get the right answers to out questions in various fields.
              Now, here you can get answers from experts in the considered field
          </div>
      </section>
    );
}

export default AboutUs;