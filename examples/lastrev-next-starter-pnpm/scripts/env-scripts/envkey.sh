#!/bin/bash

# Define a log file for better debugging
LOG_FILE="/tmp/envkey_installation.log"
echo -e "Starting envkey-source installation..." > $LOG_FILE

# Function to log messages to the log file and console
log() {
    echo -e "$1" | tee -a $LOG_FILE
}

# Function to handle errors
handle_error() {
    log "\033[31m\033[1m\033[5menvkey-source installation failed. See the log below for details.\033[0m"
    cat $LOG_FILE
    exit 1
}

# Function to install envkey-source
# Parameters:
#   $1 - Version to install
#   $2 - A string representing the sed command to modify the installation script
install_envkey_version() {
    local version=$1
    local install_cmd=$2

    log "Fetching envkey-source version: $version"

    # Execute the modified installation script and check if the installation was successful
    if ! curl -s https://envkey-releases.s3.amazonaws.com/envkeysource/release_artifacts/$version/install.sh | sed -e "$install_cmd" -e 's/sudo //g' | bash >> $LOG_FILE 2>&1; then
        return 1
    else
        log "\033[32m\033[1menvkey-source version $version installed successfully.\033[0m"
        return 0
    fi
}

# Check if the script is running on Netlify
if [[ ! -z "${NETLIFY_BUILD_BASE}" ]]; then
    # Get the current working directory
    current_dir=$(pwd)
    target_dir="$current_dir/node_modules/.bin"
    
    if [ ! -d "$target_dir" ]; then
        log "Target directory $target_dir doesn't exist. Creating now."
        mkdir -p $target_dir || handle_error
    fi

    # Try installing the latest version, if it fails, install version 2.4.1
    latest_version=$(curl -s https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt)
    if [ -z "$latest_version" ]; then
        log "Failed to fetch the latest version of envkey-source."
        handle_error
    fi

    install_envkey_version $latest_version "s|/usr/local/bin|$target_dir|g" || install_envkey_version "2.4.1" "s|/usr/local/bin|$target_dir|g" || handle_error

# Check if the script is running on Vercel
elif [[ ! -z "${VERCEL_ENV}" ]]; then
    # Try installing the latest version, if it fails, install version 2.4.1
    latest_version=$(curl -s https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt)
    if [ -z "$latest_version" ]; then
        log "Failed to fetch the latest version of envkey-source."
        handle_error
    fi

    install_envkey_version $latest_version '' || install_envkey_version "2.4.1" '' || handle_error

# If not running on Netlify or Vercel, assume it's running locally and skip the installation
else
    log "\033[36m\033[1mEnvkey Install Skipped, we're assuming it's running locally.\033[0m"
fi

# Fetch the environment variables from EnvKey and write to .env file
log "Fetching environment variables from EnvKey and writing to .env file..."
es --dot-env > .env

# Run the propagateEnv script
log "Running env-copy.sh script..."
bash ./scripts/env-scripts/propagateEnv.sh
