![alt="React - v18.2.0"](https://img.shields.io/badge/React-v18.2.0-2ea44f?logo=React)
![alt="Vite - v3.1.0"](https://img.shields.io/badge/Vite-v4.1.0-2ea44f?logo=Vite&logoColor=yellow)
![alt="Scss - v1.58.3"](https://img.shields.io/badge/Scss-v1.58.3-2ea44f?logo=Sass&logoColor=%23CC6699)
![alt="supabase-js - 2.10.0"](https://img.shields.io/badge/supabase--js-2.10.0-2ea44f?logo=Supabase&logoColor=%233ECF8E)

### Fitness Club Application

The main purpose of this web application is to store test information of club members for later analysis.

This web application is built using React and Vite, two popular front-end development tools that offer fast performance
and a streamlined developer experience. The application's styles were written using SASS. The application's frontend
also leverages the power of PrimeReact, a set of open-source UI components for React that provide a polished and
professional user interface. The backend is powered by Superbase, an open-source alternative to Firebase that provides a
real-time database and authentication system. With Superbase, the application stores data for registered users, client
information, and test results in a secure and scalable database. By combining the power of React, Vite, PrimeReact, and
Superbase, this application delivers a modern and user-friendly experience for fitness club members and trainers alike.
Netlify is used for deployment.

#### Application features:

1. To register a new account using Clients Club Number.
2. To log in to the application using credentials.
3. If you log in as Trainer you could:

    - choose client by his Club Number and see his member info and previous test results;
    - add client's last test information;
    - add new client;
    - update clients membership details;
    - update club info.

4. If you log in as Administrator you could:

    - add new client;
    - update clients membership details;
    - update club info (discounts, open hours, etc.)

5. If you log in as Client you could see:

    - membership details;
    - test results information;
    - the difference between tests - progress in trainings.
    - an increase in weight or volume is displayed in red, and a decrease in green.
    - information about discounts, and other useful club info;
    - club hours;
    - contacts.

The application validates the entered information. For example, if it is measurement data, you cannot enter letters, and
you cannot enter numbers in the first and last name fields. For the convenience of entering dates, the Calendar
component is used, and for the phone, an input mask. If you enter a club number, the application will not allow you to
enter anything other than numbers and will check that there are no less than and no more than 4. If you enter a club
number as a client, but it is not in the client database, you will receive an error message. You will be able to
register for one number only once, the next time you try to do this, you will be informed that this number is already
registered and you need to log in or reset your password.
The administrator and trainer can add a new client without mail and password. The client himself chooses whether to use
the application. And for a coach, information is always at hand. He sees the progress of the ward.

DEMO https://fitness-club-application.netlify.app/

 - client@mail.com or client2@mail.com password: 123456
 - admin@mail.com password: 123456
 - trainer@mail.com password: 123456

Please be aware that project is still in progress. If you find any bug or have an idea for improvement, 
let me know by writing an email > slawecka.t@gmail.com

#### Additional Information:

* The icons used in this application were sourced from https://www.freepik.com and were converted from PNG format to SVG
  using https://png2svg.com/.
* The favicon for this application was generated using https://favicon.io/favicon-converter/.
* README file written with the help of Readme Generator https://github.com/Mazur2005/Generator-Readme.md