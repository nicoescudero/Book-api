exports.configSwagger = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Book API',
      version: '1.0.0',
      description: 'This API is used for data management of the books',
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
      {
        url: 'here url production',
        description: 'Production',
      },
    ],
  },
  apis: ['./docs/*.js'],
}
