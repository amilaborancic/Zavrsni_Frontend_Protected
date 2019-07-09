import React from "react";
import LargeButton from "./LargeButton"
class Btn extends React.Component{

    render(){
        return(
        <input type="button"
        value={this.props.value}
        style={{
            minWidth: "70px",
            height: "50px",
            backgroundColor: "#2d2d2d",
            borderColor: "#2d2d2d",
            border: "0px",
            fontSize: "15px",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            color: "white"
        }}
        onClick={this.props.onClick}
        />
        );
    }
}

export default Btn;