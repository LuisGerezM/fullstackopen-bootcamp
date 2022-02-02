// retorna elementos que coincidan con 1 o más strings buscados; En el orden en que están siendo agregados:
// * si busco s -> trae todo el que tenga nombre "s";
// * si busco arg -> trae todo el que tenga en su nombre "arg"
export const filterItems = (query, countries) => {
  return countries.filter((country) => {
    return country.name.common.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
};
