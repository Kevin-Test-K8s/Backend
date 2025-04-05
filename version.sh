#!/bin/bash

# Check if VERSION file exists; if not, create it with initial version 1.0
if [ ! -f VERSION ]; then
  echo "1.0" > VERSION
fi

# Read the current version to use for this build
VERSION=$(cat VERSION)
echo "Using version: $VERSION"

# Export the version to be used in the Docker image tag
echo "VERSION=$VERSION" >> $GITHUB_ENV
