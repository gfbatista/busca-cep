# busca-cep-api
## Desafio Técnico Luizalabs ##

A API consiste basicamente em cadastrar e pesquisar CEPs, expondo duas rotas devidamente autenticadas de [GET] e [POST]. A principal regra da API é no momento da busca de um determinado CEP, onde há uma validação caso não encontre nenhum registro. A validação percorre toda a cadeia de caracteres do CEP e substitui o último caractere por 0, não encontrando registro do mesmo, a substituição é realizada no penúltimo caractere e assim sucessivamente até terminar a cadeia ou encontrar um registro. <br>
Exemplo de todo fluxo: Busca inicial com o registro 14403205 > `14403205 > 14403200 > 14403200 > 14403000 > 14400000 > 14400000 > 14000000 > 10000000 > 00000000` <br>
Detalhe importante: Ao cadastrar um novo CEP, uma validação é realizada na base dos Correios e somente CEPs válidos serão permitidos. <br>
A api utilizada pra validar os CEPs está com um tempo de resposta um pouco alto, pode afetar o cadastro e o tempo dos testes.

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
`O projeto foi desenvolvido em Node.js devido a sua facilidade e praticidade em colocar uma api do zero a produção, juntamente com seus frameworks de fácil interação como o Express para gerenciar as rotas por exemplo, e um gerenciador de pacotes robusto, que neste caso foi utilizado o NPM. <br>
Particularmente não é a tecnologia que eu mais domino, mas é a que eu estou estudando durante os últimos meses e pretendo me aprofundar cada vez mais em seu funcionamento. Devido a esses motivos eu optei em desenvolver a api em Node.js juntamente com Typescript. Eu optei em utilizar o Typescript principamente porque ele trabalha com tipagem de código, um costume meu devido as linguagens que eu vinha trabalhando. Essa tipagem pode deixar o código mais verboso, mas na minha opinião o deixa mais seguro também. Outra vantagem que eu vejo em utilizar o Type é que podemos usufruir de uma feature nova do javascript e convertê-la para uma sintaxe mais antiga, assim o código pode ser interpretado sem nenhum problema. <br>
A persistência ficou a cargo do TypeORM juntamente com o banco SQLite. O banco SQLite foi utilizado simplesmente porque não precisa instalar nenhum serviço para iniciar a sua utilização, apenas uma configuração no arquivo de conexão da api e a base já é criada no momento do start, que é o ideal no nosso caso. Além disso o SQLite possui basicamente todas as funcionalidades de um banco relacional. A escolha do TypeORM foi pelo fato de ser um framework de ORM próprio para projetos em Typescript. Tem outros pontos positivos em sua utilização, como o uso dos decorators, que se aproxima bastante da experiência do hibernate e deixa o código mais limpo, e também pela facilidade em rodar os scripts pelo terminal utilizando o seu CLI.`


