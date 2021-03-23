import * as Yup from 'yup';
import { getCustomRepository } from 'typeorm';

import ZipCodeRepository from '../repository/ZipCodeRepository';
import { setCep } from "../util/functions";
import ApiError from "../util/ApiError";
import getCepCorreios from "./correiosService";

import ZipCode from "../model/ZipCode";

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
    public async find({ cep }: CepRequest): Promise<ZipCode> {

        const zipCodeRepository = getCustomRepository(ZipCodeRepository);

        let zipCode = await zipCodeRepository.findByCep(cep)

        if (!zipCode) {
            let newCep = cep;
            for (let index = cep.length - 1; index >= 0; index--) {
                let cep = setCep(newCep, index, 0);
                newCep = cep;
                zipCode = await zipCodeRepository.findByCep(cep);
                if (zipCode) {
                    break;
                }
            }
        }

        if (!zipCode) {
            throw new ApiError('CEP inválido');
        }

        return zipCode;
    }


    public async execute({ cep, rua, bairro, cidade, uf }: ZipCodeRequest): Promise<ZipCode> {

        const responseCep = await getCepCorreios(cep);

        if (!responseCep) {
            throw new ApiError('CEP inválido',);
        }

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