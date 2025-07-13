#!/bin/bash

echo "Build script"

# add the commands here
echo "Making build..."
npm run build:ui && ln -s frontend/dist dist