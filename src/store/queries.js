import { gql } from "apollo-boost";

const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    images
    barcode
    stock
    sku
    price
  }
`;

export const PRODUCT = {
  data: gql`
    {
      products {
        ...ProductFragment
      }
    }
    ${PRODUCT_FRAGMENT}
  `,
  item: gql`
    query($id: ID!) {
      product(id: $id) {
        ...ProductFragment
      }
    }
    ${PRODUCT_FRAGMENT}
  `,
  update: gql`
    mutation($data: updateProductInput!) {
      updateProduct(data: $data) {
        ...ProductFragment
      }
    }
    ${PRODUCT_FRAGMENT}
  `,
  create: gql`
    mutation($data: createProductInput!) {
      createProduct(data: $data) {
        ...ProductFragment
      }
    }
    ${PRODUCT_FRAGMENT}
  `,
  remove: gql`
    mutation($id: ID!) {
      removeProduct(id: $id)
    }
  `
};

// export const GET_ME = gql`
//   {
//     me {
//       id
//     }
//   }
// `;

// export const LOGIN = gql`
//   mutation($data: loginUserInput) {
//     login(data: $data) {
//       token
//     }
//   }
// `;
