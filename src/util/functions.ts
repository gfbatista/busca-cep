export function setCep(cep, index, number) {
    return cep.substr(0, index) + number + cep.substr(index + 1);
}