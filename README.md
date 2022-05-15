#Usage
You have to launch several commands to launch the project
Fist you need to run the docker-compose with this command: 
`docker-compose up -d`

After the starting of the container docker you have to execute this command
inside the api container :  
`npm run migrate`  
This command is used to prepare the database
then you have to run the jest tests so you need to execute this command still
inside the api container:  
`npm run test`  
then to run the cucumber tests you need to go to the features folder
and go inside the different features folder and launch this command :  
`npx cucumber {feature_name}.feature`
