# Project Name

## First time setup and deployment

These steps need to be performed only once after creating the repository from the template

### Secrets
1. Run `npm run create-encryption-keys`. This will generate the `.production.key`, `.staging.key`, and `.development.key` encryption keys
2. Save all the `*.key` files in a secure location
3. Add `NEXT_PUBLIC_ENV` for all envs with values used in `src/common/utils/getPageTitle.ts` i.e. `staging`, `production`, and, `dev`

### Amplify
1. Create an environment variable `ENV`. This can have only one of these value: `staging` or `prod`
2. Create an environment variable `DECRYPTION_KEY_PROD` with the same value as the prod decryption key
3. Create `DECRYPTION_KEY_STAGING` from the staging decryption key

### General
1. Update project name in `README.md`, `package.json`, and in `src/app/layout.tsx`
2. Update value of `STORAGE_PREFIX` in `src/common/constants/global.ts`
3. Add token in env file for usage in `apollo.config.js`
4. Update this Readme with information relevant to the project. [Example of a good readme](https://github.com/commutatus/awesome?tab=readme-ov-file#awesome)
5. Remove the `First time setup and deployment` section from the Readme

## Development prerequisites
1. `nvm use` to set the correct node version
2. `npm run install` to install the dependencies
3. Get access to the decryption key file from your team members. Paste these files in the root of the repository


## Development flow
1. `nvm use` to set the correct node version
2. `npm run dev:staging` or `npm run dev:prod`


## Encryption/Decryption flow
Example to update staging env:
1. Run `npm run decrypt-staging`
2. Edit `.env.local`
3. Run `npm run encrypt-staging`

## GraphQL types
- Use `npm run generate-types` to automatically generate types for queries and mutations used in project
- The generate types are located in `src/generated/graphql.ts`