export function parseQueryParams(queryString: string): Record<string, string | string[]> {
    let cleanQuery = queryString;

    if (cleanQuery.includes('?')) {
        cleanQuery = cleanQuery.split('?')[1];
    }

    if (!cleanQuery || cleanQuery === '?' || cleanQuery.includes('://')) {
        if (cleanQuery.includes('://')) {
            const urlParts = cleanQuery.split('?');
            if (urlParts.length < 2) return {};
            cleanQuery = urlParts[1];
        } else {
            return {};
        }
    }

    if (cleanQuery.includes('#')) {
        cleanQuery = cleanQuery.split('#')[0];
    }

    const params: Record<string, string | string[]> = {};
    const pairs = cleanQuery.split('&').filter(Boolean);

    for (const pair of pairs) {
        const [key, value = ''] = pair.split('=').map(decodeURIComponent);
        const decodedValue = value.replace(/\+/g, ' ');

        if (key in params) {
            if (Array.isArray(params[key])) {
                (params[key] as string[]).push(decodedValue);
            } else {
                params[key] = [params[key] as string, decodedValue];
            }
        } else {
            params[key] = decodedValue;
        }
    }

    return params;
}