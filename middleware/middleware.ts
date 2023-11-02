import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';

function initMiddleWare(app: Express) {
    const cors=require("cors");
    const corsOptions ={
    origin:'*', 
    credentials:true,           
    optionSuccessStatus:200,
    }
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors(corsOptions))

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        );
        next();
    })

    return app
}

export default initMiddleWare