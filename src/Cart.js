import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Item from "./Item"
import Title from "./Title";
import SubTitle from "./SubTitle"
import axios from "axios";

class Cart extends React.Component {

    constructor() {
        super();
        this.state = {
            itemList: [],
            userId: window.localStorage.getItem("userId"),
            cartId: window.localStorage.getItem("cartId")
        }
    }

    componentDidMount() {
        //items in cart
        axios
            .get("http://localhost:8080/cart/items/" + this.state.cartId)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        itemList: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    handleRemove = (itemId) => {
        axios
            .delete("http://localhost:8080/cart/delete", {
                data: {
                    cartItemId: itemId
                }
            })
            .then(res => {
                //re-render
                if (res.data.success) {
                    axios
                        .get("http://localhost:8080/cart/items/" + this.state.cartId)
                        .then(res => {
                            if (res.data.success) {
                                this.setState({
                                    itemList: res.data.data
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
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
                        minHeight: "calc(100vh)"
                    }}>
                    <Title text="CART" />
                    <div style={{ textAlign: "left" }}>
                        <SubTitle text="ITEMS" />
                    </div>

                    <div className="row mt-5 mx-2" style={{ width: "100%", flexDirection: "row" }}>
                        <br></br>
                        {this.state.itemList.map(x =>
                            <Item itemName={x.itemInfo.name} itemPrice={x.itemInfo.price + "$"} itemCategory={x.itemInfo.category} src={x.imgUrl} onClick={() => this.handleRemove(x.cart_item_id)} value="REMOVE FROM CART" />
                        )}
                    </div>

                </div>
                <Footer />
            </>
        );
    }
}

export default Cart;