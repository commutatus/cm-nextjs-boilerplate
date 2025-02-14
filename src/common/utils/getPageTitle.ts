const ENV_PREFIX: Record<string, string> = {
  staging: "[staging] | ",
  beta: "[beta] | ",
  production: "",
};

const env = process.env.NEXT_PUBLIC_ENV || "production";
const prefix = ENV_PREFIX[env] ?? "";

export function getPageTitle(title: string): string {
  return `${prefix}${title}`;
}