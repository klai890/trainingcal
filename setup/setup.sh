#!/bin/bash

# Function to calculate previous Monday

# Get prev Monday
prev_mon=$(date -v-monday +'%-m/%-d/%Y')

# Create data/data.json and set it up in correct format
# Note: Without this particular format in data.json, the site won't run.
mkdir ../data
echo "{\"$prev_mon\": {}}" >> ../data/data.json

