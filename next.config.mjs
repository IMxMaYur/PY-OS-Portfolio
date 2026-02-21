/** @type {import('next').NextConfig} */
const nextConfig = {
output: 'export',
trailingSlash: true,
eslint: {
ignoreDuringBuilds: true,
},
typescript: {
ignoreBuildErrors: true,
},
images: {
unoptimized: true,
remotePatterns: [
{
protocol: 'https',
hostname: '**',
},
],
},
// Removed experimental.optimizeCss to fix build error
}

export default nextConfig
