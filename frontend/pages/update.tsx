import React from "react";
import UpdateProduct from "../components/UpdateProduct";
import { IQuery } from "../lib/interfaces";

const UpdatePage = ({ query }: IQuery) => {
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
};

export default UpdatePage;
