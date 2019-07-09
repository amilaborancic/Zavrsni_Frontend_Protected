import React from "react";
class Item extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div class="card mx-2 my-2" style={{ border: "0px" }}>

                <div class="card-body">
                        <img src={this.props.src} style={{ minWidth: "200px", maxHeight: "200px" }} />
<br></br><br></br>
                        <h3>{this.props.itemName}</h3>
                        <br></br>
                        <p>CATEGORY: {this.props.itemCategory}</p>
                        <p>PRICE: {this.props.itemPrice}</p>
                        <br></br>

                        <div className="d-flex align-items-end" >
                            <button
                                style={{
                                    width: "100%",
                                    height: "50px",
                                    fontSize: "15px",
                                    color: "white",
                                    backgroundColor: "#6BCDFD",
                                    border: "0px"

                                }}
                                onClick={this.props.onClick}
                            >{this.props.value}</button>
                        </div>
                    </div>

            </div>
        );
    }
}

export default Item;