#!/bin/bash
cd /var/www/html/logistic-management-system-backend
git pull origin main
rm -rf dist
npm install
npm run migrate:up