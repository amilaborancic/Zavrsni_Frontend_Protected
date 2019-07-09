import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Item from "./Item"
import axios from "axios";

class Shop extends React.Component {

    constructor() {
        super();
        this.state = {
            items: [],
            userId: window.localStorage.getItem("userId"),
            cartId: window.localStorage.getItem("cartId"),
            show: "hidden",
            addedToCart: [],
            keyword:"",
            emptyMsg:"",
            prikazi:false
        }
    }

    componentDidMount() {
        axios
            .get("http://localhost:8080/items")
            .then(res=>{
                if(res.data.success){
                    this.setState({
                        items: res.data.data
                    })
                }
                console.log(res.data.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }
    handleChange = (e) => {
        //searchbar
        this.setState({
            keyword:e.target.value
        })
    }
    handleSearch = (e) => {
        e.preventDefault();
        if(this.state.keyword!=""){
            axios
            .get("http://localhost:8080/search/" + this.state.keyword)
            .then(res => {
                if (res.data.success) {
                    if(res.data.data.length==0){
                        this.setState({
                            emptyMsg:<label>There aren't any products with that name.</label>,
                            prikazi:false
                        })
                    }
                    else{
                        this.setState({
                            emptyMsg:"",
                            items:res.data.data,
                            prikazi:true
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    prikazi:false,
                    emptyMsg:""
                })
            })
        }
        else{
            this.setState({
                prikazi:false,
                emptyMsg:""
            })
        }
        
    }
    addToCart = (itemId) => {
        axios
            .post("http://localhost:8080/cart/add", {
                cartId: this.state.cartId,
                itemId: itemId
            })
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        show: "visible"
                    })
                    //stavimo u localstorage 
                    if (window.localStorage.getItem("addedToCart") == null) {
                        var addedToCart = [];
                        addedToCart[0] = res.data.data.insertId;
                        localStorage.setItem("addedToCart", addedToCart.toString())
                    }
                    else {
                        //dodamo u niz addedToCart novi id
                        var novi = localStorage.getItem("addedToCart").split(',');
                        novi.push(res.data.data.insertId);
                        localStorage.setItem("addedToCart", novi.toString());
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <>
                <Header />
                <div className="container-fluid"
                    style={{
                        backgroundColor: "#efefef",
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
                        minHeight: "calc(100vh - 80px)"
                    }}>
                    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
                        <div className="d-flex align-items-center" style={{ flexDirection: "column" }}>
                            <br></br>
                            <form>
                                <input type="text"
                                    style={{
                                        fontSize: "15px",
                                        height: "45px",
                                        width: "500px",
                                        border: "0px",
                                        padding: "10px",
                                        boxSizing: "border-box"
                                    }}
                                    name="searchbar"
                                    onChange={(e)=>this.handleChange(e)}
                                />
                                <button
                                    style={{
                                        width: "100px",
                                        height: "45px",
                                        fontSize: "15px",
                                        backgroundColor: "#2d2d2d",
                                        border: "0px",
                                        color: "white"
                                    }}
                                    onClick={(e)=>this.handleSearch(e)}>
                                    SEARCH</button>
                            </form>
                            <br></br>
                            {this.state.emptyMsg}
                        </div>
                    </div>
                    <div className="row mt-5 mx-2">
                        
                        {this.state.prikazi ? this.state.items.map(x =>
                            <>
                                <Item itemName={x.result.name} itemPrice={x.result.price + "$"} itemCategory={x.result.category} src={x.imgUrl} value="ADD TO CART" onClick={() => this.addToCart(x.result.item_id)} />
                            </>
                        ) : ""}

                    </div>

                </div>
                <Footer />
            </>
        );
    }
}

export default Shop;