import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  li,
  button {
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1.5rem;
    background: none;
    border: 0;

    @media (max-width: 820px) {
      font-size: 12px;
      padding: 0 10px;
    }
  }

  button {
    padding: 0;
    color: var(--black);
  }

  li {
    padding: 1rem 3rem;
    @media (max-width: 820px) {
      font-size: 12px;
      padding: 5px 10px;
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
  a,
  li,
  button {
    &:hover,
    &:focus {
      outline: none;
      text-decoration: none;
      &:after {
        width: calc(100% - 60px);
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
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
