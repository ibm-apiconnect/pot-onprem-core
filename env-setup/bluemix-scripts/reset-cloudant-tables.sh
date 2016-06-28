#!/usr/bin/env bash

# Delete Databases
curl -X DELETE https://820923e0-be08-46f5-a34a-003f91f00f5c-bluemix:10d585c237c8d7b599b79cfcca39cb63356f2cea7d79abf27f284801b3c149d9@820923e0-be08-46f5-a34a-003f91f00f5c-bluemix.cloudant.com/item
curl -X DELETE https://820923e0-be08-46f5-a34a-003f91f00f5c-bluemix:10d585c237c8d7b599b79cfcca39cb63356f2cea7d79abf27f284801b3c149d9@820923e0-be08-46f5-a34a-003f91f00f5c-bluemix.cloudant.com/review

# Recreate Databases
curl -X PUT https://820923e0-be08-46f5-a34a-003f91f00f5c-bluemix:10d585c237c8d7b599b79cfcca39cb63356f2cea7d79abf27f284801b3c149d9@820923e0-be08-46f5-a34a-003f91f00f5c-bluemix.cloudant.com/item
curl -X PUT https://820923e0-be08-46f5-a34a-003f91f00f5c-bluemix:10d585c237c8d7b599b79cfcca39cb63356f2cea7d79abf27f284801b3c149d9@820923e0-be08-46f5-a34a-003f91f00f5c-bluemix.cloudant.com/review

# Populate item Database
for filename in ./data/*.json; do
  curl -H "Content-Type: application/json" -d @"$filename" https://820923e0-be08-46f5-a34a-003f91f00f5c-bluemix:10d585c237c8d7b599b79cfcca39cb63356f2cea7d79abf27f284801b3c149d9@820923e0-be08-46f5-a34a-003f91f00f5c-bluemix.cloudant.com/item
done