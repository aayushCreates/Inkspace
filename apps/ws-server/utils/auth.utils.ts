import jwt, { JwtPayload } from 'jsonwebtoken';

export const validateToken = async (token: string)=> {
    const secretKey = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    return {
        id: decoded?.id as string,
        email: decoded?.email as string
    }
}