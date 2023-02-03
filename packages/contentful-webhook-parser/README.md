## Usage

Create a netlify function with this code:

```typescript
const handleWebhook = require('@last-rev/contentful-webhook-handler');
const config = require('../../../../config');

module.exports.handler = async (event) => {
  try {
    await handleWebhook(
      config.clone({
        contentStrategy: 'cms',
        cmsCacheStrategy: 'redis'
      }),
      JSON.parse(event.body),
      event.headers
    );
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: `Success`
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: `There was an error, we are on it. ${err}`
    };
  }
};
```

## Data

The webhook will be faster if you use the data as provided by contentful, but if this data exceeds limits, you can configure the webhook payload in the following way and it will not exceed limits, but will request the item from contentful after the webhook is fired:

```json
{
  "sys": {
    "space": {
      "sys": {
        "id": "{ /payload/sys/space/sys/id }"
      }
    },
    "id": "{ /payload/sys/id }",
    "environment": {
      "sys": {
        "id": "{ /payload/sys/environment/sys/id }"
      }
    }
  }
}
```
