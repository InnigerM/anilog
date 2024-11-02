# Supabase Edge Functions

Copy the .env.example and fill in the OPENAI_KEY
`cp .env.example .env`

To start locally, Docker Desktop must be installed. The cloud functions can be started by running `npx supabase start` and are accessible at `http://127.0.0.1:54321/functions/v1/[function-name]`

## Update env varibales in production

Login to your supabase account
`npx supabase login`

Sync the .env file to production
`npx supabase secrets set --env-file .env`

Check the synced env keys
`npx supabase secrets list`

## Deploy

`npx supabase functions deploy --project-ref rgcbaftxplqejgurmxyx`
