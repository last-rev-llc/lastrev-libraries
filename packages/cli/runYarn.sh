#!/usr/bin/env bash

NODE_VERSION=v$(cat .nvmrc)
rm -rf node_modules/@last-rev;
yarn install --check-files;