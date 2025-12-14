import { findUser } from "../config/db_handler.js";
import { verifyPassword } from "../security/hash.js";


/**
 * Validates username and password credentials.
 * @param {string} username - The username to check
 * @param {string} password - The password to verify
 * @returns {object|boolean} User object if valid, false otherwise
 */
function checkUsernamePassword(username, password) {
    const user = findUser(username);

    if (!user) {
        console.log("Username: ",username, " not found");
        return false;
    }
    else if (verifyPassword(user.password, password)) {
        console.log("User logged in:", username);
        return user;
    }
    else {
        console.log("Incorrect Password");
        return false;
    };
}

export default checkUsernamePassword;