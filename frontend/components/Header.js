import Link from 'next/link';
import styled from 'styled-components';
import Cart from './Cart';
import Nav from './Nav';
import Search from './Search';

const Logo = styled.h1`
  font-size: 3.5em;
  background: red;
  margin-left: 2rem;
  transform: skew(-7deg);
  z-index: 2;
  position: relative;

  a {
    color: white;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 1144px) {
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    font-size: 2.5em;
    margin-left: 1rem;
    margin-left: 0;
    text-align: center;
    transform: none;
    font-style: italic;
    line-height: 1.1;
    margin-top: 0;
    padding: 0.75rem 0;

    a:hover {
      text-decoration: none;
    }
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;

    @media (max-width: 1144px) {
      grid-template-columns: 100%;
    }
  }

  .sub-bar {
    border-bottom: 1px solid var(--black, black);
    display: grid;
    grid-template-columns: 1fr auto;
    max-width: var(--maxWidth);
    margin: 0 auto;

    input {
      padding-left: 15px;
    }

    input:focus {
      outline: none;
    }
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Gretsch Geeks</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
}
