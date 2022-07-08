/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import formatMoney from "../lib/formatMoney";
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
    </ItemStyles>
  );
}