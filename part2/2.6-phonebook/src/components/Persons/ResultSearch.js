import React from "react";
import Loading from "./Loading";

const ResultSearch = ({
  messageLoading,
  loading,
  messageErrorLoading,
  filterResult,
}) => {
  return (
    <>
      <h2>Result search</h2>
      <p>{messageLoading}</p>
      <Loading
        loading={loading}
        messageErrorLoading={messageErrorLoading}
        filterResult={filterResult}
      />
    </>
  );
};

export default ResultSearch;
