import { Router } from 'express';

import ZipCodeController from './controller/ZipCodeController';

const routes = Router();

routes.get('/zipcode', ZipCodeController.find);

export default routes;