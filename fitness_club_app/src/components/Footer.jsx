import React, {useEffect, useState} from "react";
import supabase from "../services/supabase";

import map from "../assets/map.svg";
import phone from "../assets/phone.svg";
import whatsapp from "../assets/whatsapp.svg";
import email from "../assets/email.svg";
import www from "../assets/www.svg";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import youtube from "../assets/youtube.svg";

function Footer() {

    const [info, setInfo] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function fetchInfo() {
                const { data, error } = await supabase
                    .from('Info')
                    .select("open_hours, id")
                    .eq('club_id', 333);

            if (error) {
                console.error(error);
                setErrorMessage("Error occurred while fetching data");
            } else {
                setInfo(data);
            }
        }
        fetchInfo();
    }, []);

    return (
            <div className="footer-container">
                <h2>Club Hours</h2>
                <span>Mon 08:00 - 20:00 break 13:00 - 14:00</span>
                <span>Tue 08:00 - 20:00 break 14:00 - 15:00</span>
                <span>Wed 14:00 - 20:00</span>
                <span>Thu 08:00 - 20:00 break 13:00 - 14:00</span>
                <span>Fri 08:00 - 20:00 break 14:00 - 15:00</span>
                <span>Sat 08:00 - 13:00</span>

                <h2>Сlub Info</h2>
                    {info.map((info) => (
                        <div key={info.id}>
                            {info.open_hours}
                        </div>
                    ))}

                <h2>Contact Us</h2>
                <span>
                    <a href="https://www.google.pl/maps"><img src={ map } alt="club on map"/>Xxxxxxxxxxxxxxxx st., xx</a>
                    <a href="mailto:contact@xxxx.com"><img src={ email } alt="club email"/>contact@xxxx.com</a>
                </span>
                <span>
                    <a href="tel:xxx xxx xxx"><img src={ phone } alt="club phone number"/> xxx xxx xxx</a>
                    <a href="https://wa.me/xxx xxx xxx"><img src={ whatsapp } alt="club WhatsApp"/> xxx xxx xxx</a>
                </span>
                <span>
                    <a href="#"><img src={ www } alt="club webpage"/>https://xxx.com</a>
                    <a href="#"><img src={ youtube } alt="club on YouTube"/>https://www.youtube.com/channel/xxx</a>
                </span>
                <span>
                    <a href="#"><img src={ instagram } alt="club on Instagram" />https://www.instagram.com/xxx</a>
                    <a href="#"><img src={ facebook } alt="club on Facebook"/>https://www.facebook.com/xxx</a></span>
            </div>
    )
}

export default Footer;