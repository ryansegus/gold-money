import Link from 'next/link';
import logo from './../assets/img/coin-cap-logo.jpg';
const headerLogoStyle = {
  display: 'block',
  width: '100%',
  maxWidth: 300,
  margin: '0 auto',
  cursor: 'pointer'
};

const Header = () => (
  <header>
    <Link href="/">
    <img src={logo} alt="CoinCap Logo" style={headerLogoStyle} />
    </Link>
  </header>
);

export default Header;