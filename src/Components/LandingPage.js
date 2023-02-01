import React from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
    return (
        <section className="landing-page container">
            <div className="headline-container flex-box">
                <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0}} 
                transition={{ duration: 1, delay: .2 }} 
                viewport={{ once: true }} 
                className="headline">
                    <h1>MARS <br></br> TRAVELING.</h1>
                    <p>Make your dream come true.</p>
                </motion.div>
                <div className="tag-charcoal">
                    <p>2046</p>
                </div>
            </div>
            
            <div className="planet-container">
                <img src="https://aster-imgs.s3.amazonaws.com/mars.png" alt="mars" />
            </div>
            
            <div className="decoration-container flex-box container">
                <div className="sphere-container">
                    <img src="https://aster-imgs.s3.amazonaws.com/wire-sphere.png" alt="sphere" />
                </div>
                <p>MARTE</p>
            </div>
        </section>
    )
}