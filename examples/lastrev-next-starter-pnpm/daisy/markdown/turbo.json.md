{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "globalEnv": [
    "NODE_ENV",
    "DOMAIN",
    "ANALYZE_BUNDLE",
    "CONTENTFUL_DELIVERY_TOKEN",
    "CONTENTFUL_ENV",
    "CONTENTFUL_PREVIEW_TOKEN",
    "CONTENTFUL_SPACE_ID",
    "CONTENTFUL_USE_PREVIEW",
    "DEFAULT_SITE_ID",
    "DEPLOY_URL",
    "GRAPHQL_SERVER_URL",
    "PREVIEW_TOKEN",
    "PAGES_REVALIDATE",
    "PORT",
    "SITE_SETTINGS",
    "SITE",
    "CONTENTFUL_SETTINGS_ID",
    "NEXT_PUBLIC_SENTRY_DSN",
    "ALGOLIA_MAX_RECORDS",
    "VERCEL_URL"
  ],
  "pipeline": {
    "start": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["build"]
    },
    "build": {
      "outputMode": "new-only",
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": { "outputMode": "new-only", "outputs": ["coverage/**"], "dependsOn": [] },
    "lint": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "outputMode": "new-only",
      "dependsOn": ["^build"],
      "cache": false,
      "persistent": true
    },
    "gql:dev": {
      "outputMode": "new-only",
      "dependsOn": ["^build", "graphql-sdk#sync:cms"],
      "cache": false,
      "persistent": true
    },
    "gql:logs": {
      "outputMode": "new-only",
      "cache": false,
      "persistent": true
    },
    "clean": {
      "outputMode": "new-only",
      "cache": false
    },
    "graphql-sdk#build": {
      "outputMode": "new-only",
      "cache": false,
      "dependsOn": ["graphql-sdk#sync:cms", "^build"],
      "inputs": ["./packages/graphql-sdk/.cms-sync", "./packages/**/src/**/*.graphql", "./apps/**/src/**/*.graphql"],
      "outputs": ["dist/**", "schema.graphql", "src/generated/**"]
    },
    "graphql-sdk#gql:start": {
      "outputMode": "new-only",
      "cache": false,
      "dependsOn": ["graphql-extensions#build", "graphql-sdk#sync:cms", "^build"]
    },
    "graphql-sdk#sync:cms": {
      "outputMode": "new-only",
      "cache": false,
      "dependsOn": ["^build", "graphql-extensions#build"],
      "outputs": [".cms-sync"]
    },
    "web#build": {
      "outputMode": "new-only",
      "dependsOn": ["graphql-sdk#sync:cms", "graphql-sdk#gql:start", "^build"],
      "outputs": ["out/**", ".next/**"]
    }
  }
}
