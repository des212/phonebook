#!/bin/bash

echo "Build runner script"

# add the commands here
echo "Running backend..."
npm run start &
P1=$!
echo "Running frontend..."
npm run preview:ui &
P2=$!
wait $P1 $P2