#!/bin/sh

cd ui

if [ $1 = "local" ]
then
	export NEXT_PUBLIC_AUTH0_REDIRECT="http://localhost:8080"
elif [ $1 = "dev" ]
then
	export NEXT_PUBLIC_AUTH0_REDIRECT="https://dev.meraklis.io"
fi


npm run export
cd ..
rm -rf ./server/src/main/resources/static
mkdir ./server/src/main/resources/static
cp -r ./ui/out/* ./server/src/main/resources/static
