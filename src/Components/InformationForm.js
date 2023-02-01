import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function InformationForm({popUpRef, currentUser, setCurrentUser, setIsPopUpForms}) {
    const [isGenderSelections, setIsGenderSelections] = useState(false);
    const [selectedGender, setSelectedGender] = useState('Select');
    const [userInfo, setUserInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        age: ""
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

    function handleInput(e) {
        const name = e.target.name;
        let value = e.target.value;

        setUserInfo({
            ...userInfo,
            [name]: value,
        })
    }

    function handleGenderSelections() {
        setIsGenderSelections(genderSelections => !genderSelections);
    }

    function handleSelection(e) {
        setIsGenderSelections(false);
        setSelectedGender(e.target.textContent);
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`https://aster-app.onrender.com/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...userInfo,
                gender: selectedGender,
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setCurrentUser(data.user);
                    setIsPopUpForms(false);
                })
            } else {
                r.json().then((errors) => {
                    console.log(errors)
                })
            }
        })
    }

    return (
        <motion.form
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: .5 }} 
        style={{width: "650px"}} 
        className="form"
        onSubmit={handleSubmit} 
        ref={popUpRef}>
            <h1><span className="add-line-break">COMPLETE</span> YOUR INFORMATION.</h1>
            <div className="input-flex-container">
                <div className="user-input">
                    <p>First Name</p>
                    <input type="text" placeholder="Enter First Name" name="first_name" onChange={handleInput}/>
                </div>

                <div className="user-input">
                    <p>Last Name</p>
                    <input type="text" placeholder="Enter Last Name" name="last_name" onChange={handleInput}/>
                </div>
            </div>

            <div className="input-flex-container">
                <div className="user-input">
                    <p>Email</p>
                    <input type="text" placeholder="Enter Email" name="email" onChange={handleInput}/>
                </div>

                <div className="age-and-gender-container flex-box">
                    <div className="user-input">
                        <p>Age</p>
                        <input type="text" name="age" onChange={handleInput}/>
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
    
            <div className="buttons-container">
                <button className="button" type="submit" style={{textAlign: "center"}}>
                    <p>CONFIRM</p>
                </button>
            </div>
        </motion.form> 
    )
}