#!/bin/bash
npm run build
# Ensure static assets are accessible
cp -r dist/public/* dist/