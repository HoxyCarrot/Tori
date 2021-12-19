const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'HoxyCarrot Movie API',
            version: '1.0.0',
            description: 'ref kobis ',
        },
        servers: [
            {
                url:'localhost:3000'
            }
        ],
        basePath: '/'
    },
    apis: ['./routes/*.js','./swagger/*']
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};