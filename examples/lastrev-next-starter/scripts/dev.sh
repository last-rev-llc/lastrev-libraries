#!/bin/bash

function cleanup() {
    rv=$?
    yarn gql:pm2:kill  
    exit $rv
}

trap "cleanup" EXIT

echo "Starting develop server..."
yarn propagate:env
turbo run dev --output-logs=new-only
