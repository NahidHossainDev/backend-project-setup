import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { globalErrorHandler } from './app/middlewares/globalError';
import appRouter from './app/routes';

const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// applicaton router
app.use('/api/v1', appRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found!',
    errorMessage: [{ message: 'Api not found', path: req.originalUrl }],
  });
});

export default app;
