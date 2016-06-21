#heroku git:clone ob-prod deploy
#create dir
mkdir deploy
mkdir deploy/app
mkdir deploy/services
mkdir deploy/views
cd deploy
#initialize git repo
git init
git config user.email "mmartin@ccbac.com"
git config user.name "Michael Martin"
#git clone git@heroku.com:ob-prod.git
#git remote -v
git remote add heroku git@heroku.com:ob-prod.git
#git pull
ls
#move new stuff into repo
cp -f -r ../bin/* ./app
cp -f -r ../services/* ./services
cp -f -r ../email_templates ./email_templates
cp -f ../views/index-bin.html ./views/index.html
cp -f ../server.js .
cp -f ../Procfile .
cp -f ../package.json .
ls
#commit stuff to new repo
git add .
git commit -m "Heroku Custom Deploy"
#push to heroku
git push -f heroku master