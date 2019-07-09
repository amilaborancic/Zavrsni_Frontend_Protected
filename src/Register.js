import React from "react";
import Footer from "./Footer";
import Title from "./Title";
import axios from "axios";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectaj: false,
            invalidClass: "form-control form-control-lg is-invalid",
            class: "form-control form-control-lg"
        }
    }
    validateAll = (e) => {
        var novi = e.target;
        var tel = novi.phone.value;
        var card = novi.creditCard.value;
        var sif = novi.pass.value;
        var con_sif = novi.confirm.value;
        var ok = false;
        if (novi.name.value == "" || novi.lastName.value == "" || novi.email.value == "" || card == "" || tel == ""
            || novi.address.value == "" || sif == "" || con_sif == "") {
            this.setState({
                class: "form-control form-control-lg is-invalid"
            })
            ok = false;
        }
        else {
            this.setState({
                class: "form-control form-control-lg"
            })
            ok = true;
        }
        return ok;
    }
    validateTel = (e)=>{
        var novi = e.target;
        var tel = novi.phone.value;
        if (isNaN(parseInt(tel))) {
            //provjera telefona
            novi.phone.className = this.state.invalidClass;
           return false;
        }
        else {
            novi.phone.className = "form-control form-control-lg";
            return true;

        }
    }
    validateCard = (e)=>{
        var novi = e.target;
        var card = novi.creditCard.value;
        if (isNaN(parseInt(card))) {
            //provjera kartice
            novi.creditCard.className = this.state.invalidClass;
            return false;
        }
        else {
            novi.creditCard.className = "form-control form-control-lg";
            return true;
        }
    }
    validatePass = (e) => {
        var novi = e.target;
        var sif = novi.pass.value;
        var con_sif = novi.confirm.value;

        if (sif != con_sif) {
            //provjera slaganja sifri
            novi.confirm.className = this.state.invalidClass;
            novi.pass.className = this.state.invalidClass;
            return false;
        }
        else {
            novi.confirm.className = "form-control form-control-lg";
            novi.pass.className = "form-control form-control-lg";
            return true;
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.validateAll(e) && this.validateCard(e) && this.validatePass(e) && this.validateTel(e)) {
            //prosla validacija
            var novi = e.target;
            this.setState({
                class: "form-control form-control-lg"
            })
            //hash sifre (verzija 2)
            //sifra duga 8 chara (verzija 2)
            axios
                .post("http://localhost:8080/register", {
                    name: novi.name.value,
                    lastName: novi.lastName.value,
                    email: novi.email.value,
                    creditCard: novi.creditCard.value,
                    phone: novi.phone.value,
                    address: novi.address.value,
                    password: novi.pass.value
                })
                .then(res => {
                    if (res.data.success) {
                        //prikazemo modal
                        document.getElementsByName("skriveni")[0].click();
                    }

                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {

        }
    }
    render() {
        return (
            <>
                <div className="container-fluid"
                    style={{
                        backgroundColor: "#efefef",
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
                        height: "calc(100vh - 60px)"
                    }}>
                    <div className="row mx-lg-5" style={{ height: "100%" }}>
                        <div className="col-lg col-md-12 " >
                            <Title
                                fontSize="140px"
                                fontWeight="lighter"
                                color="#666666"
                                text="#TECH"
                            />
                            <div>
                                <p style={{
                                    color: "#b2b2b2",
                                    textAlign: "left",
                                    fontSize: "20px"
                                }}>
                                    Welcome to #tech!<br></br><br></br>
                                    In order to become our customer, please fill out the registration form. All fields are required.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 align-self-center mx-lg-2"  >

                            <div style={{
                                textAlign: "left"
                            }}>

                                <form onSubmit={(e) => this.handleSubmit(e)}>
                                    <h1 style={{
                                        fontSize: "50px",
                                        fontWeight: "lighter",
                                        color: "#666666"
                                    }} >Registration Form</h1>
                                    <br></br>
                                    <input type="text" class={this.state.class} placeholder="NAME" name="name" />
                                    <br></br>
                                    <input type="text" class={this.state.class} placeholder="LAST NAME" name="lastName" />
                                    <br></br>
                                    <input type="text" class={this.state.class} placeholder="ADDRESS" name="address" />
                                    <br></br>
                                    <input type="text" class={this.state.class} placeholder="EMAIL" name="email" />
                                    <br></br>
                                    <input type="password" class={this.state.class} placeholder="PASSWORD" name="pass" />
                                    <br></br>
                                    <input type="password" class={this.state.class} placeholder="CONFIRM PASSWORD" name="confirm" id="match" />
                                    <div htmlFor="#match" className="invalid-feedback">Passwords don't match.</div>
                                    <br></br>
                                    <input type="text" class={this.state.class} placeholder="PHONE" id="phone" name="phone" />
                                    <div htmlFor="#phone" className="invalid-feedback">Phone must be a number.</div>
                                    <br></br>
                                    <input type="text" class={this.state.class} id="credit" placeholder="CREDIT CARD" name="creditCard" />
                                    <div htmlFor="#credit" className="invalid-feedback">Credit card must be a number.</div>
                                    <br></br>
                                    <button
                                        style={{
                                            width: "200px",
                                            height: "50px",
                                            borderRadius: "10px",
                                            backgroundColor: "#2d2d2d",
                                            borderColor: "#2d2d2d",
                                            fontSize: "15px",
                                            color: "white"

                                        }}
                                        type="submit"


                                    >R E G I S T E R</button>
                                    <button hidden data-toggle="modal" data-target="#confirm" type="button" name="skriveni"></button>
                                </form>

                            </div>
                        </div>

                    </div>

                </div>
                <Footer />

                <div class="modal" class="modal fade" id="confirm" onExited={() => {
                    console.log("mrs")
                }}>
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h4 class="modal-title">Welcome!</h4>
                            </div>

                            <div class="modal-body" style={{ textAlign: "left" }}>
                                Your registration is complete.
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" data-dismiss="modal" >Ok</button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Register;