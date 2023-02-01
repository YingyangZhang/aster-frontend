import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

export default function WhyMars() {
    const [isInView, setIsInView] = useState(false);

    return (
        <div className="background-color container">
            <section className="why-mars flex-box container">
                <div className="why-mars-headline-container flex-box">
                    <div className="why-mars-headline">
                        <h1>
                            WHY <span>MARS</span>
                        </h1>
                        <div className="tag-white">
                            <p>PROBABILITY</p>
                        </div>
                    </div>

                    <div className="why-mars-text">
                        <p>Mars is one of Earth's closest habitable neighbors. Mars is 
                            about half again as far from the Sun as Earth is, so it still 
                            has decent sunlight. We can grow plants on Mars just by compressing 
                            the atmosphere. Gravity on Mars is about 38% of that of Earth, 
                            so you would be able to lift heavy things and bound around. 
                            Furthermore, the day is remarkably close to that of Earth.
                        </p>
                    </div>
                </div>

                <div className="mars-details-container">
                    <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8 }} 
                    viewport={{ once: true }} 
                    className="details flex-box">
                        <p>DIAMETER</p>
                        <p>6,791 KM / 4,220 MI</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .1}} 
                    viewport={{ once: true }}
                    className="details flex-box">
                        <p>DAY LENGTH</p>
                        <p>24 HRS</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .2}} 
                    viewport={{ once: true }}
                    className="details flex-box">
                        <p>FORCE OF GRAVITY</p>
                        <p>38% OF EARTH</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .3}} 
                    viewport={{ once: true }}
                    className="details flex-box">
                        <p>AVG DISTANCE FROM EARTH</p>
                        <p>255 MKM / 140 MMI</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .4}} 
                    viewport={{ once: true }}
                    className="details flex-box">
                        <p>AGE</p>
                        <p>4.5 BILLION YEARS</p>
                    </motion.div>
                </div>

                <motion.div initial={false}
                animate={
                isInView
                    ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                    : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
                }
                transition={{ duration: 1, delay: .5}}
                viewport={{ once: true }}
                onViewportEnter={() => setIsInView(true)}
                className="why-mars-img-container">
                    <img src="https://aster-imgs.s3.amazonaws.com/pexels-rodnae-productions-8474450.png" alt="image" />
                </motion.div>
            </section>
        </div>
    )
}