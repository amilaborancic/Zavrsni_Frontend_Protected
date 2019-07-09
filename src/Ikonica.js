import React from "react";

function Ikona(props){
    return(
        <img 
            src={props.url} 
            alt={props.alt}
            style={{width:props.width,height:props.height}}
            />
    );
}

export default Ikona;