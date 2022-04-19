#!/bin/bash

yarn install:rover
HEALTHCHECK=1
wait-on -c wait-on-config.js || HEALTHCHECK=0

if [ $HEALTHCHECK -eq 0 ]; then
  echo "Failed to connect to the GraphQL server, skipping schema download..."
else
  SCHEMA=$(npx rover graph introspect http://localhost:5000/graphql)
  echo "Schema"
  echo $SCHEMA >schema.graphql
fi
