import argon2 from 'argon2';

/**
 * Hashes a password using Argon2.
 * @async
 * @param {string} password - The password to hash
 * @returns {Promise<string>} The hashed password
 */
export async function hashPassword(password) {
    const hash = await argon2.hash(password, );
    return hash;
}

/**
 * Verifies a password against its Argon2 hash.
 * @async
 * @param {string} hash - The hashed password
 * @param {string} password - The password to verify
 * @returns {Promise<boolean>} True if password matches, false otherwise
 */
export async function verifyPassword(hash, password) {
    const isValid = await argon2.verify(hash, password);
    return isValid;
}