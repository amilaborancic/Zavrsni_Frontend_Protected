import React from "react";
import Title from "./Title";
import SubTitle from "./SubTitle";
import PhoneImage from "./PhoneImage";
import Footer from "./Footer";
import { Link, Redirect, } from 'react-router-dom';
import axios from "axios";
import "bootstrap";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectaj: false,
            class: "",
            porukica: ""
        }
    }
    handleRedirect = () => {
        if (this.state.redirectaj) return <Redirect to="/profile" />
    }
    componentDidMount() {
        window.localStorage.clear();

    }
    handleClickLogIn = (e) => {
        e.preventDefault();
        //ovdje ubaciti validacije za broken auth
        var user = e.target;
        if ((user.email.value == "" && user.pass.value == "") || (user.email.value!="" && user.pass.value=="") || (user.email.value == "" && user.pass.value != "")) {
            user.both.className="form-control is-invalid";
            this.setState({
                porukica: "Both fields must be filled!"
            })
        }
        else {
            //moze se desiti da pogresno sifru unese
            user.both.className="form-control";
            user.email.className="form-control";
            user.pass.className="form-control";
            this.setState({
                porukica: "",
            })
            axios
                .post("http://localhost:8080/login", {
                    email: user.email.value,
                    password: user.pass.value
                })
                .then(res => {
                    if (res.data.success) {
                        //upisemo u localstorage
                        console.log(res.data.data[0].user_id);
                        window.localStorage.setItem('userId', res.data.data[0].user_id)

                        this.props.history.push("/profile");
                        this.setState({
                            class: "",
                            porukica: "",
                            redirectaj: true
                        })
                    }
                    else {
                        //email i pass dont match
                        this.setState({
                            class: "form-control is-invalid",
                            porukica: "The email and password don't match."
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })

        }

    }
    render() {
        return (

            <div>
                <div className="container-fluid" >
                    <div className="row justify-content-center">
                        <Title text="#TECH" />
                    </div>
                    <div className="row justify-content-center">
                        <SubTitle text="New thinking. New #tech." />
                    </div>
                    <div className="row">
                        <div style={{ visibility: "hidden", fontSize: "30px" }}>d</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
                            <div className="d-flex justify-content-center" >
                                <PhoneImage style={{ width: "550px", height: "600px" }} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 d-flex flex-row align-items-lg-center align-items-md-stretch">
                            <div className="col align-items-center my-md-5 my-sm-5 my-xs-5" onSubmit={this.handleClickLogIn}>

                                <div className="d-flex justify-content-center" >
                                    <h1 style={{ fontSize: "50px", fontWeight: "bold", color: "#666666" }}>W E L C O M E</h1>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <form onSubmit={this.handleClickLogIn}>
                                        <input type="text" placeholder="Email" name="email" id="emailLogin" className={this.state.class}
                                            style={{
                                                marginTop: "10px",
                                                width: "450px",
                                                height: "50px",
                                                color: "#434343",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                                                fontEeight: "lighter",
                                                border: "1px solid #dddddd"
                                            }} />
                                        <br></br>
                                        <input type="password" placeholder="Password" name="pass" id="passwordLogin" className={this.state.class}
                                            style={{
                                                marginTop: "20px",
                                                width: "450px",
                                                height: "50px",
                                                color: "#434343",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                                                fontEeight: "lighter",
                                                border: "1px solid #dddddd"
                                            }} />
                                        <input id="both" name="both" hidden className=""></input>
                                        <div className="invalid-feedback" htmlFor="#passwordLogin">{this.state.porukica}</div>
                                        <br></br>
                                        <Link to="/register" style={{ marginTop: "10px" }}>New user? Register here.</Link>

                                        {this.handleRedirect()}
                                        <br></br>
                                        <br></br>
                                        <button
                                            type="submit"
                                            style={{
                                                width: "200px",
                                                height: "50px",
                                                borderRadius: "10px",
                                                backgroundColor: "#2d2d2d",
                                                borderColor: "#2d2d2d",
                                                fontSize: "20px",
                                                color: "white"
                                            }}
                                        >LOG IN</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
export default Home;