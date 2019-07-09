import React from "react";
import eMobile from "./e-mobile.jpg";

function PhoneImage(props)
{
    return(
        <img 
            src={eMobile} 
            alt="Image of smart phone"
            style={props.style}
            />
    );
}

export default PhoneImage;