import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

export default function Search() {
  return (
    <SearchStyles>
      <input type="search" />
      <DropDown>
        <DropDownItem>1</DropDownItem>
        <DropDownItem>2</DropDownItem>
        <DropDownItem>3</DropDownItem>
        <DropDownItem>4</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
}
