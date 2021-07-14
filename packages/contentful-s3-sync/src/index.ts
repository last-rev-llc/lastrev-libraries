import spawn from 'cross-spawn';
import { join } from 'path';
import axios from 'axios';

export type SyncS3Props = {
  rootDir: string;
  apiKey: string;
  environment?: string;
  isPreview?: boolean;
  apiUrl?: string;
};

const generateCredentials = async (apiKey: string, environment: string, isPreview: boolean, apiUrl: string) => {
  try {
    const url = `${apiUrl}/generate-credentials`;

    const {
      data: { AccessKeyId, SecretAccessKey, SessionToken, spaceId, bucket }
    } = await axios.post(
      url,
      {
        environment,
        isPreview
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        }
      }
    );
    return { AccessKeyId, SecretAccessKey, SessionToken, spaceId, bucket };
  } catch (err) {
    console.log(err);
    throw Error(`Unable to generate credentials: ${err.message}`);
  }
};

const performS3Sync = async (
  rootDir: string,
  spaceId: any,
  environment: string,
  isPreview: boolean,
  bucket: string,
  accessKeyId: string,
  secretAccessKey: string,
  sessionToken: string
) => {
  try {
    return new Promise<void>((resolve, reject) => {
      const args = [
        's3',
        'sync',
        `s3://${bucket}/${join(spaceId, environment, isPreview ? 'preview' : 'production')}`,
        join(rootDir, spaceId, environment, isPreview ? 'preview' : 'production')
      ];

      const command = 'aws';

      const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true,
        env: {
          ...process.env,
          AWS_ACCESS_KEY_ID: accessKeyId,
          AWS_SECRET_ACCESS_KEY: secretAccessKey,
          AWS_SESSION_TOKEN: sessionToken
        }
      });

      child.on('close', (code: number) => {
        if (code !== 0) {
          reject({ message: `${command} ${args.join(' ')}` });
          return;
        }
        resolve();
      });
    });
  } catch (err) {
    throw Error(`Unable to perform S3 Sync: ${err.message}`);
  }
};

const syncS3 = async ({
  rootDir,
  apiKey,
  environment = 'master',
  isPreview = false,
  apiUrl = 'https://qzdgrstuw8.execute-api.us-east-1.amazonaws.com'
}: SyncS3Props) => {
  const { AccessKeyId, SecretAccessKey, SessionToken, bucket, spaceId } = await generateCredentials(
    apiKey,
    environment,
    isPreview,
    apiUrl
  );

  console.log(
    `export AWS_ACCESS_KEY_ID=${AccessKeyId}; export AWS_SECRET_ACCESS_KEY=${SecretAccessKey}; export AWS_SESSION_TOKEN=${SessionToken}`
  );

  await performS3Sync(rootDir, spaceId, environment, isPreview, bucket, AccessKeyId, SecretAccessKey, SessionToken);
};

export default syncS3;
