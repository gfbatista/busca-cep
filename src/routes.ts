import { Router } from 'express';
import SessionTokenController from './controller/SessionTokenController';

import ZipCodeController from './controller/ZipCodeController';
import CheckConnection from './database/CheckConnection';
import Authorization from './middlewares/authorization';

const checkConnection = new CheckConnection();
const sessionTokenController = new SessionTokenController();
const zipCodeController = new ZipCodeController();

const routes = Router();

routes.get('/zipcode/health/ping', checkConnection.ping);

routes.post('/zipcode/token', sessionTokenController.create);

routes.get('/zipcode/:cep', Authorization, zipCodeController.find);

routes.post('/zipcode', Authorization, zipCodeController.create);

export default routes;