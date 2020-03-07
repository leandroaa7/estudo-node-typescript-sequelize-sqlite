import { Sequelize } from 'sequelize';
///import config from './config';
const config = require('../../config/database/config.json');
export const database = new Sequelize(config);