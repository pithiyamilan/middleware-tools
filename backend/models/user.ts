import jwt, { Secret } from 'jsonwebtoken';

export const getJWTToken = (userID: any) => {
    const payload = { userId: userID };
    return jwt.sign(payload, process.env.JWT_SECRET??"", { expiresIn: process.env.JWT_EXPIRES_TIME });
}