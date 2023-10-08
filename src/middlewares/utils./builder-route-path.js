export function buildRoutePath(path) {
    const routeParamsRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replace(routeParamsRegex, '(?<id>[a-z0-9\\-]+)');
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`); 
    return pathRegex;
}
