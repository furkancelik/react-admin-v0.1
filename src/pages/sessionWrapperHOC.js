import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_ME } from "../store/queries";

const sessionWrapperHOC = Component => props => {
  const { data, error, loading } = useQuery(GET_ME);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    localStorage.removeItem("TOKEN");
    window.location = "/";
  }

  return <Component {...props} session={data} />;
};

export default sessionWrapperHOC;
