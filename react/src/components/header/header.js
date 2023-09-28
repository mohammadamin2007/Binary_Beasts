import './header.css';
import headerVideo from '../../images/y2mate.is - CURIOSITY Featuring Richard Feynman-UjEngEpiJKo-1080pp-1695287595.mp4';

function Header() {
    return (
        <section className="header-main w-100 h-100">
            <video className="w-100 h-100" muted={true} loop={true} autoPlay={true} src={headerVideo}/>
        </section>
    );
}

export default Header;