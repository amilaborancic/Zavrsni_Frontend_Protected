import React from "react";
import Ikona from "./Ikonica.js";
import "./LargeButton";
import FooterHeaderBtns from "./FooterHeaderBtns";
import "./Footer.css";
import face from "./fb.png";
import twit from "./twitter.png";
import part from "./web.png";

class Footer extends React.Component {

    render() {

        return (
            <footer className="mt-md-5 mt-sm-5 mt-xs-5 mt-lg-0">
                <div className="d-flex justify-content-between"
                    style={{
                        backgroundColor: "#2d2d2d",
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                        height: "60px",
                        lineHeight: "60px",
                    }}>
                    <div className="col d-flex justify-content-start align-items-center">
                        <FooterHeaderBtns value="ABOUT" />
                        <FooterHeaderBtns value="TEAM" />
                        <FooterHeaderBtns value="CONTACT" />
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <Ikona url={face} alt="fb" width="40px" height="40px"></Ikona>
                        <Ikona url={twit} alt="twitter" width="40px" height="40px"></Ikona>
                        <Ikona url={part} alt="partners" width="40px" height="40px"></Ikona>
                    </div>
                </div>
            </footer>
        );
    }


}

export default Footer;