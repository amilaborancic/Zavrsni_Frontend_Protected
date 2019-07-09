import React from "react";
import "./LargeButton.css"
class LargeButton extends React.Component
{
    render(){
        return(
            <input type="button" 
                value={this.props.value} 
                
                style={this.props.style}
                onClick={this.props.handleClick}
               />
        );
    }
   
}

export default LargeButton;