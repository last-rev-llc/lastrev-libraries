import axios from 'axios';

export class CredentialsProvider {
  private _results?: {
    accessKeyId: string;
    secretAccessKey: string;
    sessionToken: string;
    bucket: string;
    spaceId: string;
  };

  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly environment: string;
  private readonly isPreview: boolean;

  constructor(apiKey: string, apiUrl: string, environment: string, isPreview: boolean) {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
    this.environment = environment;
    this.isPreview = isPreview;
  }

  async load() {
    if (this._results) return this._results;

    try {
      const url = `${this.apiUrl}/generate-credentials`;

      const {
        data: {
          AccessKeyId: accessKeyId,
          SecretAccessKey: secretAccessKey,
          SessionToken: sessionToken,
          spaceId,
          bucket
        }
      } = await axios.post(
        url,
        {
          environment: this.environment,
          isPreview: this.isPreview
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': this.apiKey
          }
        }
      );

      this._results = { accessKeyId, secretAccessKey, sessionToken, spaceId, bucket };

      return this._results;
    } catch (err) {
      const data = err.response?.data;
      throw Error(`Unable to generate credentials: ${err.message}${data ? ` ${data}` : ''}`);
    }
  }
}
