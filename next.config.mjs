/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
  },
};

export default nextConfig;
