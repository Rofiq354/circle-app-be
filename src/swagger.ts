import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Circle App API",
      version: "1.0.0",
      description: "API documentation for Circle App",
    },
    servers: [
      {
        url: "http://localhost:3003/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  // Swagger akan membaca komentar JSDoc di file routes
  apis: ["./src/swagger/**/*.ts"],
});
