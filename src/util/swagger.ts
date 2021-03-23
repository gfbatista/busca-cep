export default {
    definition: {
        swagger: "2.0",
        info: {
            version: "1.0.0",
            title: "busca-cep-api"
        },
        paths: {
            "/zipcode/health/ping": {
                get: {
                    description: "Checagem da conexão da aplicação",
                    responses: {
                        200: {
                            description: "Connected to the database"
                        },
                        500: {
                            description: "Database not connected"
                        }
                    }
                }
            },
            "/zipcode/{cep}": {
                get: {
                    description: " Busca de um determinado CEP",
                    parameters: [
                        {
                            name: "Authorization",
                            in: "header",
                            type: "string",
                            required: true
                        },
                        {
                            in: "path",
                            name: "cep",
                            required: "true",
                            schema: {
                                format: "string"
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Ok"
                        },
                        400: {
                            description: "Bad Request"
                        },
                        401: {
                            description: "Unauthorized "
                        }
                    }
                }
            },
            "/zipcode": {
                post: {
                    description: "Cadastro de um novo CEP",
                    parameters: [
                        {
                            name: "Authorization",
                            in: "header",
                            type: "string",
                            required: true
                        },
                        {
                            in: "body",
                            name: "body",
                            required: true,
                            schema: {
                                type: "object",
                                properties: {
                                    cep: {
                                        type: "string"
                                    },
                                    rua: {
                                        type: "string"
                                    },
                                    bairro: {
                                        type: "string"
                                    },
                                    cidade: {
                                        type: "string"
                                    },
                                    uf: {
                                        type: "string"
                                    },
                                }
                            }
                        }
                    ],
                    responses: {
                        201: {
                            description: "Created"
                        },
                        400: {
                            description: "Bad Request"
                        },
                        401: {
                            description: "Unauthorized "
                        }
                    }
                }
            }
        },
    },
    apis: ["./src/routes.ts"],
};