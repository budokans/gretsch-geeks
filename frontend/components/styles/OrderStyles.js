import styled from 'styled-components';

const OrderStyles = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  border: 1px solid var(--offWhite);
  box-shadow: var(--bs);
  padding: 2rem;
  border-top: 10px solid red;

  @media (max-width: 700px) {
    width: 100%;
  }

  & > p {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0;
    border-bottom: 1px solid var(--offWhite);

    @media (max-width: 800px) {
      grid-template-columns: 2fr 3fr;
      font-size: 1rem;
    }

    span {
      padding: 1rem;

      &:first-child {
        font-weight: 900;
        text-align: right;
      }
    }
  }

  .order-item {
    border-bottom: 1px solid var(--offWhite);
    display: grid;
    grid-template-columns: 3fr 2fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding-bottom: 2rem;

    @media (max-width: 800px) {
      font-size: 1rem;

      p {
        margin: 0.3rem 0;
      }

      h2 {
        font-size: 1.3rem;
        margin: 0;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      @media (max-width: 600px) {
        height: 150px;
      }
    }
  }
`;

export default OrderStyles;
