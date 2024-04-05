// Author: Maxwell Rohrer
// ISU Netid : mrohrer@iastate.edu
// Date : April 3th, 2024

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css"
import products from "./data.json"

function App(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [dataF,setDataF] = useState({});
    const [viewer,setViewer] = useState(0);

    useEffect(() => {
        total();
    }, [cart]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    const cartItems = cart.map((el) => (
        <div key={el.id}>
            <img class="img-fluid" src={el.image} width={150} />
            {el.title}
            ${el.price}
        </div>
    ));

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        let poop = hardCopy.lastIndexOf(el);
        if (poop >= 0){
            hardCopy.splice(poop, 1);
        }
        setCart(hardCopy);
    };
    

    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    const listItems = products.map((el) => (
        // PRODUCT
        <div class="row border-top border-bottom" key={el.id}>
            <div class="row main align-items-center">
                <div class="col-2">
                <img class="img-fluid" src={require(`./product-images/${el.image}`)} alt={el.name} />
                </div>
                <div class="col">
                    <div class="row text-muted">{el.name}</div>
                    <div class="row">{el.description}</div>
                </div>
                <div class="col">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div>
                <div class="col">
                    ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
                </div>
            </div>
        </div>
        ));

    function Browse(){
        const onSubmit = data => {
            setDataF( data );
            setViewer( 1 );
        }


        return (
            <div>
                <div class="card">
                    <div class="row">
                    {/* HERE, IT IS THE SHOPING CART */}
                        <div class="col-md-8 cart">
                            <div class="title">
                                <div class="row">
                                    <div class="col">
                                        <h4>
                                        <b>Products for Sale:</b>
                                        </h4>
                                    </div>
                                    <div class="col align-self-center text-right text-muted">
                                    Products selected {cart.length}
                                    </div>
                                </div>
                            </div>
                            <div>{listItems}</div>
                            </div>
                            <div class ="float-end">
                            <p class ="mb-0 me-5 d-flex align-items-center">
                                <span class ="small text-muted me-2">Order total:</span>
                                <span class ="lead fw-normal">${cartTotal}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-secondary" onClick={() => onSubmit()} > Checkout </button>
            </div>
        );
    }

    function Cart(){
        const onSubmit = data => {
            setDataF( data );
            setViewer( 2 );
        }

        return (<div>
                    <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
                        <div className="form-group">
                            <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control"/>
                            {errors.fullName && <p className="text-danger">Full Name is required.</p>}
                        </div>
                        <div className="form-group">
                            <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control"/>
                            {errors.email && <p className="text-danger">Email is required.</p>}
                        </div>
                        <div className="form-group">
                            <input {...register("creditCard", { required: true })} placeholder="Credit Card" className="form-control"/>
                            {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
                        </div>
                        <div className="form-group">
                            <input {...register("address", { required: true })} placeholder="Address" className="form-control"/>
                            {errors.address && <p className="text-danger">Address is required.</p>}
                        </div>
                        <div className="form-group">
                            <input {...register("address2")} placeholder="Address 2" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input {...register("city", { required: true })} placeholder="City" className="form-control"/>
                            {errors.city && <p className="text-danger">City is required.</p>}
                        </div>
                        <div className="form-group">
                            <input {...register("state", { required: true })} placeholder="State" className="form-control"/>
                            {errors.state && <p className="text-danger">State is required.</p>}
                        </div>
                        <div className="form-group">
                            <input {...register("zip", { required: true })} placeholder="Zip" className="form-control"/>
                            {errors.zip && <p className="text-danger">Zip is required.</p>}
                        </div>
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </form>
                </div>);
    }

    function Summary(){
        const updateHooks = ()=>{
            setViewer( 0 );
            setDataF( {} );
        };
        
        return (<div>
            <h1>Payment summary:</h1>
            <h3>{dataF.fullName}</h3>
            <p>{dataF.email}</p>
            ...
            <p>{dataF.city},{dataF.state} {dataF.zip} </p>
            <button onClick={updateHooks} className="btn btn-secondary">Submit</button>
        </div>);
    };

    function Header(){
        return (
            <div>
                <section className="header-main">
                    <h1 style={{textAlign: "center", paddingTop: "1%"}}>Welcome to Friends and Food </h1>
                    <h3 style={{textAlign:"center"}}>Shop and buy the best friends and food on the market! </h3>
                </section>
            </div>
        );
    }

    return (
        <div>
        <Header/>
        {viewer === 0 ? <Browse/> : viewer === 1 ? <Cart /> : <Summary />}
        </div>
        );
}

export default App;
    