// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Custom rewrites to handle stackframe.js requests
  async rewrites() {
    return [
      {
        source: '/stackframe.js',
        destination: '/api/stackframe',
      },
      {
        source: '/watch/stackframe.js',
        destination: '/api/stackframe',
      },
    ];
  },
  
  // Custom headers for static files
  async headers() {
    return [
      {
        source: '/stackframe.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
