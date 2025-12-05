import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function checkUsernamePassword(username, password) {

    const users = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "db", "users.json"), "utf8"));
    const user = users.find(u => u.username === username);

    if (!user) {
        console.log("Username: ",username, " not found");
        return false;
    }// PASSWORD NEEDS TO BE HASHED BEFORE COMPARISON
    else if (user.password === password) {
        console.log("User logged in:", username);
        return true;
    }
    else {
        console.log("Incorrect Password");
        return false;
    };
}

export default checkUsernamePassword;