# busca-cep-api
## Desafio Técnico Luizalabs ##

A API consiste basicamente em cadastrar e pesquisar CEPs, expondo duas rotas devidamente autenticadas de [GET] e [POST]. A principal regra da API é no momento da busca de um determinado CEP, onde há uma validação caso não encontre nenhum registro. A validação percorre toda a cadeia de caracteres do CEP e substitui o último caractere por 0, não encontrando registro do mesmo, a substituição é realizada no penúltimo caractere e assim sucessivamente até terminar a cadeia ou encontrar um registro. <br>
Exemplo de todo fluxo: Busca inicial com o registro 14403205 > `14403205 > 14403200 > 14403200 > 14403000 > 14400000 > 14400000 > 14000000 > 10000000 > 00000000` <br>
Detalhe importante: Ao cadastrar um novo CEP, uma validação é realizada na base dos Correios e somente CEPs válidos serão permitidos. A api utilizada pra validar os CEPs está com um tempo de resposta um pouco alto.

### Requisitos: ###
```
Node.js (12.18.3) 
Typescript
Express
TypeORM
Sqlite
Npm
```

### Instalação: ###
```
npm install
npm run typeorm migration:run
```
### Testes: ###
```
npm run test
```

### Rotas: ###
- Checagem da conexão da aplicação: <br>
[GET]  http://localhost:3333/zipcode/health/ping <br><br>
- Adquirir token para realizar busca e cadastro dos CEPs: <br>
[POST] http://localhost:3333/zipcode/token <br><br>
- Busca de um determinado CEP: <br>
[GET]  http://localhost:3333/zipcode/{cep} <br><br>
- Cadastro de CEP (8 dígitos sem o "-"): <br>
[POST] http://localhost:3333/zipcode <br><br>

Para realizar cadastros ou buscas na API, é necessário gerar um token de autenticação utlizando a rota <b> [POST] zipcode/token </b>, e posteriormente usando no header da requisição 
```
 curl --location --request GET 'http://localhost:3333/zipcode/14403205' \
--header 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxx' 

```
### Swagger: ###
```
http://localhost:3333/zipcode/documentation
```

### Payload para cadastro do CEP: ###
```
{
  "cep": "14403205",
  "rua": "RUA 3",
  "bairro": "CASTELO ",
  "cidade": "FRANCA",
  "uf": "SP"
}
```

### Considerações: ###


