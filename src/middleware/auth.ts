import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Adjust the path based on your structure

interface AuthRequest extends Request {
    user?: {
        id: string;
        role: 'Client' | 'Freelancer';
    };
}

const authenticateJWT = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const decoded: any = jwt.verify(token, '28cbf6bf7e4bcdc27f3ed3b9a1aa6a901232bc1d1533a1490fb9f9e76e7f15476897acb7a8b5605fd87a6d8ed0a1f9900f61b9457d32a43dfa8664e54a9f56aa');
            const user = await User.findById(decoded._id);

            if (!user) {
                return res.status(401).send({ message: 'Unauthorized' });
            }

            req.user = { id: user.id, role: user.role};
            next();
        } catch (error) {
            return res.status(403).send({ message: 'Forbidden' });
        }
    } else {
        return res.status(401).send({ message: 'Unauthorized' });
    }
};

export default authenticateJWT;
