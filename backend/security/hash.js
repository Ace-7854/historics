import argon from 'argon2';

export async function hashPassword(password) {
    const hash = await argon.hash(password, );
    return hash;
}

export async function verifyPassword(hash, password) {
    const isValid = await argon.verify(hash, password);
    return isValid;
}