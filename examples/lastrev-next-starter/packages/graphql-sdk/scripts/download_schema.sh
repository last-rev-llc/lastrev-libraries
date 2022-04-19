#!/bin/bash

yarn install:rover
yarn gql:healthcheck
HEALTHCHECK=$?

if [ $HEALTHCHECK -eq 1 ]; then
  echo "Failed to connect to the GraphQL server, skipping schema download..."
else
  SCHEMA=$(npx rover graph introspect http://localhost:5000/graphql)
  echo "Schema"
  echo $SCHEMA >schema.graphql
fi
