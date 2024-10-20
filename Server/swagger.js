const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Sample API",
    description: "API documentation for a sample project",
  },
  host: "localhost:2003",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"]; // Adjust this to your main server file

swaggerAutogen(outputFile, endpointsFiles, doc);
