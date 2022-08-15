#!/bin/sh

./build.sh

heroku config:set AUTH0_DOMAIN=$AUTH0_DOMAIN
heroku config:set AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID
heroku config:set AUTH0_CLIENT_SECRET=$AUTH0_CLIENT_SECRET
heroku config:set SENDGRID_API_KEY=$SENDGRID_API_KEY
heroku config:set STRIPE_PUBLIC_KEY=$STRIPE_PUBLIC_KEY
heroku config:set STRIPE_PRIVATE_KEY=$STRIPE_PRIVATE_KEY
heroku config:set MONGODB_URI=mongodb+srv://admin:5rvst98zxF3Tp8pT@meraklis.xgztm7r.mongodb.net/test

git push heroku `git subtree split --prefix server master`:master --force
