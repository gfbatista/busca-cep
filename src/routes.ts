import { Router } from 'express';

import ZipCodeController from './controller/ZipCodeController';

const routes = Router();

routes.get('/zipcode/:cep', ZipCodeController.find);

routes.post('/zipcode', ZipCodeController.create);

export default routes;