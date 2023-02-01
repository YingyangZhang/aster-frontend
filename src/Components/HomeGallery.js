import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomeGallery() {
    return (
        <section className="home-gallery flex-box container">
            <div className="home-gallery-container flex-box">
                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .3 }} 
                    viewport={{ once: true }}
                    className="home-gallery-img-container">
                    <img src="https://i.postimg.cc/fL4WF5WP/pexels-rodnae-productions-8474799.png" alt="image" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .5 }} 
                    viewport={{ once: true }}
                    className="home-gallery-img-container" style={{width: "700px"}}>
                    <img src="https://i.postimg.cc/Vvmfs6CB/pexels-rodnae-productions-8474454.png" alt="image" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .7 }} 
                    viewport={{ once: true }}
                    className="home-gallery-img-container">
                    <img src="https://i.postimg.cc/ZKfbZJKp/pexels-rodnae-productions-8474500.png" alt="image" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0}} 
                    transition={{ duration: .8, delay: .9 }} 
                    viewport={{ once: true }}
                    className="home-gallery-img-container" style={{width: "700px"}}>
                    <img src="https://i.postimg.cc/ht6KzMmG/pexels-rodnae-productions-8474812.png" alt="image" />
                </motion.div>
            </div>
            
            <div className="home-gallery-headline-container flex-box">
                <div className="action-link-container">
                    <NavLink to="/gallery" exact="true">
                        <div className="action-link">
                            <h5 style={{color: "#1f1f1f"}}>MORE</h5>
                            <span class="material-symbols-outlined" style={{color: "#1f1f1f"}}>
                                trending_flat
                            </span>
                        </div>
                    </NavLink>
                </div>
                
                <div className="tag-charcoal">
                    <p>MOMENTS</p>
                </div>

                <h1>GALLERY</h1>
            </div>
        </section>
    )
}