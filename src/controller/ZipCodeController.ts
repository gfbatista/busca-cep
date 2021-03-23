import { Request, Response } from 'express'

import ZipCodeService from '../service/ZipCodeService';

class ZipCodeController {
    async find(request: Request, response: Response) {
        try {
            const { cep } = request.params;

            const zipCodeService = new ZipCodeService();

            let zipCode = await zipCodeService.find({ cep });

            return response.json(zipCode);

        } catch (err) {
            return response.status(400).json({ error: err.message });
        }

    }

    async create(request: Request, response: Response) {
        try {
            const { cep, rua, bairro, cidade, uf } = request.body

            const zipCodeService = new ZipCodeService();

            const zipCode = await zipCodeService.execute({ cep, rua, bairro, cidade, uf });

            return response.status(201).json(zipCode);
            
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export default ZipCodeController;