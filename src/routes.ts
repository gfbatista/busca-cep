import { Router } from 'express';

import ZipCodeController from './controllers/ZipCodeController';

const routes = Router();

routes.get('/zipcode', ZipCodeController.find);

export default routes;