import React from "react";
import LandingPage from "./LandingPage";
import WhyMars from "./WhyMars";
import ToMars from "./ToMars";
import HomeReservation from "./HomeReservation";
import HomeGallery from "./HomeGallery";
import Footer from "./Footer";

export default function Home({currentUser, setIsPopUpForms}) {
    return (
        <>
            <LandingPage />
            <WhyMars />
            <ToMars />
            <HomeReservation currentUser={currentUser} setIsPopUpForms={setIsPopUpForms}/>
            <HomeGallery />
            <Footer />
        </>
    )
}