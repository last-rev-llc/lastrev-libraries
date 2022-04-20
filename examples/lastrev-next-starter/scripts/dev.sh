#!/bin/bash

function cleanup() {
  rv=$?
  npx pm2 delete gql-serve
  exit $rv
}

trap "cleanup" EXIT

echo "Starting develop server..."
yarn propagate:env && turbo run dev --output-logs=new-only
