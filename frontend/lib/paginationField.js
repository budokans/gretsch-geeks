import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the number of items on page from cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const pageNum = skip / first + 1;
      const pagesTotal = Math.ceil(count / first);

      // Check for existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length && items.length !== first && pageNum === pagesTotal) {
        return items;
      }

      // If no items, make a network request to get them
      if (items.length !== first) return false;

      // If there are items, return them from the cache
      if (items.length) return items;

      return false;
    },
    merge(existing, incoming, { args }) {
      const { skip } = args;
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
