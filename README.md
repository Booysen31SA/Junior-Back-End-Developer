git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Booysen31SA/Junior-Back-End-Developer.git
git push -u origin main

## Running locally
# database
connecting to database, 
run wamp for my sql
should connect to local instance of mysql

# Server
npm start 
if database connects then success if not it will throw an error

# View documentation
http://127.0.0.1:3008/documentation#

## heroku

1) heroku login

# deploy the app

2) heroku create (url : https://lit-mountain-55370.herokuapp.com/ )
3) git push heroku main