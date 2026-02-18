#!/bin/bash

# format to use:
# ./deploy.sh <cloud run name> <database name> <memory> <gcloud project>

export ENV_VARS=$(paste -sd, .env)
gcloud run deploy $1 \
            --quiet \
            --image "us-central1-docker.pkg.dev/$4/lmm-repo-prod/vendure:latest" \
            --region "us-central1" \
            --platform "managed" \
            --allow-unauthenticated \
            --project=$4 \
            --set-env-vars=$ENV_VARS \
            --add-cloudsql-instances="$4:us-central1:$2" \
            --memory=$3 \