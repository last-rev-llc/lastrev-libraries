
#!/bin/bash

# Path to the root .env file
root_env_file=".env"

# Path to the packages directory and the specific 'web' directory
packages_dir="packages"
web_dir="apps/web"

# Check if .env file exists
if [ ! -f "$root_env_file" ]; then
    echo "Root .env file not found."
    exit 1
fi

# Copy to the 'web' directory
if [ -d "$web_dir" ]; then
    cp "$root_env_file" "$web_dir/.env"
    echo "Copied .env file to $web_dir"
fi

# Iterate over subdirectories in the packages directory and copy to their roots
for package in "$packages_dir"/*; do
    if [ -d "$package" ]; then
        # Copy the .env file to the root of each package
        cp "$root_env_file" "$package/.env"
        echo "Copied .env file to the root of $package"
    fi
done

echo "Successfully copied .env file to the web directory and all package roots."
