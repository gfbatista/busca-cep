import { Router } from 'express';

import ZipCodeController from './controller/ZipCodeController';
import CheckConnection from './database/CheckConnection';

const routes = Router();

routes.get('/zipcode/health/ping', CheckConnection.ping);

routes.get('/zipcode/:cep', ZipCodeController.find);

routes.post('/zipcode', ZipCodeController.create);

export default routes;