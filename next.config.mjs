/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'b780doqaj6.ufs.sh',
				port: '',
				pathname: '/f/**',
			},
		],
	},
};

export default nextConfig;


