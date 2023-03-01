## Merchant Dashboard
Backend is located here: https://github.com/milnera92/merchant-viewer-be. It is a PHP Server hosted on Heroku.

## ToDo
- change TID, MID in SQL 
- add style
- add merchant names, addresses, email address

## So Far....

Started by created a MySQL Database hosted on Amazon Web Services RDS:
![image](https://user-images.githubusercontent.com/95140821/222036055-c6e3ee06-937c-4172-acd1-c1ccc94e382a.png)

Next up, we will go to MySQL Workbench and connect to the database.
We will then make a new schema called "db1", and start creating some tables:
![image](https://user-images.githubusercontent.com/95140821/222036218-187d5145-2bab-4320-985e-f43cafad6b12.png)

Seeding in some test data:
![image](https://user-images.githubusercontent.com/95140821/222036266-23b43589-c628-4c60-acf5-1399595187c5.png)

Next I will start a new PHP project by running <code>composer init</code> in my working directory, along with phpdotenv. From there, I will create a .env file and add my AWS database login credentials as enviroment vaiables.

Here I am accessing them in my PHP code. 
![image](https://user-images.githubusercontent.com/95140821/222036750-0060e1af-4cc1-48d3-8997-61b3af4df96c.png)

Note I am not importing Dotenv due to the .env key/value pairs being stored in Heroku settings.
![image](https://user-images.githubusercontent.com/95140821/222036928-8dd8e140-def4-4537-b583-d4d113ca64dd.png)

I am going to grab all the data from all the tables in my database, and format it as a JSON respons that will be consumable by a fetch request from my React Front end:
![image](https://user-images.githubusercontent.com/95140821/222037056-f9df5ee7-f231-4472-a253-02b33f593005.png)

Here it is in React:
![image](https://user-images.githubusercontent.com/95140821/222037117-d6f6dc9b-3d60-406e-83ab-670c3a6492b7.png)

Now we can see the final result:
![image](https://user-images.githubusercontent.com/95140821/222037158-d0792060-eb40-4a88-9574-17cdfc04153e.png)



