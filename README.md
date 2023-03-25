![alt="React - v18.2.0"](https://img.shields.io/badge/React-v18.2.0-2ea44f?logo=React)
![alt="Vite - v3.1.0"](https://img.shields.io/badge/Vite-v4.1.0-2ea44f?logo=Vite&logoColor=yellow)
![alt="Scss - v1.58.3"](https://img.shields.io/badge/Scss-v1.58.3-2ea44f?logo=Sass&logoColor=%23CC6699)
![alt="supabase-js - 2.10.0"](https://img.shields.io/badge/supabase--js-2.10.0-2ea44f?logo=Supabase&logoColor=%233ECF8E)

### Fitness Club Application

The main purpose of this web application is to store test information of club members for later analysis.

This web application is built using React and Vite, two popular front-end development tools that offer fast performance
and a streamlined developer experience. The application's styles were written using SASS. The application's frontend
also leverages the power of PrimeReact, a set of open-source UI components for React that provide a polished and
professional user interface. The backend is powered by Superbase, an open-source alternative to Firebase that provides a real-time
database and authentication system. With Superbase, the application stores data for registered users, client
information, and test results in a secure and scalable database. By combining the power of React, Vite, PrimeReact, and
Superbase, this application delivers a modern and user-friendly experience for fitness club members and trainers alike.

#### System Requirements

- Node.js (version 14 or later)

#### Installation and Configuration

1. Clone this repository to your local machine
2. Install the required dependencies by running in the project root directory

``` react
 $ npm install
```

3. For using application you need to create database in supebase and get API_URL and API_KEY. Configure the application
   by creating a .env file in the project root directory and setting the following variables from superbase:

4. Start the application by running in the project root directory

``` react
 $ run dev
 ```

5. Access the application in your web browser at http://localhost:5173
6. Bulid your application by running in the project root directory

 ``` react
 $ run build
```

#### Usage

To use the application, follow these steps:

1. Register a new account using your Club Number.
2. Log in to the application using your credentials.
3. If you log in as Trainer you could:

   - choose client by his Club Number and see his member info and previous test results;
   - add client's last test information;
   - add new client;
   - update clients membership details;
   - update club info.

4. If you log in as Administrator you could:

   - add new client;
   - update clients membership details;
   - update club info.

5. If you log in as Client you could:

   - see membership details;
   - see client test results information;
   - see club info.
 
 DEMO https://fitness-club-application.netlify.app/ 
 email: client@mail.com or client2@mail.com password: 123456


#### Authors

Tatiana Sławecka

#### License

This project is licensed under the MIT License - see the LICENSE file for details.

#### Additional Information:

* The icons used in this application were sourced from https://www.freepik.com and were converted from PNG format to SVG
  using https://png2svg.com/.
* The favicon for this application was generated using https://favicon.io/favicon-converter/.
* README file written with the help of Readme Generator https://github.com/Mazur2005/Generator-Readme.md