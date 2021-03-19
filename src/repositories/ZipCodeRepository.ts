import { EntityRepository, Repository } from "typeorm";
import ZipCode from "../models/ZipCode";

@EntityRepository(ZipCode)
class ZipCodeRepository extends Repository<ZipCode> {

}

export default ZipCodeRepository;