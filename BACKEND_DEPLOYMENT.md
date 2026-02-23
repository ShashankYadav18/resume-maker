# Backend Deployment Instructions

Netlify only hosts static sites and serverless functions. Your server (Express backend) cannot run directly on Netlify.

Options for backend deployment:

1. **Deploy backend to a platform like Render, Heroku, or Vercel**
   - Push your server folder to a GitHub repo.
   - Deploy using Render, Heroku, or Vercel (follow their guides).
   - Update your client API URLs to point to the deployed backend.

2. **Serverless Functions (Advanced)**
   - Convert backend endpoints to Netlify Functions (if feasible).
   - Move logic from Express routes to `netlify/functions`.

**Recommended:** Deploy backend separately (Render/Heroku/Vercel).

## Steps
1. Deploy backend as above.
2. Update client/src/services/api.js to use the new backend URL.
3. Deploy client to Netlify (see next steps).
