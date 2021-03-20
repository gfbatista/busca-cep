import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import ZipCodeRepository from '../repository/ZipCodeRepository';

class ZipCodeController {
    async find(request: Request, response: Response) {
        const { cep } = request.params;

        const zipCodeRepository = getCustomRepository(ZipCodeRepository);

        const zipCode = await zipCodeRepository.find({
            where: {
                cep
            }
        });

        return response.json(zipCode);
    }

    async create(request: Request, response: Response) {
        try {
            const { cep, rua, bairro, cidade, uf } = request.body

            const zipCodeRepository = getCustomRepository(ZipCodeRepository);

            const data = { cep, rua, bairro, cidade, uf }

            const schema = Yup.object().shape({
                cep: Yup.string().required(),
                rua: Yup.string().required(),
                bairro: Yup.string().required(),
                cidade: Yup.string().required(),
                uf: Yup.string().required(),
            });

            await schema.validate(data, { abortEarly: false });

            const zipCode = zipCodeRepository.create(data);

            await zipCodeRepository.save(zipCode);

            return response.status(201).json(zipCode);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}

export default ZipCodeController;