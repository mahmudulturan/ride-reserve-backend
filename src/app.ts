import express, { Request, Response } from 'express'
import cors from 'cors'
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import configs from './app/configs';

const app = express();

app.use(express.json());
app.use(cors({ origin: [configs.local_client_url!, configs.local_client_url!] }));

// routes
app.use('/api', router);

// root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Ride Reserver Backend');
})


// error response for not found route
app.use(notFound);

// global error handler
app.use(globalErrorHandler);


export default app;