/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SPOONACULAR_API_KEY:
      process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY,
    NEXT_PUBLIC_SPOONACULAR_API_URL:
      process.env.NEXT_PUBLIC_SPOONACULAR_API_URL,
  },
};

export default nextConfig;
