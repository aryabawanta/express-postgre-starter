const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
import users from "./users";
import authentications from "./authentications";

module.exports = (app: any) => {
  registerRoutes(authentications);
  registerRoutes(users);
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  function registerRoutes(routes: any) {
    for (const route in routes) {
      for (const method in routes[route]) {
        app[method](route, ...routes[route][method]);
      }
    }
  }
};