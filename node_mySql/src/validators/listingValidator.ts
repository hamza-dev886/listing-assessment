import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateListing = [
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('city').isString().notEmpty().withMessage('City is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be a non-negative integer'),
    body('agentId').isInt({ min: 1 }).withMessage('AgentId must be a positive integer'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            error: true, 
            message: errors.array().map(e => e.msg).join(', ') 
        });
    }
    next();
};