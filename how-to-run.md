## How to run on local server

In the next.config.js file, comment-out "output: 'export'". Then
use the command 'npm run dev' in the terminal.

## How to deploy to Firebase

In the next.config.js file,

1. set 'output' to 'export'
2. run 'npx next build'
3. run 'firebase deploy'
   output: 'export',
