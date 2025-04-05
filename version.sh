#!/bin/bash

VERSION_FILE="VERSION"

# Initialize version file if it doesn't exist
if [ ! -f "$VERSION_FILE" ]; then
  echo "1.0" > "$VERSION_FILE"
fi

# Read current version
CURRENT_VERSION=$(cat "$VERSION_FILE")

# Export to GitHub Actions
echo "VERSION=$CURRENT_VERSION" >> $GITHUB_ENV

# Increment version for next build
MAJOR=$(echo "$CURRENT_VERSION" | cut -d. -f1)
MINOR=$(echo "$CURRENT_VERSION" | cut -d. -f2)
NEXT_MINOR=$((MINOR + 1))
NEXT_VERSION="$MAJOR.$NEXT_MINOR"

# Save next version to file
echo "$NEXT_VERSION" > "$VERSION_FILE"
