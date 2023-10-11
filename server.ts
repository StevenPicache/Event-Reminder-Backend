import express, { Express, Request, Response } from 'express';
import eventRoutes from './src/routes/events';
import { SequelizeInit } from './src/config/sequelize';
import initMiddleWare from './middleware/middleware';


let app: Express = express();
const port: number = 8000;

app = initMiddleWare(app)
SequelizeInit();

app.use('/events', eventRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, this is Express + TypeScript');
});
app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});

