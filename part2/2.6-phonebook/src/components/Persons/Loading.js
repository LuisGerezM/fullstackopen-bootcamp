import React from "react";
import FilterResult from "./FilterResult";

const Loading = ({ loading, messageErrorLoading, filterResult }) => {
  return (
    <>
      {loading ? (
        <>
          <p>{messageErrorLoading}</p>
        </>
      ) : (
        <FilterResult filterResult={filterResult} />
      )}
    </>
  );
};

export default Loading;
