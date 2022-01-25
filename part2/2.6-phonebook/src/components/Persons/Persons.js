import React from "react";
import Numbers from "./Numbers";
import ResultSearch from "./ResultSearch";

const Persons = ({
  persons,
  newSearch,
  messageLoading,
  loading,
  messageErrorLoading,
  filterResult,
}) => {
  return (
    <>
      {newSearch ? (
        <ResultSearch
          messageLoading={messageLoading}
          loading={loading}
          messageErrorLoading={messageErrorLoading}
          filterResult={filterResult}
        />
      ) : (
        <Numbers persons={persons} />
      )}
    </>
  );
};

export default Persons;
