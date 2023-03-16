Fitness Club Application is a web application designed to store customer test information for future analysis.
System Requirements

To use this application, you need to have the following software installed:

    Node.js (version 14 or later)
    MongoDB (version 4.2 or later)

Installation and Configuration

    1.Clone this repository to your local machine
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
