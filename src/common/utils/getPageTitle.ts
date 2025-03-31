const ENV_PREFIX: Record<string, string> = {
  staging: "[STG] | ",
  beta: "[BETA] | ",
  dev: "[DEV] | ",
  production: "",
};

const env = process.env.NEXT_PUBLIC_APP_ENV || "production";
const prefix = ENV_PREFIX[env] ?? "";

export function getPageTitle(title: string): string {
  return `${prefix}${title}`;
}