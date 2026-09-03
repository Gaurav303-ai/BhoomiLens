const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.3",

        info: {
            title: "BhoomiLens API",
            version: "1.0.0",
            description:
                "Backend API for the AI-powered Land Record Digitization and Validation System"
        },

        servers: [
            {
                url: "http://localhost:${process.env.PORT || 8000}",
                description: "Local development server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: [
        "./src/modules/**/*.routes.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;