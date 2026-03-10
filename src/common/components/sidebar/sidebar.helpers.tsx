import { RoutePaths } from "@/common/utils/constants";


export const routeToMenuMap: {
  [pathPrefix: string]: { selectedKey: RoutePaths; openKey?: RoutePaths };
} = {
  [RoutePaths.HOME]: { selectedKey: RoutePaths.HOME },
};

export const getMenuKeysFromPathname = (pathname: string) => {
  const matchedEntry = Object.entries(routeToMenuMap)
    .sort((a, b) => b[0].length - a[0].length)
    .find(([prefix]) => pathname.startsWith(prefix));

  if (!matchedEntry) return { selectedKey: "", openKey: undefined };

  const [, { selectedKey, openKey }] = matchedEntry;
  return { selectedKey, openKey };
};
