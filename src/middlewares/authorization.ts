import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../util/auth';
import ApiError from '../util/ApiError';

export default function authorization(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new ApiError('Token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        verify(token, authConfig.jwt.secret);

        return next();
    } catch {
        throw new ApiError('Invalid token', 401);
    }
}
