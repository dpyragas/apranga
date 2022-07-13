import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import DisplayError from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

interface PaginationProps {
  currentPage: number;
}

export const ALL_PRODUCTS_COUNT = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

const Pagination = ({ currentPage }: PaginationProps) => {
  const { error, loading, data } = useQuery(ALL_PRODUCTS_COUNT);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Apranga - Page {currentPage} of {pageCount}
        </title>
      </Head>

      <Link href={`/products/${currentPage - 1}`}>
        <a aria-disabled={currentPage <= 1}>◀ Prev</a>
      </Link>

      <p>
        Page {currentPage} of {pageCount}
      </p>
      <p>{count} Products Total</p>
      <Link href={`/products/${currentPage + 1}`}>
        <a aria-disabled={currentPage >= pageCount}>Next ▶</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
