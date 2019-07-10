import React from "react";
import Footer from "./Footer";
import Title from "./Title";
import Header from "./Header";
import axios from "axios";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            name: window.localStorage.getItem('name'),
            lastName: window.localStorage.getItem('last_name'),
            address: window.localStorage.getItem('address'),
            phone: window.localStorage.getItem('phone'),
            card: window.localStorage.getItem('credit_card'),
            email: window.localStorage.getItem('email'),
            userId: window.localStorage.getItem('userId'),
            cartId: null
        }
    }
    componentDidMount(){
        
            axios
                .get("https://zavrsni2019-backend-protected.herokuapp.com/cart/" + this.state.userId)
                .then(res=>{
                    if(res.data.success){
                        window.localStorage.setItem("cartId", res.data.data[0].cart_id);
                        
                        this.setState({
                            cartId: window.localStorage.getItem("cartId")
                        })
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
    }
    render() {
        return (
            <>
                <Header/>
                <div className="container-fluid"
                    style={{
                        backgroundColor: "#efefef",
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
                        height:"calc(100vh - 80px)"
                    }}>
                    <div className="d-flex justify-content-center" style={{ height: "100%" }}>
                        <div className="d-flex align-items-center" >
                            <div className="row">

                                <div className="col" style={{ maxWidth: "500px" }}>
                                    <Title text="I N F O"/>
                                    <div className="card">
                                        <div className="card-body" style={{
                                            textAlign: "left"
                                        }}>

                                            <div className="form-group">
                                                <label className="col-form-label col-form-label-lg">Name</label>
                                                <br></br>
                                                <label className="col-form-label">{this.state.name} {this.state.lastName}</label>
                                            </div>
                                            <div className="form-group">
                                                <label class="col-form-label col-form-label-lg">Email</label>
                                                <br></br>
                                                <label class="col-form-label">{this.state.email}</label>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-form-label col-form-label-lg">Address</label>
                                                <br></br>
                                                <label class="col-form-label">{this.state.address}</label>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-form-label col-form-label-lg">Phone</label>
                                                <br></br>
                                                <label class="col-form-label">{this.state.phone}</label>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-form-label col-form-label-lg">Credit Card Number</label>
                                                <br></br>
                                                <label class="col-form-label">{this.state.card}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default Profile;