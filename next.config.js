/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"]
    },
    experimental: {
        serverComponentsExternalPackages: ["cloudinary"]
    }
};

module.exports = nextConfig;
