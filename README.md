Fitness Club Application is a web application designed to store club members test information for future analysis.

This web application is built using React and Vite, two popular front-end development tools that offer fast performance
and a streamlined developer experience. The application's styles were written using SASS, a popular preprocessor for CSS
that offers additional features like variables, mixins, and nested rulesThe application's frontend also leverages the
power of PrimeReact, a set of open-source UI components for React that provide a polished and professional user
interface. The backend is powered by Superbase, an open-source alternative to Firebase that provides a real-time database
and authentication system. With Superbase, the application stores data for registered users, client information, 
and test results in a secure and scalable database. By combining the power of React, Vite, PrimeReact, and Superbase, 
this application delivers a modern and user-friendly experience for fitness club members and trainers alike.

System Requirements
- Node.js (version 14 or later)
- MongoDB (version 4.2 or later)

Installation and Configuration

    1. Clone this repository to your local machine
    2. Install the required dependencies by running npm install in the project root directory
    3. Configure the application by creating a .env file in the project root directory and setting the following variables:


    DB_URI=<MongoDB connection URI>
    PORT=<application port>

    4. Start the application by running npm start in the project root directory
    5. Access the application in your web browser at http://localhost:<application port>

Usage

To use the application, follow these steps:

    6. Register a new account using your Club Number.
    7. Log in to the application using your credentials.
    8. If you login as Trainer you could:
        - choose client by his Club Number and see his member info and previous test results; 
        - add client's last test information; 
        - add new client;
        - update clients membership details;
        - update club info.
    9. If you login as Administrator you could:
        - add new client;
        - update clients membership details;
        - update club info.
    10. If you login as Client you could:
        - see membership details
        - see your test information;
        - see club info

Authors

    Tatiana Sławecka

License

This project is licensed under the MIT License - see the LICENSE file for details.

Additional Information:

    The icons used in this application were sourced from https://www.freepik.com and were converted from PNG format to SVG using https://png2svg.com/.
    The favicon for this application was generated using https://favicon.io/favicon-converter/.
