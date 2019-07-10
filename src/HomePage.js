import React from "react";
import Title from "./Title";
import SubTitle from "./SubTitle";
import PhoneImage from "./PhoneImage";
import Footer from "./Footer";
import { Link, Redirect, } from 'react-router-dom';
import axios from "axios";
import "bootstrap";

class Home extends React.Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            redirectaj: false,
            class: "",
            porukica: ""
        }
    }
    handleRedirect = () => {

        if (this._isMounted && this.state.redirectaj) return <Redirect to="/profile" />
    }
    componentDidMount() {
        window.localStorage.clear();
        this._isMounted = true;

    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleClickLogIn = (e) => {
        e.preventDefault();
        //ovdje ubaciti validacije za broken auth
        var user = e.target;
        if ((user.email.value == "" && user.pass.value == "") || (user.email.value != "" && user.pass.value == "") || (user.email.value == "" && user.pass.value != "")) {

            this.setState({
                porukica: "Both fields must be filled!",
                visibility: "visible"
            })
        }
        else {
            //moze se desiti da pogresno sifru unese
            this.setState({
                porukica: "",
                visibility: "hidden"
            })
            axios
                .post("https://zavrsni2019-backend-protected.herokuapp.com/login", {
                    email: user.email.value,
                    password: user.pass.value
                })
                .then(res => {
                    if (this._isMounted) {
                        if (res.data.success) {
                            //upisemo u localstorage
                            window.localStorage.setItem('userId', res.data.data[0].user_id)
                            window.localStorage.setItem('name', res.data.data[0].name);
                            window.localStorage.setItem('last_name', res.data.data[0].last_name);
                            window.localStorage.setItem('address', res.data.data[0].address);
                            window.localStorage.setItem('phone', res.data.data[0].phone);
                            window.localStorage.setItem('credit_card', res.data.data[0].credit_card);
                            window.localStorage.setItem('email', res.data.data[0].email);
                            this.setState({
                                class: "",
                                porukica: "",
                                visibility: "hidden",
                                redirectaj: true
                            })
                            
                            this.props.history.push("/profile");
                            return <Redirect to="/profile"></Redirect>
                        }
                        else {
                            //email i pass dont match
                            this.setState({
                                porukica: "Wrong credentials!",
                                visibility: "visible"
                            })
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        porukica: "Wrong credentials!",
                        visibility: "visible"
                    })
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
                                        <input type="text" placeholder="Email" name="email" id="emailLogin" className="form-control"
                                            style={{
                                                marginTop: "10px",
                                                width: "450px",
                                                height: "50px",
                                                color: "#434343",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                                                fontEeight: "lighter",
                                                border: "1px solid #dddddd"
                                            }} />
                                        <input type="password" placeholder="Password" name="pass" id="passwordLogin" className="form-control"
                                            style={{
                                                marginTop: "20px",
                                                width: "450px",
                                                height: "50px",
                                                color: "#434343",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                                                fontEeight: "lighter",
                                                border: "1px solid #dddddd"
                                            }} />
                                        <input id="both" name="both" hidden className="form-control is-invalid"></input>
                                        <div className="invalid-feedback" htmlFor="#both" style={{ visibility: this.state.visibility }}>{this.state.porukica}</div>

                                        <Link to="/register" style={{ marginTop: "10px" }}>New user? Register here.</Link>

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