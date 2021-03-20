import { sign } from 'jsonwebtoken';
import authConfig from '../util/auth';

interface Response {
    token: string;
}

class SessionTokenService {
    public async execute(): Promise<Response> {

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: "",
            expiresIn,
        });

        return {
            token
        };
    }
}

export default SessionTokenService;
