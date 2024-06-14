import express, { Request, Response } from 'express'
import cors from 'cors'
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { authRoutes } from './app/modules/auth/auth.route';
import { carRoutes } from './app/modules/car/car.route';

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

// root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Ride Reserver Backend');
})


// error response for not found route
app.use(notFound);

// global error handler
app.use(globalErrorHandler);


export default app;