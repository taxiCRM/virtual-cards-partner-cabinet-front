import { RouteQuery } from 'atomic-router';
import { GetAllParams } from 'pay-people-ui-kit';

export interface QueryParams {
  [key: string]: string | boolean;
}

export const buildQueryParams = (
  params: GetAllParams,
  options: { baseParams?: boolean } = { baseParams: true },
): QueryParams => {
  const queryParams: QueryParams = {};

  if (params?.pagination) {
    if (params.pagination?.page) {
      queryParams['page[offset]'] = `${params.pagination.page}`;
    }
    if (params.pagination?.per_page) {
      queryParams['page[limit]'] = `${params.pagination.per_page}`;
    }
  }

  if (params?.order) {
    const sortParts = Object.entries(params.order)
      .filter(([, direction]) => direction === 'asc' || direction === 'desc')
      .map(([key, direction]) => (direction === 'asc' ? key : `-${key}`));
    if (sortParts.length > 0) {
      queryParams.sort = sortParts.join(',');
    }
  }

  if (params?.filters) {
    for (const [key, value] of Object.entries(params.filters)) {
      if (value) {
        if (typeof value === 'string') {
          queryParams[`filter[${key}]`] = value;
        } else if (value && typeof value === 'boolean') {
          queryParams[`filter[${key}]`] = value;
        } else if (value && typeof value === 'object') {
          if (value.from) {
            queryParams[`filter[${key}][from]`] = value.from;
          }
          if (value.to) {
            queryParams[`filter[${key}][to]`] = value.to;
          }
        }
      }
    }
  }

  if (!options?.baseParams) {
    return queryParams;
  }

  return Object.keys(queryParams).length > 0 ? queryParams : { 'page[offset]': '1', 'page[limit]': '15' };
};

export const parseQueryString = (queryString: RouteQuery): GetAllParams => {
  const params: GetAllParams = {};
  const searchParams = new URLSearchParams(queryString);

  const pageOffset = searchParams.get('page[offset]');
  const pageLimit = searchParams.get('page[limit]');
  if (pageOffset || pageLimit) {
    params.pagination = {
      page: pageOffset ? parseInt(pageOffset, 15) : undefined,
      per_page: pageLimit ? parseInt(pageLimit, 15) : undefined,
    };
  }

  const sortParams = searchParams.getAll('sort');
  if (sortParams.length > 0) {
    params.order = {};
    sortParams.forEach(sort => {
      const isDescending = sort.startsWith('-');
      const key = isDescending ? sort.slice(1) : sort;
      if (params.order) params.order[key] = isDescending ? 'desc' : 'asc';
    });
  }

  params.filters = {};
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith('filter[') && key.endsWith(']')) {
      const filterKey = key.slice(7, -1);
      if (value) {
        if (filterKey.includes('][')) {
          const [baseKey, subKey] = filterKey.split('][');
          if (!params.filters[baseKey]) {
            params.filters[baseKey] = {};
          }
          (params.filters[baseKey] as { [subKey: string]: string })[subKey.replace(']', '')] = value;
        } else if (['true', 'false'].includes(value)) {
          params.filters[filterKey] = value === 'true';
        } else {
          params.filters[filterKey] = value;
        }
      }
    }
  }

  return params;
};
