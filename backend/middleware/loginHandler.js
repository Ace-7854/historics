import checkUsernamePassword from "./validate.js";

function createChatSession (username, password){
    const chatSessions = {
        username: username,
        password: password,
        message: []
    };
    
}

function accountLogin (body) {
    const { username, password } = body;

    if (checkUsernamePassword(username, password)) {
        return {
            success: true,
            message: "Login Successful",
            user: {
                username: username,
                chats: [] // Placeholder for user chats
            }
        };
    }
    else {
        return {
            success: false,
            message: "Incorrect Password"
        };
    };

}

// const test = {
//     username: "HughWooll",
//     password: "hashed_password_002"
// };
// accountLogin(test);