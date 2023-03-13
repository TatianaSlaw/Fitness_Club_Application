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
        <div className="footer-container">
            <a href="#"><img src={ map } alt="club on map"/></a>
            <a href="#"><img src={ phone } alt="club phone number"/></a>
            <a href="#"><img src={ whatsapp } alt="club WhatsApp"/></a>
            <a href="#"><img src={ email } alt="club email"/></a>
            <a href="#"><img src={ www } alt="club webpage"/></a>
            <a href="#"><img src={ instagram } alt="club on Instagram"/></a>
            <a href="#"><img src={ facebook } alt="club on Facebook"/></a>
            <a href="#"><img src={ youtube } alt="club on YouTube"/></a>
        </div>
    )
}

export default Footer;