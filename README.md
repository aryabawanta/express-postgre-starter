# Express Postgre Starter
 
This is a web application for Express Postgre Starter Kit to make development faster. It is built using Node.js and Postgre. 
 
## Installation 
 
1. Clone this repository to your local machine. 
2. Install dependencies using  npm install . 
3. Create a postgre database. 
4. Change the database configuration in  .env  file to match your configuration. 
5. Start the application using  npm start . 
 
## Configuration 
 
The application can be configured using environment variables. The following environment variables are available: 
 
-  NODE_ENV  (default:  development ): The environment the application is running in. Available values:  development ,  production . 
-  PORT  (default:  8083 ): The port the application is listening on. 
-  DATABASE_NAME : The name of the Postgre database. 
-  DATABASE_HOST : The hostname of the Postgre server. 
-  DATABASE_PORT : The port number of the Postgre server. 
-  DATABASE_USERNAME : The username to connect to the Postgre server. 
-  DATABASE_PASSWORD : The password to connect to the Postgre server. 
-  JWT_SECRET : The secret key used for JWT authentication.
 
## Scripts 
 
The following scripts are available: 
 
-  build : Compiles the TypeScript code. 
-  test : Runs the test suite. 
-  start : Starts the application. 
-  dev : Starts the application in development mode using  ts-node-dev . 
-  migrate:up : Runs database migrations. 
-  migrate:down : Rolls back the last database migration. 
-  migrate:reset : Rolls back all database migrations. 
-  seed:up : Seeds the database with initial data. 
-  seed:down : Rolls back all database seeds. 
 
## License 
 
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 