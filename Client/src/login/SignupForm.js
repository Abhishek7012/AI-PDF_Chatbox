import React, { useEffect, useState } from "react";
import './SignupForm.css'; // Import your custom CSS file
import { useNavigate } from "react-router-dom"

const SignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const collectData = async (e) => {
        e.preventDefault(); 
        console.warn(name, email, password);
        let result;
    
        try {
            result = await fetch("http://localhost:5000/register", {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (result.ok) {
                result = await result.json();
                console.log('resultsignup', result);
                localStorage.setItem("user", JSON.stringify(result.name));
                localStorage.setItem("email", JSON.stringify(result.email));
                navigate('/');
            } else {
                // Handle the case when the email is already used for signing up
                // Show an error message on the UI
                // For example, you can set an error state variable and display it in the UI
                setErrorMessage("Email already used for signing up");
            }
        } catch (error) {
            // Handle any other errors that may occur during the fetch request
            console.error(error);
            // Show an error message on the UI
            // For example, you can set an error state variable and display it in the UI
            setErrorMessage("An error occurred during sign up");
        }
    }
    return (
        <>
               {errorMessage && errorMessage === "Email already used for signing up" && (
    <div className="error-message">
        <p>{errorMessage}</p>
    </div>
)}

        <div className="login-box">
            <div className="card custom-card">
                <div className="card-body">
                    <h1 className="login-header">Sign Up</h1>
                    <form>
                        <div className="input-box">
                            <input type="text" className="input-field" placeholder="Enter Name"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <input type="text" className="input-field" placeholder="Enter Email"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-box">
                            <input type="password" className="input-field" placeholder="Enter password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-submit">
                            <button onClick={collectData} className="submit-btn">Sign Up</button>

                        </div>
                        <div className="log-in-link">
                            <p>Already have account? <a href="/login">Log In</a></p>
                        </div>
                   </form>
                </div>
            </div>
             
        </div>
        </>
    )

}
export default SignupForm;