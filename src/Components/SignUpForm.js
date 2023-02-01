import { React, useState } from "react";
import { motion } from "framer-motion";

export default function SignUpForm({setIsSignUpForm, setIsInformationForm, popUpRef, setCurrentUser}) {
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        password_digest: ""
    });
    const [errors, setErrors] = useState(null);

    function handleInput(e) {
        const name = e.target.name;
        let value = e.target.value;

        setNewUser({
            ...newUser,
            [name]: value,
        })
    }

    function handleSignUp(e) {
        e.preventDefault();

        fetch('https://aster-app.onrender.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: newUser,
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    localStorage.setItem("jwt", data.jwt);
                    setCurrentUser(data.user);
                    setIsInformationForm(true);
                })
            } else {
                r.json().then((errors) => {
                    console.log(errors);
                    setErrors(errors.errors)
                })
            }
        })
    }

    return (
        <motion.form
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: .5 }} 
        onSubmit={handleSignUp} 
        className="form"
        ref={popUpRef}>
            <h1><span className="add-line-break">CREATE</span> YOUR ACCOUNT.</h1>
            <div className="user-input">
                <p>User Name</p>
                <input type="text" placeholder="Enter User Name" name="username" onChange={handleInput}/>
            </div>

            <div className="user-input">
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" onChange={handleInput}/>
            </div>

            <div className="user-input">
                <p>Password Confirmation</p>
                <input type="password" placeholder="Confirm Password" name="password_confirmation" onChange={handleInput}/>
            </div>

            
            <div className="errors-container">
                {errors ? (errors.map((error) => {
                    return <p className="errors">* {error}</p>
                })) : null}
            </div>


            <div className="buttons-container flex-box">
                <button className="button" type="submit">
                    <p>SIGN UP</p>
                </button>
                <div className="sign-up-link flex-box" onClick={() => setIsSignUpForm(false)}>
                    <p>GO BACK</p>
                    <div className="sign-up-arrow-container">
                        <img src="https://aster-imgs.s3.amazonaws.com/arrow-white.png" alt="arrow" />
                    </div>
                </div>
            </div>
        </motion.form>
    )
}