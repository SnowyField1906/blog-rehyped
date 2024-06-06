/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['uglify-js'],
        missingSuspenseWithCSRBailout: false,
        allowFutureImage: true,
    },
    reactStrictMode: false,
    devIndicators: {
        buildActivity: false,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
            },
        ],
    },
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        SECRET: process.env.SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        MONGO_URI: process.env.MONGO_URI,
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
        EMAILOCTOPUS_API_URL: process.env.EMAILOCTOPUS_API_URL,
        EMAILOCTOPUS_API_KEY: process.env.EMAILOCTOPUS_API_KEY,
        EMAILOCTOPUS_LIST_ID: process.env.EMAILOCTOPUS_LIST_ID,
        WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ]
    },
}
export default nextConfig
