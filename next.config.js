/** @type {import('next').NextConfig} */
const nextConfig = {
  // If Avators Continue not showing
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "referrer-policy", value: "no-referrer" }],
      },
    ];
  },
};

module.exports = nextConfig;
