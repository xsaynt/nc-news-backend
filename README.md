# Northcoders News API

Hosted API - https://my-nc-news-yn9b.onrender.com

This project is based on a news outlet and includes a database with tables of articles, comments, topics and users and looks to allow a user to locate specified information based on each table with data that links the tables together, such as comments on different articles and such.

In order to clone this repo, use the command 'git clone https://github.com/xsaynt/my-nc-news.git'.

You will then need to install multiple dependencies in order for the code to run succesfully. In order to install these dependencies, please run 'npm install'.

In order to seed a local database, you must use the command 'npm run seed'. This will populate the database and allow for testing.

To test the database, you must run 'npm run test'.

If you wish to clone this project and run it locally, you must create two .env files in order to access both the development and test databases. The first file being a .env.test file, and the second being a .env.development file. Once these have been created, you must input the name of the database into the corresponding file in the format of PGDATABASE=database_name_here.

For this project to run successfully, tou must also ensure that the correct versions of Node.js and Postgres are installed. The minimum versions required are as follows:
Node.js - v22.8.0
Postgres - 8.13.1

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
