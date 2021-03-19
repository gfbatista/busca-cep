import express, { Request, Response, NextFunction } from 'express';
import AppError from './util/AppError';

import './database';

import routes from './routes';

const app = express();

const port = 3333;

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});