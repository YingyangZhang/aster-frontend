import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import UpdateInformationForm from "./UpdateInformationForm";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 20px, rgba(0,0,0,1) 20px, rgba(0,0,0,1) 20px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 20px)`;

export default function Profile({currentUser, setCurrentUser}) {
    const [isInView, setIsInView] = useState(false);
    const navigate = useNavigate();

    function handleLogout(e) {
        e.stopPropagation();
        localStorage.removeItem('jwt');
        setCurrentUser(null);
        navigate('/');
    }

    return (
        <div className="profile container">
            <div className="profile-container flex-box">
                <div className="profile-headline-container flex-box">
                    <h1>PROFILE</h1>
                    <div className="tag-charcoal">
                        <p>WELCOME BACK</p>
                    </div>
                </div>

                <motion.div
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: .5 }}  
                className="user-card">
                    <div className="card-left-container flex-box">
                        <motion.div initial={false}
                        animate={
                        isInView
                            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
                        }
                        transition={{ duration: 1, delay: .2}}
                        viewport={{ once: true }}
                        onViewportEnter={() => setIsInView(true)}
                        className="profile-img-container">
                            <img src="https://aster-imgs.s3.amazonaws.com/avatar.png" alt="avatar" className="center-img"/>
                        </motion.div>

                        <h1>MELONAIRE</h1>
                    </div>

                    <div className="card-right-container flex-box">
                        <div className="card-information-container">
                            <UpdateInformationForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>

                            <div className="profile-request">
                                <h1>Request</h1>
                                {currentUser.request ? <p>YOUR REQUEST IS BEING PROCESSING.</p> : <p>YOU DON'T HAVE ANY REQUEST YET.</p>}
                                
                                <NavLink to={ currentUser.request ? '/user_request' : '/reservation'} exact="true" className="request-link">
                                    {currentUser.request ? <p>VIEW REQUEST</p> : <p>REQUEST NOW</p>}
                                    <span className="material-symbols-outlined" style={{color: "#e7e7e7"}}>
                                        trending_flat
                                    </span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="card-logout" onClick={handleLogout}>
                            <p>LOGOUT</p>
                            <i className='bx bx-log-out'></i>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    )
}