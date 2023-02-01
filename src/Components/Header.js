import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function Header({setIsPopUpForm, currentUser, setCurrentUser}) {  
    const [isUserSelections, setIsUserSelections] = useState(false);
    let userRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        let handler = (e) => {
            if(!userRef.current.contains(e.target)) {
                setIsUserSelections(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    function handleUserSelections() {
        setIsUserSelections(userSelections => !userSelections);
    }

    function handleSelection() {
        setIsUserSelections(false);
    }

    function handleLogout(e) {
        e.stopPropagation();
        localStorage.removeItem('jwt');
        setCurrentUser(null);
        navigate('/');
    }

    return (
        <div className="header">
            <div className="nav flex-box container">
                <div className="logo-container">
                    <NavLink to="/" exact="true"><img src="https://aster-imgs.s3.amazonaws.com/logo.png" alt="logo" /></NavLink>
                </div>
                <ul className="menu">
                    <li><NavLink to="/" exact="true">HOME</NavLink></li>
                    <li><NavLink to={currentUser ? '/reservation' : '/'} exact="true" onClick={currentUser ? null : (() => setIsPopUpForm(true))}>RESERVATION</NavLink></li>
                    <li><NavLink to="/gallery" exact="true">GALLERY</NavLink></li>
                    {currentUser ? 
                    <div className="user-drop-down" ref={userRef}>
                        <div className="user-btn" onClick={handleUserSelections}>
                            <p>{currentUser.username.toUpperCase()}</p> <i className='bx bx-chevron-down'></i>
                        </div>
                        {isUserSelections ? 
                        <motion.div initial={{ opacity: 0, y: -5 }} 
                        whileInView={{ opacity: 1, y: 0}} 
                        transition={{ duration: .4 }} 
                        viewport={{ once: true }} 
                        className="user-selections flex-box">
                            <NavLink to="/profile" exact="true" onClick={handleSelection}><p>PROFILE <i className='bx bx-user' ></i></p></NavLink>
                            <NavLink to="/user_request" exact="true" onClick={handleSelection}><p>REQUEST <i className='bx bx-book-content'></i></p></NavLink>
                            <p onClick={handleLogout}>LOGOUT <i className='bx bx-log-out'></i> </p>
                        </motion.div> 
                        : null}        
                    </div> 
                    :
                    <li className="login-link" onClick={() => setIsPopUpForm(true)} ref={userRef}>LOGIN</li>
                    }
                    
                    
                </ul>
            </div>
        </div>
    )
}