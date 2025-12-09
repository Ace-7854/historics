import checkUsernamePassword from "./validate.js";

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

