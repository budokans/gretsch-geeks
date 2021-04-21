import styled from 'styled-components';

const ItemStyles = styled.div`
  background: white;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  position: relative;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    margin: 10px 0;
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;

    @media (max-width: 600px) {
      height: 200px;
      object-fit: cover;
    }
  }

  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
    text-align: center;

    @media (max-width: 600px) {
      font-size: 1rem;
      padding: 0;
      margin: 0.3rem auto 1rem;
    }
  }

  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid var(--lightGray);
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: var(--lightGray);

    & > * {
      background: white;
      border: 0;
      font-size: 1.2rem;
      /* text-transform: uppercase; */
      padding: 1.5rem 1rem;
      color: var(--black);

      &:disabled {
        background-color: var(--lightGrey);
      }

      @media (max-width: 600px) {
        font-size: 1rem;
      }
    }

    a {
      text-align: center;
    }

    a:hover {
      text-decoration: none;
    }
  }
`;

export default ItemStyles;
