import { Request, Response } from 'express'
import SessionTokenService from '../service/AuthenticateUserService';

class SessionTokenController {
    async create(request: Request, response: Response) {
        try {
            const sessionTokenService = new SessionTokenService();

            const { token } = await sessionTokenService.execute();

            return response.json({ token });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export default SessionTokenController;