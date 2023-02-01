import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

export default function HomeReservation() {
    const [isInView, setIsInView] = useState(false);

    return (
        <div className="background-color container">
            <section className="home-reservation container">
                <div className="home-reservation-headline-container flex-box">
                    <div className="tag-white">
                        <p>EXPLORE</p>
                    </div>
                    <h1><span className="add-line-break">MAKE A</span><span className="add-line-break reservation-margin">RESERVATION</span> <span className="request-margin">REQUEST</span></h1>
                </div>

                <div className="reservation-info-container">
                    <motion.div initial={false}
                    animate={
                    isInView
                        ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                        : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
                    }
                    transition={{ duration: 1, delay: .5}}
                    viewport={{ once: true }}
                    onViewportEnter={() => setIsInView(true)}
                    className="home-reservation-img-container">
                        <img src="https://aster-imgs.s3.amazonaws.com/pexels-rodnae-productions-8474460.png" alt="image" className="center-img" />
                    </motion.div>

                    <div className="reservation-info flex-box">
                        <p>
                        Our goal is to make every flight a positive experience for our customers. 
                        We provide a high level of performance. We have detailed training programs and system 
                        enhancements to support our employees in providing a safe and memorable filght to our 
                        customers. Let's explore the future, make a reservation request today!


                        </p>
                        
                        <div className="action-link-container">
                            <NavLink to="/reservation" exact="true">
                                <div className="action-link">
                                    <h5>REQUEST</h5>
                                    <span className="material-symbols-outlined" style={{color: ""}}>
                                        trending_flat
                                    </span>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}