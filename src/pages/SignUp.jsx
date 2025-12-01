import { useState } from "react";
import { Link } from 'react-router-dom';

export default function SignUp() {
    
    const [signUp, setSignUp] = useState(false);
    const [error, setError] = useState(null);


    function handleOnChange(event) {
        console.log("Input changed:", event.target.value);
        if (document.getElementById("password").value !== document.getElementById("confirm-pass").value) {
            setError("Passwords do not match");
            document.querySelector(".error-label").textContent = "Passwords do not match";
        } else {
            setError(null);
            document.querySelector(".error-label").textContent = "";
        }
    }    

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Sign Up form submitted");
    }

    return (
        <div className="signup-form">
            <h2>Sign Up</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" className="signup-user" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="signup-pass" required/>

                    <label htmlFor="confirm-pass">Confirm Password:</label>
                    <input type="password" id="confirm-pass" className="signup-pass" onChange={handleOnChange} required/>
                    <label className="error-label"></label>
                </div>
                <button type="submit" className="signup-btn">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/Login" title="/Login">Login</Link></p>
        </div>  

    );
}