import './contactUs.css';
import '../../css/media-querys.css';
import {useEffect, useRef} from "react";

let contactUsNavs = [
    {
        icon: "fa fa-twitter",
        href: ""
    }, {
        icon: "fa fa-envelope",
        href: ""
    }, {
        icon: "fa fa-whatsapp",
        href: ""
    }, {
        icon: "fa fa-telegram",
        href: ""
    }
]

function ContactUs(props) {
    let socialContainer = useRef();
    let description = useRef();
    let title = useRef();
    useEffect(() => {
        let sections  = [
            title.current,
            description.current,
            socialContainer.current
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
      <section className="contact-us-main position-relative" id="contact-us" ref={props.contactUs}>
          <div className="contact-us-container container-fluid">
              <div className="contact-us-title d-flex flex-column text-white">
                  <div className="contact-main-title" ref={title}>CONTACT US</div>
                  <div className="contact-main-description" ref={description}>OUR SOCIAL MEDIA IS AVAILABLE AROUND THE CLOCK,TO HELP USERS
                      AND IMPROVE OUR SITE.</div>
              </div>
              <ul ref={socialContainer} className="social-container nav justify-content-center">
                  {contactUsNavs.map((item, index) => {
                    return (
                        <li key={index + 'contactUs'} className={"nav-item " + index} style={{transitionDelay: 0.7 * index + 's'}}>
                            <a href="" className="nav-link nav-link-contact">
                                <i className={item.icon}></i>
                            </a>
                        </li>
                    );
                  })}
              </ul>
          </div>
      </section>
    );
}


export default ContactUs;