import {Sequelize} from 'sequelize-typescript';
import {Inventory} from "../models/Inventory";
require('dotenv').config();

// @ts-ignore
const connection = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    logging: false,
    port: process.env.DB_PORT,
    models: [Inventory]
});

export default connection;
