/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    USER_ACCOUNT_ID: process.env.USER_ACCOUNT_ID,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
};
