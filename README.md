# Project Name

## Initial repository setup (for repo owners)

These steps need to be performed only once after creating the repository from the template

### Secrets
1. Run `yarn create-encryption-keys`. This will generate the prod, dev, and staging encryption keys. You'll need these keys to run the `encrypt-env` and `decrypt-env` set of commands
2. Save the generated keys in a secure location from where they can be shared with teammates

### Amplify
1. Create an environment variable `ENV`. This can have only one of these value: `staging` or `prod`
2. Create an environment variable `DECRYPTION_KEY_PROD` with the same value as the prod decryption key
3. Create `DECRYPTION_KEY_STAGING` from the staging decryption key

### General
1. Finish setting up all previous sections
2. Update this Readme with information relevant to the project
3. Delete the `Initial Setup` section

## Initial setup (for developers)
1. `nvm use` to set the correct node version
2. `npm run install` to install the dependencies
3. Get access to the decryption key file from your team lead. Paste this file in the root of the repository


## Development
1. `nvm use` to set the correct node version
2. `npm run dev:staging` or `npm run dev:prod` based on the env you're using. Check the CLI to find the URL that you need to open in the browser