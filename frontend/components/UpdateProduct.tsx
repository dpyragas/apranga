import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Router } from "next/router";
import React from "react";
import useForm from "../hooks/useForm";
import DisplayError from "./ErrorMessage";
import { SINGLE_ITEM_QUERY } from "./SingleProduct";
import { StyledResetButton, StyledSubmitButton } from "./styles/Buttons";
import Form from "./styles/Form";

interface IUpdateProductProps {
  id: string;
}

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }: IUpdateProductProps) => {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, resetForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        resetForm();
        console.log(res);
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            required
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            style={{ resize: "none" }}
            required
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>

        <StyledSubmitButton style={{ marginRight: "10px" }} type="submit">
          Update Product
        </StyledSubmitButton>

        <StyledResetButton type="button" onClick={resetForm}>
          Reset Form
        </StyledResetButton>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
