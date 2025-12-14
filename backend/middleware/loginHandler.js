import checkUsernamePassword from "./validate.js";

/**
 * Authenticates a user by verifying username and password.
 * @param {object} body - Request body containing username and password
 * @param {string} body.username - The username
 * @param {string} body.password - The password
 * @returns {object} Login response with status, message, and user object
 */
export default function accountLogin (body) {
    const { username, password } = body;
    const user = checkUsernamePassword(username, password)
    
    if (user) {
        return { status: 'success', message: 'Login successful', user: user};
    }
    else {
        return { status: 'error', message: 'Invalid username or password', user: null};
    }
}

