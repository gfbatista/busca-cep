export default {
    definition: {
        openapi: '3.0.5',
        info: {
            version: '1.0.0',
            title: 'busca-cep-api',
            description: 'API de cadastro e busca de CEP'
        }
    },
    apis: ["./src/routes.ts"],
};