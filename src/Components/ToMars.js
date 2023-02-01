import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

export default function ToMars() {
    const [isInView, setIsInView] = useState(false);

    return (
        <section className="to-mars flex-box container">
            <div className="to-mars-headline-container flex-box">
                <h1><span className="add-line-break">TO MARS</span> <span id="to-mars-headline-margin">AND BACK</span></h1>
                <div className="tag-charcoal">
                    <p>JOURNEY</p>
                </div>
                <motion.div initial={false}
                animate={
                isInView
                    ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                    : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
                }
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                onViewportEnter={() => setIsInView(true)}
                className="to-mars-img-container">
                    <img src="https://aster-imgs.s3.amazonaws.com/pexels-pixabay-355906.png" alt="image" className="center-img" />
                </motion.div>
            </div>

            <div className="steps-container">
                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .2}} 
                    viewport={{ once: true }} 
                    className="step">
                    <h1>01</h1>
                    <h2>LAUNCH & BOOSTER RETURN</h2>
                    <p>Starship launches with Starship Super Heavy Booster. Booster separattes, returning to Earth.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .2}} 
                    viewport={{ once: true }} 
                    className="step">
                    <h1>02</h1>
                    <h2>SHIP ARRIVES IN EARTH ORBIT</h2>
                    <p>Starship enters Earths orbit while a refilling tanker launches to mate with Starship in orbit.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .2}} 
                    viewport={{ once: true }} 
                    className="step">
                    <h1>03</h1>
                    <h2>TANKERS REFILL SHIP</h2>
                    <p>Tanker ship docks with Starship, refilling Starship and returning to Earth.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .4}} 
                    viewport={{ once: true }} 
                    className="step">
                    <h1>04</h1>
                    <h2>REFILLED SHIP TRAVELS TO MARS</h2>
                    <p>Once Starship has been refueled, it will begin its journey from Earth orbit, around the Sun and onward to Mars.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .4}} 
                    viewport={{ once: true }} 
                    className="step">
                    <h1>05</h1>
                    <h2>SHIP REFILLED ON MARS</h2>
                    <p>When Starship lands on Mars it will be refueled using Mars local resources of H2O and CO2.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .4}} 
                    viewport={{ once: true }} 
                    className="step">
                    <h1>06</h1>
                    <h2>RETURN TO EARTH</h2>
                    <p>When Starship is fully refueled it will begin Mars ascent and direct return to Earth.</p>
                </motion.div>
            </div>
        </section>
    )
}