import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${(props) => props.open && `transform: translateX(0);`};

  @media (max-width: 600px) {
    min-width: 0;
    width: 100%;
  }

  header {
    border-bottom: 5px solid var(--black);
    margin-bottom: 2rem;
    padding-bottom: 2rem;

    h3 {
      @media (max-width: 600px) {
        font-size: 2.5rem;
      }
    }
  }

  footer {
    border-top: 10px double var(--black);
    margin-top: 2rem;
    padding-top: 2rem;
    font-size: 1.5rem;
    font-weight: 900;

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }

    p {
      margin: 0;
      color: green;
    }

    .error {
      color: var(--red);
    }

    .total {
      font-size: 3rem;
      color: black;

      @media (max-width: 600px) {
        font-size: 1.75rem;
      }
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
`;

export const Button = styled.button`
  font-size: 2rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
  }
  &:focus {
    outline-color: transparent;
  }
`;

export const Item = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'image product-name button'
    'image price price';

  img {
    grid-area: image;
    margin-right: 1rem;
  }

  h3 {
    grid-area: product-name;

    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }

  p {
    grid-area: price;
    align-self: start;

    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }

  Button {
    grid-area: button;
    align-self: start;
    line-height: 1;
  }

  h3,
  p {
    margin: 0 1rem 0 0;
    em {
      font-size: 1.2rem;
    }
  }
`;
