import { InMemoryCache } from "@apollo/client";
import { ALL_PRODUCTS_COUNT } from "../components/Pagination";

interface IRead {
  args: {
    first: number;
    skip: number;
  };
  cache: InMemoryCache;
}
export default function paginationField() {
  return {
    keyArgs: false, //tells Apollo we will take care of everything
    read(existing = [], { args, cache }: any) {
      console.log({ existing, args, cache });
      const { skip, first } = args;

      //Read the number of items on the page from cache
      const data: any = cache.readQuery({ query: ALL_PRODUCTS_COUNT });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      //Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        //We don't have any items, we must go to network to fetch them
        return false;
      }

      //If there are items, return from cache and don't go to network
      if (items.length) {
        console.log(
          `There are ${items.length} in cache, sending them to Apollo`
        );
        return items;
      }
      return false; //Fallback to network
    },
    merge(existing: any, incoming: any, { args }: any) {
      const { skip, first } = args;
      console.log(`Merging items from network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      return merged;
    },
  };
}
