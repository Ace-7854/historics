import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {signupUser} from "../api/base.js";
import { useRef } from 'react';

export default function SignUp() {
    const [signUp, setSignUp] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPassRef = useRef(null);


    function handleOnChange(event) {
        console.log("Input changed:", event.target.value);
        if (passwordRef.current.value !== confirmPassRef.current.value) {
            setError("Passwords do not match");
            document.querySelector(".error-label").textContent = "Passwords do not match";
        } else {
            setError(null);
            document.querySelector(".error-label").textContent = "";
        }
    }    

    function handleSubmit(event) {
        if (!error) {
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
        // const username = document.getElementById("username").value;
        // const password = document.getElementById("password").value;
        const credentials = JSON.stringify({ username , password });
        console.log("Credentials to sign up:", credentials);
        
        const response = signupUser(credentials);
        if (response) {
            setSignUp(true);
            console.log("Sign-up successful:", response);
            alert("Sign-up successful! Please log in.");
            navigate("/Login");
        }
        else {
            document.querySelector(".error-label").textContent = "Sign-up failed. Username may already exist.";
        }
    }
}

    return (
        <div className="signup-page">
            <div className="signup-card">
            <h2 className="form-title">Sign Up</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input ref={usernameRef} type="text" id="username" className="signup-user" required />

                    <label htmlFor="password">Password</label>
                    <input ref={passwordRef} type="password" id="password" className="signup-pass" required/>

                    <label htmlFor="confirm-pass">Confirm Password:</label>
                    <input ref={confirmPassRef} type="password" id="confirm-pass" className="signup-pass" onChange={handleOnChange} required/>
                    <label className="error-label"></label>
                </div>
                <button type="submit" className="signup-btn" onClick={handleSubmit}>Sign Up</button>
            </form>

            <p>Already have an account? <Link to="/Login" title="/Login">Login</Link></p>
            </div>
        </div>  

    );
}