import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function ReservationForm({currentUser, setCurrentUser}) {
    const [isGenderSelections, setIsGenderSelections] = useState(false);
    const [isSucess, setIsSucess] = useState(currentUser.request === null ? false : true);
    const [selectedGender, setSelectedGender] = useState(currentUser.gender ? currentUser.gender : 'select');
    const [firstName, setFirstName] = useState(currentUser.first_name ? currentUser.first_name : '');
    const [lastName, setLastName] = useState(currentUser.last_name ? currentUser.last_name : '');
    const [email, setEmail] = useState(currentUser.email ? currentUser.email : '');
    const [age, setAge] = useState(currentUser.age ? currentUser.age : '');
    const [errors, setErrors] = useState(null);
    const [addtionalInfo, setAddionalInfo] = useState({
        date_of_birth: '',
        height: '',
        weight: '',
        about: '',
        motivation: ''
    })
    let genderRef = useRef();
    const token = localStorage.getItem("jwt");

    useEffect(() => {
        let handler = e => {
            if(!genderRef.current.contains(e.target)) {
                setIsGenderSelections(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    function handleGenderSelections() {
        setIsGenderSelections(genderSelections => !genderSelections);
    }

    function handleSelection(e) {
        setIsGenderSelections(false);
        setSelectedGender(e.target.textContent);
    }

    function handleInput(e) {
        const name = e.target.name;
        let value = e.target.value;

        setAddionalInfo({
            ...addtionalInfo,
            [name]: value,
        })
    }

    function handleConfirm(e) {
        e.preventDefault();

        fetch('https://aster-app.onrender.com/requests/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                request: {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    age: age,
                    gender :selectedGender,
                    user_id: currentUser.id,
                    ...addtionalInfo
                }
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setIsSucess(true);
                    setCurrentUser(data.user);
                })
            } else {
                r.json().then((errors) => {
                    console.log(errors);
                    setErrors(errors.errors);
                })
            }
        })
    }

    return (
        <motion.form
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: .5 }} 
        onSubmit={handleConfirm}
        className="form reservation-form">
            <div className="reservation-left">
                <h1 style={{marginBottom: "45px"}}>REQUEST.</h1>
                <div className="input-flex-container">
                    <div className="user-input">
                        <p>First Name</p>
                        <input type="text" placeholder="Enter First Name" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>

                    <div className="user-input">
                        <p>Last Name</p>
                        <input type="text" placeholder="Enter Last Name" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                </div>

                <div className="input-flex-container">
                    <div className="user-input">
                        <p>Email</p>
                        <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="age-and-gender-container flex-box">
                        <div className="user-input">
                            <p>Age</p>
                            <input type="text" name="age" value={age} onChange={(e) => setAge(e.target.value)}/>
                        </div>

                        <div className="gender-dropdown" ref={genderRef}>
                            <p>Gender</p>
                            <div className="gender-btn flex-box" onClick={handleGenderSelections}>
                                <p>{selectedGender}</p>
                                <i className='bx bx-chevron-down'></i>
                            </div>
                            {isGenderSelections ? 
                            <div className="gender-selections flex-box">
                                <p onClick={handleSelection}>Male</p>
                                <p onClick={handleSelection}>Female</p>
                                <p onClick={handleSelection}>Intersex</p>
                                <p onClick={handleSelection}>Trans</p>
                                <p onClick={handleSelection}>Others</p>
                            </div> 
                            : null}
                        </div>
                    </div>
                </div>

                <div className="input-flex-container">
                    <div className="user-input">
                        <p>Date of Birth</p>
                        <input type="text" placeholder="mm / dd / yyyy" name="date_of_birth" onChange={handleInput}/>
                    </div>

                    <div className="age-and-gender-container flex-box">
                        <div className="user-input">
                            <p>Height</p>
                            <input type="text" placeholder="0 ft" name="height" onChange={handleInput}/>
                        </div>

                        <div className="user-input">
                            <p>Weight</p>
                            <input type="text" placeholder="0 lb" name="weight" onChange={handleInput}/>
                        </div>
                    </div>
                </div>

                <div className="user-input-text-area">
                        <p>Tell Us About Yourself</p>
                        <textarea type="text" name="about" onChange={handleInput}/>
                </div>

                <div className="user-input-text-area">
                        <p>Your Motivation to Mars</p>
                        <textarea type="text" name="motivation" onChange={handleInput}/>
                </div>

                <div className="errors-container">
                    {errors ? (errors.map((error) => {
                        return <p className="errors">* {error}</p>
                    })) : null}
                </div>
        
                <div className="buttons-container">
                    <button className="button" type="submit" style={{textAlign: "center"}}>
                        <p>CONFIRM</p>
                    </button>
                </div>
            </div>
            <div className="reservation-right">
                <div className="reservation-right-container">
                    <div className="reservation-steps">
                        <h2>PROCESS</h2>
                        <div className="reservation-steps-container">
                            <h3>FILL OUT THE REQUEST FORM</h3>
                            <p>
                            To make a reservation request, you will have to fill out the request 
                            form on the left. You will have to enter your basic information, introduce
                            yourself to us, and write a short paragraph of your motivation for Mars. 
                            </p>
                        </div>

                        <div className="reservation-steps-container">
                            <h3>WAIT FOR OUR EMAIL RESPONSE</h3>
                            <p>
                            Once your request form is submitted. Our employees will review your 
                            request within the next seven to fourteen business days. After the review, we 
                            will contact you through the provided email and direct you to the 
                            next step if the request is being approved.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="terms-container">
                    <div className="reservation-steps-container" style={{marginBottom: "0"}}>
                        <h2>TERMS AND CONDITIONS</h2>
                        <div className="terms-text-container">
                            <div className="terms">
                                <h3>Random Term</h3>
                                <p>
                                Mars is one of Earth's closest habitable neighbors. Mars is about 
                                half again as far from the Sun as Earth is, so it still has decent 
                                sunlight. We can grow plants on Mars just by compressing the atmosphere.
                                Mars is one of Earth's closest habitable neighbors. Mars is about 
                                half again as far from the Sun as Earth is, so it still has decent 
                                sunlight. We can grow plants on Mars just by compressing the atmosphere.
                                </p>
                            </div>
                            <br></br>
                            <div className="terms">
                                <h3>Random Term</h3>
                                <p>
                                Mars is one of Earth's closest habitable neighbors. Mars is about 
                                half again as far from the Sun as Earth is, so it still has decent 
                                sunlight. We can grow plants on Mars just by compressing the atmosphere.
                                Mars is one of Earth's closest habitable neighbors. Mars is about 
                                half again as far from the Sun as Earth is, so it still has decent 
                                sunlight. We can grow plants on Mars just by compressing the atmosphere.
                                </p>
                            </div>
                            <br></br>
                            <div className="terms">
                                <h3>Random Term</h3>
                                <p>
                                Mars is one of Earth's closest habitable neighbors. Mars is about 
                                half again as far from the Sun as Earth is, so it still has decent 
                                sunlight. We can grow plants on Mars just by compressing the atmosphere.
                                Mars is one of Earth's closest habitable neighbors. Mars is about 
                                half again as far from the Sun as Earth is, so it still has decent 
                                sunlight. We can grow plants on Mars just by compressing the atmosphere.
                                </p>
                            </div>
                            <br></br>
                            <div className="terms">
                                <h3>Random Term</h3>
                                <p>
                                Mars is one of Earth's closest habitable neighbors. Mars is about 
                                half again as far from the Sun as Earth is, so it still has decent 
                                sunlight. We can grow plants on Mars just by compressing the atmosphere.
                                Mars is one of Earth's closest habitable neighbors. Mars is about 
                                half again as far from the Sun as Earth is, so it still has decent 
                                sunlight. We can grow plants on Mars just by compressing the atmosphere.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>             

                <div className="reservation-bottom">
                    <p>ASTER</p>
                </div>
            </div>
            
            {isSucess ? 
            <div className="sucess-container">
                <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: .5 }}
                className="sucess">
                    <div className="sucess-header">
                        <i className='bx bxs-check-circle'></i>
                        <p>Thanks for submitting your request.</p>
                    </div>

                    <NavLink to="/user_request" exact="true" className="view-request-container">
                        <div className="view-request">
                            <p>VIEW YOUR REQUEST</p>
                            <span className="material-symbols-outlined">
                                trending_flat
                            </span>
                        </div>
                    </NavLink>
                </motion.div>
            </div> 
            :
            null}
            
        </motion.form> 
    )
}