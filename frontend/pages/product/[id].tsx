import SingleProduct from "../../components/SingleProduct";
import { IQuery } from "../../lib/interfaces";

export default function SingleProductPage({ query }: IQuery) {
  return (
    <>
      <SingleProduct id={query.id} />
    </>
  );
}
