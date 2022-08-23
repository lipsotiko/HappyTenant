#!/bin/sh

cd ui

if [ $1 = "dev" ]
then
	export NEXT_PUBLIC_AUTH0_REDIRECT="https://happy-tenant.herokuapp.com"
elif [ $1 = "local" ]
then
	export NEXT_PUBLIC_AUTH0_REDIRECT="http://localhost:8080"
fi

npm run export
cd ..
cp -r ./ui/out/* ./server/src/main/resources/static
