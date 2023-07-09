#!/usr/bin/env bash

rm -rf dist
npm run build
cd dist
git init
git add .
git commit -m 'Deploy'
git push -f git@github.com:PassiDel/hci-gesture.git main:gh-pages
