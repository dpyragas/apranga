import gql from "graphql-tag";
import styled from "styled-components";
import useForm from "../hooks/useForm";
import Form from "./styles/Form";

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

const StyledResetButton = styled.button`
  width: auto;
  background: #f1f1f5;
  color: var(--blue);
  cursor: pointer;
  outline: 1px var(--blue) solid;
  border: 0;
  font-size: 2rem;
  font-weight: 600;
  padding: 4px 1.2rem;
  box-sizing: border-box;
`;

const StyledSubmitButton = styled.button`
  width: auto;
  background: var(--blue);
  color: white;
  cursor: pointer;
  border: 0;
  font-size: 2rem;
  font-weight: 600;
  padding: 0.5rem 1.2rem;
`;
const CreateProduct = () => {
  const { inputs, handleChange, resetForm } = useForm();
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset>
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
