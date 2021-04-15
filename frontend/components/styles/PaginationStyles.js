import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid var(--lightGray);
  border-radius: 10px;

  @media (max-width: 600px) {
    margin: 1rem 0;
    width: 100%;
    border-radius: 0;
    border-right: none;
    border-left: none;
  }

  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid var(--lightGray);

    &:last-child {
      border-right: 0;
    }

    @media (max-width: 600px) {
      padding: 5px 10px;
      font-size: 1rem;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

export default PaginationStyles;
