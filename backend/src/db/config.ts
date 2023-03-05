import {Sequelize} from 'sequelize-typescript';
import {Inventory} from "../models/Inventory";

const connection = new Sequelize({
    host: '127.0.0.1',
    username: 'emcodep',
    password: '123456',
    database: 'jobtask',
    dialect: 'postgres',
    logging: false,
    models: [Inventory]
});

export default connection;
