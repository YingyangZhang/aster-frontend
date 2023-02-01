import '../index.css';
import { Route, Routes } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import { useState, useEffect } from 'react';
import PopUpForms from './PopUpForms';
import Profile from './Profile';
import Reservation from './Reservation';
import Gallery from './Gallery';
import UserRequest from './UserRequest';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isPopUpForms, setIsPopUpForms] = useState(false);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token !== null) {
      fetch("https://aster-app.onrender.com/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(r => r.json())
      .then(data => {
        setCurrentUser(data.user)
        console.log(data.user)
      })
    }
   },[])

  return (
    <div className="App">
      {isPopUpForms ? <PopUpForms setIsPopUpForms={setIsPopUpForms} currentUser={currentUser} setCurrentUser={setCurrentUser}/> : null}
      <Header setIsPopUpForm={setIsPopUpForms} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {currentUser ?  <Route exact path="/profile" element={<Profile currentUser={currentUser} setCurrentUser={setCurrentUser}/>} /> : null}
        {currentUser ? <Route exact path="/reservation" element={<Reservation currentUser={currentUser} setCurrentUser={setCurrentUser}/>} /> : null}
        <Route exact path="/gallery" element={<Gallery />} />
        {currentUser ? <Route exact path="/user_request" element={<UserRequest currentUser={currentUser} setCurrentUser={setCurrentUser}/>} /> : null}
      </Routes>
    </div>
  );
}

export default App;
