import { motion } from "framer-motion";
import React, { useState } from "react";

export default function LoginForm({setIsSignUpForm, popUpRef, setCurrentUser, setIsPopUpForms}) {
    const [loginInput, setLoginInput] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState(null);

    function handleLogin(e) {
        e.preventDefault();

        fetch('https://aster-app.onrender.com/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: loginInput,
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    localStorage.setItem("jwt", data.jwt);
                    setCurrentUser(data.user);
                    setIsPopUpForms(false);
                })
            } else {
                r.json().then((errors) => {
                    setErrors(errors.message)
                })
            }
        })
    }

    function handleInput(e) {
        const name = e.target.name;
        let value = e.target.value;

        setLoginInput({
            ...loginInput,
            [name]: value,
        })
    }

    return (
        <motion.form
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: .5 }}
        onSubmit={handleLogin} 
        className="form"
        ref={popUpRef}>
            <h1><span className="add-line-break">LOGIN TO</span> YOUR ACCOUNT.</h1>
            <div className="user-input">
                <p>User Name</p>
                <input type="text" placeholder="Enter User Name" name="username" onChange={handleInput}/>
            </div>

            <div className="user-input">
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" onChange={handleInput}/>
            </div>

            <div className="errors-container">
                {errors ? <p className="errors">* {errors}</p> : null}
            </div>

            <div className="buttons-container flex-box">
                <button className="button" type="submit">
                    <p>SIGN IN</p>
                </button>
                <div className="sign-up-link flex-box" onClick={() => setIsSignUpForm(true)}>
                    <p>SIGN UP</p>
                    <div className="sign-up-arrow-container">
                        <img src="https://aster-imgs.s3.amazonaws.com/arrow-white.png" alt="arrow" />
                    </div>
                </div>
            </div>
        </motion.form>
    )
}