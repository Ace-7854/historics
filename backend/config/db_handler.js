import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE_PATH = path.join(__dirname, "../db/users.json");

/**
 * Loads all users from the database file.
 * @returns {array} Array of user objects, empty array on error
 */
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

/**
 * Persists users array to the database file.
 * @param {array} users - Array of user objects to save
 */
function saveUsers(users) {
    try {
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(users, null, 2));
    }
    catch (error) {
        console.error('Error saving users:', error);
    }
}

/**
 * Adds a new user to the database.
 * @param {string} username - The username
 * @param {string} password - The hashed password
 * @returns {boolean} True on success
 */
export function addUsers(username, password) {
    const users = loadUsers();
    users.push({username, password, chats:[]});
    saveUsers(users);
    console.log('User added successfully.');
    return true;
}

/**
 * Finds a user by username.
 * @param {string} username - The username to search for
 * @returns {object|undefined} User object if found, undefined otherwise
 */
export function findUser(username) {
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    return user;
}

