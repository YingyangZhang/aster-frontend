import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function UserRequest({currentUser, setCurrentUser}) {
    const [isGenderSelections, setIsGenderSelections] = useState(false);
    const [isCancelPopUp, setIsCancelPopUp] = useState(false);
    const [selectedGender, setSelectedGender] = useState(currentUser.gender ? currentUser.gender : 'select');
    const [firstName, setFirstName] = useState(currentUser.first_name ? currentUser.first_name : '');
    const [lastName, setLastName] = useState(currentUser.last_name ? currentUser.last_name : '');
    const [email, setEmail] = useState(currentUser.email ? currentUser.email : '');
    const [age, setAge] = useState(currentUser.age ? currentUser.age : '');
    const [addtionalInfo, setAddionalInfo] = useState({
        date_of_birth: '',
        height: '',
        weight: '',
        about: '',
        motivation: ''
    })
    const token = localStorage.getItem("jwt");

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

    function handleCancel() {
       fetch(`https://aster-app.onrender.com/requests/${currentUser.request.id}`, {
        method: "DELETE",
        headers: {
            'content-type': "application/json",
            Authorization: `Bearer ${token}`
        }
       }).then((r) => {
         if (r.ok) {
            r.json().then((data) => {
                setCurrentUser(data.user);
                setIsCancelPopUp(false);
            })
         } else {
            r.json().then((errors) => {
                console.log(errors);
            })
         }
       })
    }

    return (
        <div className="background-color container" style={{height: "100vh"}}>
            <div className="user-request container flex-box" style={{paddingBottom: "45px"}}>
                <div className="user-request-headline-container">
                    <div className="user-request-headline flex-box">
                        <h1><div className="add-margin">YOUR</div> REQUEST</h1>
                        <div className="tag-charcoal">
                            <p>POSSIBLITY</p>
                        </div>
                    </div>
                </div>

                {currentUser.request === null ? 
                <div className="empty-request-container">
                    <h1>You don't have any request yet.</h1>
                    <NavLink to="/reservation" exact="true" className="user-request-link">
                        <p>REQUEST NOW</p>
                        <span className="material-symbols-outlined">
                            trending_flat
                        </span>
                    </NavLink>
                </div>
                :
                <div className="user-request-form">
                    <div className="request-status">
                        <h1>REQUEST IS BEING PROCESSING.</h1>
                        <p>Submission Date: {currentUser.request.created_at.slice(0, 10)}</p>
                    </div>

                    <div className="user-request-info-container">
                        <div className="user-request-info">
                            <h1>First Name</h1>
                            <p>{currentUser.request.first_name}</p>
                        </div>

                        <div className="user-request-info grid-two">
                            <h1>Last Name</h1>
                            <p>{currentUser.request.last_name}</p>
                        </div>

                        <div className="user-request-info">
                            <h1>Email</h1>
                            <p>{currentUser.request.email}</p>
                        </div>

                        <div className="user-request-info">
                            <h1>Age</h1>
                            <p>{currentUser.request.age}</p>
                        </div>

                        <div className="user-request-info">
                            <h1>Gender</h1>
                            <p>{currentUser.request.gender}</p>
                        </div>

                        <div className="user-request-info">
                            <h1>Date of Birth</h1>
                            <p>{currentUser.request.date_of_birth}</p>
                        </div>

                        <div className="user-request-info">
                            <h1>Height</h1>
                            <p>{currentUser.request.height}</p>
                        </div>

                        <div className="user-request-info">
                            <h1>Weight</h1>
                            <p>{currentUser.request.weight}</p>
                        </div>
                    </div>

                    <div className="user-request-text-container">
                        <div className="user-request-text">
                            <h1>About</h1>
                            <p>{currentUser.request.about}</p>
                        </div>

                        <div className="user-request-text">
                            <h1>Motivation</h1>
                            <p>{currentUser.request.motivation}</p>
                        </div>
                    </div>

                    <div className="buttons-container">
                        <button className="button" style={{textAlign: "center"}} onClick={() => {setIsCancelPopUp(true)}}>
                            <p>CANCEL REQUEST</p>
                        </button>
                    </div>
                </div> }
            </div>

            {isCancelPopUp ? 
                <div className="cancel-popup">
                    <motion.div
                    initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: .5 }} 
                    className="cancel-popup-container">
                        <p>Are you sure to cancel this request?</p>
                        <div className="cancel-button-container">
                            <div className="cancel-button" onClick={handleCancel}><p>YES</p></div>
                            <div className="cancel-button" onClick={() => {setIsCancelPopUp(false)}}><p>NO</p></div>
                        </div>
                    </motion.div>
                </div> 
                : null}
        </div>
    )
}