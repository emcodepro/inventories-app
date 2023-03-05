import express from 'express';
import router from "./routes/index";
import connection from "./db/config";
import {json, urlencoded} from "body-parser";

const app = express();

app.use(json());

app.use(urlencoded({extended: true}));

app.use('/', router);

connection.sync()
    .then(() => console.log("Connection synced successfully"))
    .catch((err) => console.log("Error", err));

app.listen(3000);