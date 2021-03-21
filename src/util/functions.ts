export function setCep(cep, index, number) {
    console.log("cep: " + cep + " | index: " + index + " | number: " + number)
    return cep.substr(0, index) + number + cep.substr(index + 1);
}