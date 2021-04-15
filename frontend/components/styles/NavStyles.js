import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;

  li,
  button {
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1.5rem;
    background: none;
    border: 0;
    line-height: 1.3;
    font-size: 1.3rem;

    @media (max-width: 820px) {
      font-size: 1rem;
      padding: 0 10px;
    }

    @media (max-width: 600px) {
      font-size: 0.75rem;
      padding: 0 7px;
    }
  }

  button {
    padding: 0;
    color: var(--black);
  }

  li {
    padding: 1rem 3rem;

    @media (max-width: 820px) {
      font-size: 1rem;
      padding: 10px 7px;
    }

    @media (max-width: 600px) {
      font-size: 0.75rem;
    }

    &:before {
      content: '';
      width: 2px;
      background: var(--lightGray);
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }

    @media (min-width: 820px) {
      &:after {
        height: 2px;
        background: red;
        content: '';
        width: 0;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 2rem;
      }
    }
  }

  a,
  li,
  button {
    display: flex;
    align-items: center;
    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        /* width: calc(100% - 10px); */
        text-decoration: var(--red) underline;
      }
    }
  }

  @media (max-width: 1100px) {
    border-top: 1px solid var(--lightGray);
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
