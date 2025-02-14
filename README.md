# Project Name

## First time setup and deployment

These steps need to be performed only once after creating the repository from the template

### Secrets
1. Run `npm run create-encryption-keys`. This will generate the `.production.key`, `.staging.key`, and `.development.key` encryption keys
2. Save all the `*.key` files in a secure location
3. **Set up environment variables for decryption**
  To decrypt environment variables, follow these steps:
Run the appropriate decryption command based on the environment:
npm run decrypt-staging-env    # For Staging
npm run decrypt-production-env # For Production
npm run decrypt-dev-env        # For Development
Open the .env.local file and add the following variable based on your environment:
NEXT_PUBLIC_ENV=staging    # For Staging
NEXT_PUBLIC_ENV=production # For Production
NEXT_PUBLIC_ENV=dev        # For Development
Encrypt Environment Variables After Changes
After updating .env.local, re-encrypt the environment variables to keep them secure:
npm run encrypt-staging-env    # For Staging
npm run encrypt-production-env # For Production
npm run encrypt-dev-env        # For Development

### Amplify
1. Create an environment variable `ENV`. This can have only one of these value: `staging` or `prod`
2. Create an environment variable `DECRYPTION_KEY_PROD` with the same value as the prod decryption key
3. Create `DECRYPTION_KEY_STAGING` from the staging decryption key

### General
1. Update project name in `README.md`, `package.json`, and in `src/app/layout.tsx`
2. Update this Readme with information relevant to the project. [Example of a good readme](https://github.com/commutatus/awesome?tab=readme-ov-file#awesome)
3. Remove the `First time setup and deployment` section from the Readme
4. Add token in env file for usage in `apollo.config.js`

## Development prerequisites
1. `nvm use` to set the correct node version
2. `npm run install` to install the dependencies
3. Get access to the decryption key file from your team members. Paste these files in the root of the repository


## Development flow
1. `nvm use` to set the correct node version
2. `npm run dev:staging` or `npm run dev:prod`


## Encryption/Decryption flow
Example to update staging env:
1. Run `npm run decrypt-staging-env`
2. Edit `.env.local`
3. Run `npm run encrypt-staging-env`

## GraphQL types
- Use `npm run auto-generate-graphql-types` to automatically generate types for queries and mutations used in project
- The generate types are located in `src/generated/graphql.ts`