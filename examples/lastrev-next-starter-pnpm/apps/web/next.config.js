module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['ui', 'graphql-sdk'],
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}'
    }
  },
  images: {
    domains: ['images.ctfassets.net'],
    formats: ['image/avif', 'image/webp']
  }
};
