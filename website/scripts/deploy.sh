#!/bin/bash

set -e

ENV_FILE="$(pwd)/.env"

if [ -s "$ENV_FILE" ];
then
   export $(cat .env | xargs)
else
   echo "No .env or empty .env found in website folder"
fi

mkdir -p docs
docusaurus deploy
