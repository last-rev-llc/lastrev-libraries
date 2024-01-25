const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Check if the script is running in a Continuous Integration (CI) environment like Netlify or Vercel
const isCIEnvironment = process.env.NETLIFY === 'true' || process.env.VERCEL === 'true';

// Common environment variables that are not directly related to the app's configuration and can be excluded.
const envCheckExclusions = ['DEPLOY_URL', 'VERCEL_URL', 'EXAMPLE_EXCLUDED_VARIABLE'];

// Function to read and parse turbo.json to get required environment variables
const getRequiredEnvVars = () => {
  try {
    const turboConfigPath = path.join(__dirname, '../../turbo.json');
    const turboConfig = JSON.parse(fs.readFileSync(turboConfigPath, 'utf8'));
    return turboConfig.globalEnv;
  } catch (error) {
    console.error("Failed to read or parse 'turbo.json':", error);
    process.exit(1); // Exit if there's an error reading the config
  }
};

// Function to get missing environment variables
const getMissingEnvVars = () => {
  const requiredEnvVars = getRequiredEnvVars();
  return requiredEnvVars.filter(
    (varName) =>
      (typeof process.env[varName] === 'undefined' || process.env[varName] === '') &&
      !envCheckExclusions.includes(varName)
  );
};

// Function to get environment variables that are set but empty
const getEmptyEnvVars = () => {
  const requiredEnvVars = getRequiredEnvVars();
  return requiredEnvVars.filter((varName) => process.env[varName] === '');
};

console.log('Starting environment checks...');

const missingVars = getMissingEnvVars();

// Check for any empty environment variables and display a warning if any are found.
if (getEmptyEnvVars().length > 0) {
  console.error(
    '\x1b[33m%s\x1b[0m',
    'WARNING: The following environment variables are empty. This may cause issues with your build:'
  );
  getEmptyEnvVars().forEach((varName) => console.log(`  - ${varName}`));
}

// Check for any missing environment variables and display an error if any are found.
if (missingVars.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', 'ERROR: The following required environment variables are missing or empty:');
  missingVars.forEach((varName) => console.error(`  - ${varName}`));

  // Special handling for CI environments - exit the process if missing variables are detected.
  if (isCIEnvironment) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      'Build process is running in a CI/CD environment. Exiting due to missing environment variables.'
    );
    process.exit(1);
  }

  // Instructions for pulling environment variables from envkey
  console.log(
    '\n\x1b[33m%s\x1b[0m',
    'IMPORTANT: If you have access to envkey, you can pull the required environment variables by running "pnpm env:pull".'
  );
  console.log('\x1b[36m%s\x1b[0m', 'NOTE: Running "pnpm env:pull" will override all local .env files.');
  console.log('Please ensure to backup your .env file before running this command if necessary.');

  // Setting up a prompt for user interaction
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Implementing a timeout for the prompt
  const timer = setTimeout(() => {
    console.error('\n\x1b[31mTimeout: No response received within 15 seconds.\x1b[0m');
    prompt.close();
    console.log('Exiting build process. Please set the required environment variables.');
    process.exit(1);
  }, 15000);

  // Asking the user if they want to pull environment variables now
  prompt.question(
    'Would you like to pull the missing environment variables from envkey now? (yes/no)\nThis MAY override any local .env files. ',
    (answer) => {
      clearTimeout(timer);
      prompt.close();
      if (answer.toLowerCase() === 'yes') {
        try {
          // Attempting to pull environment variables using a script
          execSync('pnpm env:pull', { stdio: 'inherit' });
          console.log('Environment variables pulled successfully.');
          console.log('Please rerun your original command to continue.');
          process.exit(0); // Successful exit if the user confirms
        } catch (error) {
          // Handling errors during the environment variable pull process
          console.error('Failed to pull environment variables from envkey:', error);
          console.log('Please address the above issue and rerun your original command.');
          process.exit(1); // Exiting with an error if pulling fails
        }
      } else {
        // Handling the case where the user decides not to pull variables
        console.log('Please set the required environment variables manually and rerun your original command.');
        process.exit(1); // Exiting with an error if user declines to pull variables
      }
    }
  );
} else {
  // All required environment variables are present
  console.log('All required environment variables are set. Continuing build...');
}
