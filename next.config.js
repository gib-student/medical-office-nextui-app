/** @type {import('next').NextConfig} */
const nextConfig = {
    // Change output to 'export' before building, then deploying website to firebase.
    // For everyday development, comment-out "output: 'export'," so you the command
    // 'npm run dev' will run it on your lojcal server.
    // Deploy steps:
    // 1. set 'output' to 'export'
    // 2. run 'npx next build'
    // 3. run 'firebase deploy'
    output: 'export', 
}

module.exports = nextConfig
