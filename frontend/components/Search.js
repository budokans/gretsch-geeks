import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
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

  resetIdCounter();
  const { getMenuProps, getInputProps, getComboboxProps } = useCombobox({
    items: [],
    onInputValueChange() {
      console.log('Input value changed.');
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
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        <DropDownItem>1</DropDownItem>
        <DropDownItem>2</DropDownItem>
        <DropDownItem>3</DropDownItem>
        <DropDownItem>4</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
}
