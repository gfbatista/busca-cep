import { Request, Response } from 'express'

import ZipCodeService from '../service/ZipCodeService';
import ApiError from '../util/ApiError';
import { setCep } from '../util/functions';

class ZipCodeController {
    async find(request: Request, response: Response) {
        try {
            const { cep } = request.params;

            const zipCodeService = new ZipCodeService();

            let zipCode = await zipCodeService.find({ cep });

            if (!zipCode.length) {
                const newCep = cep;
                for (let index = cep.length - 1; index >= 0; index--) {
                    let cep = setCep(newCep, index, 0);
                    zipCode = await zipCodeService.find({ cep });
                    if (zipCode.length) {
                        break;
                    }
                }
            }

            if (!zipCode.length) {
                throw new ApiError('CEP inválido',);
            }

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