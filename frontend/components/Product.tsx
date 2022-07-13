/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import DeleteProduct from "./DeleteProduct";
import { IProduct } from "./Products";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import Title from "./styles/Title";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "update",
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏
        </Link>
        <DeleteProduct id={product.id}>❌Delete Product</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
