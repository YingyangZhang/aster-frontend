import React from "react";
import { useEffect, useState, useRef} from "react";

export default function UpdateInformationForm({currentUser, setCurrentUser}) {
    const [isGenderSelections, setIsGenderSelections] = useState(false);
    const [selectedGender, setSelectedGender] = useState(currentUser.gender ? currentUser.gender : 'select');
    const [firstName, setFirstName] = useState(currentUser.first_name ? currentUser.first_name : '');
    const [lastName, setLastName] = useState(currentUser.last_name ? currentUser.last_name : '');
    const [email, setEmail] = useState(currentUser.email ? currentUser.email : '');
    const [age, setAge] = useState(currentUser.age ? currentUser.age : '');
    let genderRef = useRef();
    const token = localStorage.getItem("jwt");

    useEffect(() => {
        let handler = e => {
            if(!genderRef.current.contains(e.target)) {
                setIsGenderSelections(false);
            }
        }

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    })

    function handleGenderSelections() {
        setIsGenderSelections(genderSelections => !genderSelections);
    }

    function handleSelection(e) {
        setIsGenderSelections(false);
        setSelectedGender(e.target.textContent);
    }

    function handleSave(e) {
        e.preventDefault();

        fetch(`https://aster-app.onrender.com/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                age: age,
                gender: selectedGender,
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setCurrentUser(data.user);
                })
            } else {
                r.json().then((errors) => {
                    console.log(errors)
                })
            }
        })
    }

    return (
        <form className="form" style={{padding: "0"}} onSubmit={handleSave}>
            <div className="input-flex-container">
                <div className="user-input">
                    <p>First Name</p>
                    <input type="text" placeholder="Enter First Name" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>

                <div className="user-input">
                    <p>Last Name</p>
                    <input type="text" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
            </div>

            <div className="input-flex-container">
                <div className="user-input">
                    <p>Email</p>
                    <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="age-and-gender-container flex-box">
                    <div className="user-input">
                        <p>Age</p>
                        <input type="text" value={age} onChange={(e) => setAge(e.target.value)}/>
                    </div>

                    <div className="gender-dropdown" ref={genderRef}>
                        <p>Gender</p>
                        <div className="gender-btn flex-box" onClick={handleGenderSelections}>
                            <p>{selectedGender}</p>
                            <i className='bx bx-chevron-down'></i>
                        </div>
                        {isGenderSelections ? 
                        <div className="gender-selections flex-box">
                            <p onClick={handleSelection}>Male</p>
                            <p onClick={handleSelection}>Female</p>
                            <p onClick={handleSelection}>Intersex</p>
                            <p onClick={handleSelection}>Trans</p>
                            <p onClick={handleSelection}>Others</p>
                        </div> 
                        : null}
                    </div>
                </div>
            </div>
    
            <div className="buttons-container button-grey">
                <button className="button" type="submit" style={{textAlign: "center"}}>
                    <p>SAVE</p>
                </button>
            </div>
        </form> 
    )
}