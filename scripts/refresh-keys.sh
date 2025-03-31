#!/usr/bin/env bash

set -euo pipefail

envs=(dev staging prod)

# TODO: Move this to cm-env
declare -A key_files=(
  [dev]=".development.key"
  [staging]=".staging.key"
  [prod]=".production.key"
)

for env in "${envs[@]}"; do
  echo "Refreshing keys for $env environment..."

  key_file=${key_files[$env]}
  if [[ ! -f $key_file ]]; then
    echo "Error: Key file '$key_file' for environment '$env' does not exist." >&2
    exit 1
  fi

  if ! npm run decrypt-${env}; then
    echo "Error: Failed to decrypt env for environment '$env'." >&2
    exit 1
  fi

  rm -f "$key_file"

  if ! cm-env setup ${env}; then
    echo "Error: Failed to generate new key for environment '$env'." >&2
    exit 1
  fi

  if ! npm run encrypt-${env}; then
    echo "Error: Failed to encrypt env for environment '$env'." >&2
    exit 1
  fi
done

echo "All keys refreshed successfully. Please share the new keys with the team."
echo "Note: Ensure that the new keys are securely shared with the team and not committed to version control."