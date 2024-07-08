import { Request } from 'express';

interface JwtPayload {
    id: string;
    role: 'Client' | 'Freelancer';
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}
