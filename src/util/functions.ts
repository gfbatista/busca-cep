export function setCep(cep:string, index:number, number:number) {
    return cep.substr(0, index) + number + cep.substr(index + 1);
}