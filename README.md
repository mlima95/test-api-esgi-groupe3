#Usage
You have to launch several commands to launch the project
Fist you have to launch the docker-compose with this command: 
`docker-compose up -d`

After the starting of the container docker you have to execute this command
inside the api container :  
`npm run migrate`  
This command is used to prepare the database
then you have to launch the jest tests so you need to execute this command still
inside the api container:  
`npm run test`  
then to launch the cucumber tests you need to go on the features folder
and go inside the diferents features folder and launch this command :  
`npx cucumber {feature_name}.feature`
