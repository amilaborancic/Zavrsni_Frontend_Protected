import React from "react";
import FooterHeaderBtns from "./FooterHeaderBtns";
import { Redirect, withRouter } from "react-router-dom";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            redirec: false
        }
    }
    handleClick = (ruta) => {
        this.props.history.push(ruta);

    }
    render() {
        return (
            <header>
                <div className="d-flex justify-content-between"
                    style={{
                        backgroundColor: "#2d2d2d",
                        width: "100%",
                        height: "80px"
                    }}>
                    <div className="col d-flex justify-content-start align-items-center">
                       
                        <FooterHeaderBtns value="#TECH" onClick={() => this.handleClick("/profile")} />
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        
                        <FooterHeaderBtns value="PROFILE" onClick={() => this.handleClick("/profile")} />
                        <FooterHeaderBtns value="CART" onClick={() => this.handleClick("/cart")} />
                        <FooterHeaderBtns value="SHOP" onClick={() => this.handleClick("/shop")} />
                        <FooterHeaderBtns value="LOG OUT" onClick={() => this.handleClick("/")} />
                    </div>

                </div>
            </header>
        );
    }
}

export default withRouter(Header);