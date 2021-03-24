import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link a href="/">
          Sick Fits
        </Link>
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <Nav />
    </header>
  );
}
