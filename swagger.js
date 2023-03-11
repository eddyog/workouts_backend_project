// swagger autogen
// swagger UI-express

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Workouts API',
  },
  host: 'workout-project.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);


// Remember for swagger 
// npm install swagger-ui-express
// npm install --save-dev swagger-autogen
// npm run swagger-autogen