import jwt from 'jsonwebtoken';

export const generateJwtToken = (
    payload: { userId: string; role: string },
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(payload, secret, {
        expiresIn,
    });
};