import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import useForm from "../hooks/useForm";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";
import { ALL_PRODUCTS_QUERY } from "./Products";
import Router from "next/router";
import { StyledResetButton, StyledSubmitButton } from "./styles/Buttons";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, resetForm } = useForm();
  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createProduct();
        resetForm();
        //Go to products page

        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
          <input
            type="file"
            required
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>

        <StyledSubmitButton style={{ marginRight: "10px" }} type="submit">
          + Add Product
        </StyledSubmitButton>

        <StyledResetButton type="button" onClick={resetForm}>
          Reset Form
        </StyledResetButton>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
