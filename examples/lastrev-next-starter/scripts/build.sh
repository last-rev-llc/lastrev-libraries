#!bash
echo "Building..."
sh "$PWD/scripts/pre_build.sh"

echo "Syncing CMS data.."
yarn turbo:sync:cms

# Run build and cleanup pm2 if it fails
echo "Building..."
STAGE=build yarn turbo:build $1 || echo "Build failed." 

yarn gql:pm2:kill
sh "$PWD/scripts/post_build.sh"

echo "Done!"