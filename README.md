git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Booysen31SA/Junior-Back-End-Developer.git
git push -u origin main

## Running locally
# database
connecting to database, 
run wamp for my sql (or if you have local sql server running it should connect, if not update details in config file to local instance )
should connect to local instance of mysql
in .database folder there is a file with the tables required run that script to create tables

# Server
npm start 
if database connects then success if not it will throw an error

# View documentation
http://127.0.0.1:3008/documentation#
