const swaggerAutogen = require('swagger-autogen')({ language: 'pt-BR' })

const outputFile = './swagger_output.json'
const endpointsFiles = ['./endpoints.js']

swaggerAutogen(outputFile, endpointsFiles)