import { resetIdCounter, useCombobox } from 'downshift';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

export default function Search() {
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
