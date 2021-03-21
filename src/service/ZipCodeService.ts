import ZipCode from "../model/ZipCode";
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';

import ZipCodeRepository from '../repository/ZipCodeRepository';

interface CepRequest {
    cep: string;
}

interface ZipCodeRequest {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;
}

class ZipCodeService {
    public async find({ cep }: CepRequest): Promise<ZipCode[]> {

        const zipCodeRepository = getCustomRepository(ZipCodeRepository);

        const zipCode = await zipCodeRepository.find({
            where: {
                cep
            }
        });

        return zipCode;
    }


    public async execute({ cep, rua, bairro, cidade, uf }: ZipCodeRequest): Promise<ZipCode> {

        const zipCodeRepository = getCustomRepository(ZipCodeRepository);

        const data = { cep, rua, bairro, cidade, uf }

        const schema = Yup.object().shape({
            cep: Yup.string().length(8).required(),
            rua: Yup.string().required(),
            bairro: Yup.string().required(),
            cidade: Yup.string().required(),
            uf: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const zipCode = zipCodeRepository.create(data);

        await zipCodeRepository.save(zipCode);

        return zipCode;
    }
}

export default ZipCodeService;