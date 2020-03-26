import React from "react";
import './style.css'

function Footer() {
    return (
        <div id="contact" className="has-background-black-ter">
            <div className="has-text-centered">
                <p>
                    <p>Data sources are WHO, US CDC, China NHC, ECDC, and DXY and the map layer can be found <a target="_blank" href="https://www.arcgis.com/home/item.html?id=c0b356e20b30490c8b8b4c7bb9554e7c">here</a>.</p>
                    <br></br>
                    <p>Additional Resources:</p>
                    <ul>
                        <li>
                            <a target="_blank" href="https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6">John Hopkins University COVID-19 Dashboard</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://who.maps.arcgis.com/apps/opsdashboard/index.html#/c88e37cfc43b4ed3baf977d77e4a0667">WHO COVID-19 Dashboard</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://storymaps.arcgis.com/stories/4fdc0d03d3a34aa485de1fb0d2650ee0">Coronavirus Story Map</a>
                        </li>
                    </ul>
                </p>
            </div>
        </div>
    )
}

export default Footer;