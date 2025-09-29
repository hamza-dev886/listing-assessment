import { Response } from 'express';

const errorResponse = (res: Response, message: string = "Something went wrong", status: number = 500): Response => {
    return res.status(status).json({ error: true, message: message || "Something went wrong" });
};

export default errorResponse;