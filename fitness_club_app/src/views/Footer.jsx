import map from "../assets/map.png";
import phone from "../assets/phone.png";
import whatsapp from "../assets/whatsapp.png";
import email from "../assets/email.png";
import www from "../assets/www.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import youtube from "../assets/youtube.png";


function Footer() {

    return (
        <>
            <div>Contact us</div>
            <div className="footer-container">
                <span><a href="#"><img src={ map } alt="club on map"/>Xxxxxxxxxxxxxxxx st., xx</a></span>
                <span><a href="#"><img src={ phone } alt="club phone number"/>+ xxx xxx xxx</a></span>
                <span><a href="#"><img src={ whatsapp } alt="club WhatsApp"/>+ xxx xxx xxx</a></span>
                <span><a href="#"><img src={ email } alt="club email"/></a>contact@xxxx.com</span>
                <span><a href="#"><img src={ www } alt="club webpage"/>https://xxx.com</a>
                <a href="#"><img src={ instagram } alt="club on Instagram"/></a>
                <a href="#"><img src={ facebook } alt="club on Facebook"/></a>
                <a href="#"><img src={ youtube } alt="club on YouTube"/></a></span>
            </div>
        </>

    )
}

export default Footer;