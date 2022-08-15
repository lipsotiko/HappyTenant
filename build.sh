#!/bin/sh

cd ui
npm run export
cd ..
cp -r ./ui/out/* ./server/src/main/resources/static
cd server
mvn clean install
mvn spring-boot:run
