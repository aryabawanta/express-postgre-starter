#!/bin/bash
cd /var/www/html/[project name]
git pull origin main
rm -rf dist
npm install
npm run migrate:up