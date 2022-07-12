/* eslint-disable @next/next/no-img-element */
import React from "react";
import { gql, useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";
import Head from "next/head";
import styled from "styled-components";

interface ISingleProductProps {
  id: string;
}

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const SingleProduct = ({ id }: ISingleProductProps) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading....</p>;
  if (error) return <DisplayError error={error} />;

  const { Product } = data;
  return (
    <ProductStyles>
      <Head>
        <title>Apranga | {Product.name}</title>
      </Head>
      <img src={Product.photo.image.publicUrlTransformed} alt={Product.name} />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{Product.description}</p>
        <p>{formatMoney(Product.price)}</p>
      </div>
    </ProductStyles>
  );
};

export default SingleProduct;
