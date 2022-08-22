#!/bin/sh

cd ui
export NEXT_PUBLIC_AUTH0_REDIRECT="https://happy-tenant.herokuapp.com"
npm run export
cd ..
cp -r ./ui/out/* ./server/src/main/resources/static
