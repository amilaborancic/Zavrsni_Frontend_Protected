import React from "react";

class SubTitle extends React.Component{

    render(){
        return(
            <h1 style={{fontSize:"40px", fontWeight:"lighter",color:"#b2b2b2"}}> {this.props.text}</h1>
        );
    }
}

export default SubTitle;