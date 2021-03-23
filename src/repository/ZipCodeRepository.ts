import { EntityRepository, Repository } from "typeorm";
import ZipCode from "../model/ZipCode";

@EntityRepository(ZipCode)
class ZipCodeRepository extends Repository<ZipCode> {
    public async findByCep(cep: string): Promise<ZipCode[] | null> {
        const zipCode = await this.find({ where: { cep } });
        return zipCode || null;
    }
}

export default ZipCodeRepository;