#!/bin/bash

# format to use:
# ./build-docker.sh your-project

# 1. Update the URL to use Artifact Registry in the US
# Format: [REGION]-docker.pkg.dev/[PROJECT]/[REPO]/[IMAGE]
# Replace 'my-repo' with your actual repository name
IMAGE_URL="us-central1-docker.pkg.dev/$1/lmm-repo-prod/vendure"

docker build -f apps/server/Dockerfile -t $IMAGE_URL .

# 2. Configure authentication for the US regional host
gcloud auth configure-docker us-central1-docker.pkg.dev -q

docker push $IMAGE_URL
