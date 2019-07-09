import React from "react";
class InputField extends React.Component {
    render() {
        return (
            <input
                type={this.props.type}
                style={this.props.style}
                placeholder={this.props.placeholder}></input>


        );
    }
}

export default InputField;