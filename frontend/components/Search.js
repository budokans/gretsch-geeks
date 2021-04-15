import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { throttle } from 'lodash';
import { useRouter } from 'next/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';
import { useUser } from './User';

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
      user {
        id
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const { id: currentUserId } = useUser();

  const [
    searchProducts,
    { data, error, loading },
  ] = useLazyQuery(SEARCH_PRODUCTS_QUERY, { fetchPolicy: 'no-cache' });

  const throttleSearchProducts = throttle(searchProducts, 500);
  const items = data?.searchProducts || [];

  // Ensure aria-controls prop matches on both server and client
  resetIdCounter();

  const {
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
    isOpen,
    inputValue,
  } = useCombobox({
    items,
    onInputValueChange() {
      throttleSearchProducts({ variables: { searchTerm: inputValue } });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
        query: {
          isOwner: currentUserId === selectedItem.user.id,
          currentUserId,
          productOwnerId: selectedItem.user.id,
        },
      });
    },
    itemToString: (item) => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an item',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          inputValue.length > 0 &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item, index })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.photo.altText}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && inputValue.length > 0 && (
          <DropDownItem>Sorry, no items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
