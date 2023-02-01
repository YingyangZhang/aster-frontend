import React from "react";
import ReservationForm from "./ReservationForm";
import Footer from "./Footer";

export default function Reservation({currentUser, setCurrentUser}) {
    return (
        <div className="background-color container">
            <div className="reservation">
                <div className="reservation-headline-container">
                    <div className="reservation-healine flex-box">
                        <h1>RESERVATION</h1>
                        <div className="tag-charcoal">
                            <p>EXPLORE</p>
                        </div>
                    </div>
                </div>

                <ReservationForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>          
            </div>
            <Footer />
        </div>
    )
}