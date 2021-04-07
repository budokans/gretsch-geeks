import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchProducts: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      description
      photo {
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

export default function Search() {
  const [
    searchProducts,
    { data, error, loading },
  ] = useLazyQuery(SEARCH_PRODUCTS_QUERY, { fetchPolicy: 'no-cache' });

  const debouncedSearchProducts = debounce(searchProducts, 350);
  const items = data?.searchProducts || [];

  // Ensure aria-controls prop matches on both server and client
  resetIdCounter();

  const { getMenuProps, getInputProps, getComboboxProps } = useCombobox({
    items: [],
    onInputValueChange({ inputValue }) {
      console.log('Input value changed.');
      debouncedSearchProducts({ variables: { searchTerm: inputValue } });
    },
    onSelectedItemChange() {
      console.log('Selected item changed.');
    },
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for items',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {items.map((item) => (
          <DropDownItem key={item.id}>{item.name}</DropDownItem>
        ))}
      </DropDown>
    </SearchStyles>
  );
}
