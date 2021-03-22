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

/**
 * @swagger 
 * /zipcode/health/ping:
 *  get:
 *      description: Checagem da conexão da aplicação
 *      responses:
 *          '200':
 *              description: Connected to the database.
 *          '500':
 *              description: Database not connected.
 */
routes.get('/zipcode/health/ping', checkConnection.ping);

routes.post('/zipcode/token', sessionTokenController.create);

/**
 * @swagger 
 * /zipcode/{cep}:
 *  get: 
 *     description: Busca de um determinado CEP 
 *     parameters: 
 *       - 
 *         in: path
 *         name: cep
 *         required: true
 *         schema: 
 *           format: string
 *     responses:
 *          '200':
 *              description: Ok 
 *          '400':
 *              description: Bad Request           
 *          '401':
 *              description: Unauthorized 
 */
routes.get('/zipcode/:cep', Authorization, zipCodeController.find);

/**
 * @swagger 
 * /zipcode:
 *  post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cep:
 *                 type: string 
 *               rua:
 *                 type: string   
 *               bairro:
 *                 type: string 
 *               cidade:
 *                 type: string 
 *               uf:
 *                 type: string 
 *     responses:
 *          '201':
 *              description: Created
 *          '400':
 *              description: Bad Request           
 *          '401':
 *              description: Unauthorized  
 */
routes.post('/zipcode', Authorization, zipCodeController.create);

export default routes;