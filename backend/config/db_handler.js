import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE_PATH = path.join(__dirname, "../db/users.json");

function loadUsers() {
    try {
        const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error loading users:', error);
        return [];
    }
}

function saveUsers(users) {
    try {
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(users, null, 2));
    }
    catch (error) {
        console.error('Error saving users:', error);
    }
}

export function addUsers(username, password) {
    const users = loadUsers();
    users.push({username, password, chats:[]});
    saveUsers(users);
    console.log('User added successfully.');
    return true;
}

export function findUser(username) {
    const users = loadUsers();
    return users.map(user => user.filter(u => u.username === username)[0]);
}

