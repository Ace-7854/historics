function createChatSession (username, password){
    const chatSessions = {
        username: username,
        password: password,
        message: []
    };
    
}

function accountLogin (body) {
    const { username, password } = body;

    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "db", "users.json"), "utf8"));

    // Finding specific users by email 
    const user = users.find(u => u.username === username);

    if (!user) {
        console.log("User not found");
        return {
            success: false,
            message: "User not found"
        };
    }// PASSWORD NEEDS TO BE HASHED BEFORE COMPARISON
    else if (user.password === password) {
        console.log("User logged in:", username);
        return {
            success: true,
            message: "Login Successful",
            user: {
                username: user.username,
                chats: user.chats || []
            }
        };
    }
    else {
        console.log("Incorrect Password");
        return {
            success: false,
            message: "Incorrect Password"
        };
    };

}
