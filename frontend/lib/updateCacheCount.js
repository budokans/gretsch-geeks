import { PAGINATION_QUERY } from '../components/Pagination';

export function updateCacheCount(cache) {
  const prevProductsCount = cache.readQuery({ query: PAGINATION_QUERY });
  if (prevProductsCount) {
    cache.writeQuery({
      query: PAGINATION_QUERY,
      data: {
        _allProductsMeta: prevProductsCount + 1,
      },
    });
  }
}
