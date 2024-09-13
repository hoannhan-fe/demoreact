export function getRouterURL(
  routerPath: string,
  params?: Record<string, string>,
): string {
  if (!params) return routerPath;

  return Object.entries(params).reduce((output, [key, value]) => {
    return output.replace(`{${key}}`, value);
  }, routerPath as string);
}

export const handleFilterParams = <T extends object>(queryParams: T) => {
  return Object.fromEntries(
    Object.entries(queryParams).filter(
      ([, value]) => value !== null && value !== '',
    ),
  );
};
