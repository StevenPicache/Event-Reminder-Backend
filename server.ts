import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port: number = 8000;



const eventRoutes = require('./routes/events')


app.use('/events', eventRoutes);



app.get('/', (req: Request, res: Response) => {
    res.send('Hello, this is Express + TypeScript');
});
app.listen(port, () => {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});