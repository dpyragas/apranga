import { useRouter } from "next/router";
import React from "react";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";

const ProductsPageIndex = () => {
  const { query } = useRouter();
  const page = Number(query.page);

  return (
    <div>
      <Pagination currentPage={page || 1} />
      <Products page={page || 1} />
      <Pagination currentPage={page || 1} />
    </div>
  );
};

export default ProductsPageIndex;
