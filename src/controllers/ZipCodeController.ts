import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import ZipCodeRepository from '../repositories/ZipCodeRepository';

export default {
    async find(request: Request, response: Response) {
        const zipCodeRepository = getCustomRepository(ZipCodeRepository);

        const zipCode = await zipCodeRepository.find();

        return response.json(zipCode);
    }
}