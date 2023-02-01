import React, { useState, useRef, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import InformationForm from "./InformationForm";

export default function PopUpForms({setIsPopUpForms, currentUser, setCurrentUser}) {
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    const [isInformationForm, setIsInformationForm] = useState(false);
    let popUpRef = useRef();

    useEffect(() => {
        let handler = e => {
            if(!popUpRef.current.contains(e.target)) {
                setIsPopUpForms(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    return (
        <div className="pop-up-forms">
            {isInformationForm ? 
            <InformationForm popUpRef={popUpRef} currentUser={currentUser} setCurrentUser={setCurrentUser} setIsPopUpForms={setIsPopUpForms}/>
            :
            isSignUpForm ? 
            <SignUpForm popUpRef={popUpRef} setIsSignUpForm={setIsSignUpForm} setIsInformationForm={setIsInformationForm} setCurrentUser={setCurrentUser}/>
            : 
            <LoginForm popUpRef={popUpRef} setIsSignUpForm={setIsSignUpForm} setCurrentUser={setCurrentUser} setIsPopUpForms={setIsPopUpForms}/>}
        </div>
    )
}