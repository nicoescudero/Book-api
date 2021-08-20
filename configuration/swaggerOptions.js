const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api Books',
            version: '1.0.0',
            description: 'a simple api with sequelize (MySQL)'
        },
        servers: [{ url: 'http://localhost:4000' }]
    },
    apis: ['./router/*.js']
};

module.exports = { options };