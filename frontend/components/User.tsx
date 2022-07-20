import { gql, useQuery } from "@apollo/client";

const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {

        }
    }
`;
export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
}
