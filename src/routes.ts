import { Router } from 'express';
import SessionTokenController from './controller/SessionTokenController';

import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerConfig from './util/swagger';

import ZipCodeController from './controller/ZipCodeController';
import CheckConnection from './database/CheckConnection';
import Authorization from './middlewares/authorization';

const checkConnection = new CheckConnection();
const sessionTokenController = new SessionTokenController();
const zipCodeController = new ZipCodeController();

const swaggerDocs = swaggerJsDoc(swaggerConfig);

const routes = Router();

routes.use('/zipcode/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

routes.get('/zipcode/health/ping', checkConnection.ping);

routes.post('/zipcode/token', sessionTokenController.create);

routes.get('/zipcode/:cep', Authorization, zipCodeController.find);

routes.post('/zipcode', Authorization, zipCodeController.create);

export default routes;