import React from "react";

class Title extends React.Component {
    render() {
        return (
            <h1 style={{ fontSize: "140px",fontWeight:"lighter", color:"#666666"}}>{this.props.text}</h1>
        );
    }
}

export default Title;