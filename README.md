# movie-catalog
The backend of  movie catalog built with Node.js. This provides APIs to discover movies, sign up using email/password. It also allows users to rate and bookmark movies. The database used here is MySQL with serverless deployment on AWS Lambda.

## Getting started
Please follow the instructions to get started with this application

### Prerequisites
* Download and install [Node.js](https://nodejs.org/en/download/)
* Download and install [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)
* Create [Firebase account](https://firebase.google.com/)

### Installation
* Clone this repo : git clone https://github.com/nikithakamath/movie-catalog-backend-nodejs.git
* Set up Firebase
* Set up MySQL
* Run ```npm install```

## Firebase set up
* Please follow the steps mentioned here to set up Firebase Admin SDK : https://firebase.google.com/docs/admin/setup
* Add the Firebase JSON file into `services\firebase` folder
* Add the Firebase database URL into *.env* file

## MySQL set up
Add MySQL database configurations into *.env* file

## Local deployment
To run locally, run the command ```npm start```

## Serverless deployment
Deployment to Lambda is made using serverless framework. Please follow these steps :
* Install serverless globally, ```npm install -g serverless```
* Set up AWS account and credentials for serverless deployment : https://serverless.com/framework/docs/providers/aws/guide/credentials/
* Set up with serverless command ```serverless config credentials --provider aws --key <YOUR_KEY> --secret <YOUR_SECRET```
* Run ```serverless deploy``` to deploy the application into AWS Lambda
