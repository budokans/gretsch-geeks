import { PAGINATION_QUERY } from '../components/Pagination';

export function updateCacheCount(cache, { operation }) {
  const prevProductsCount = cache.readQuery({ query: PAGINATION_QUERY });
  if (prevProductsCount) {
    cache.writeQuery({
      query: PAGINATION_QUERY,
      data: {
        _allProductsMeta:
          operation === 'create'
            ? prevProductsCount + 1
            : prevProductsCount - 1,
      },
    });
  }
}
