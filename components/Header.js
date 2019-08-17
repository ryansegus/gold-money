import logo from './../assets/img/coin-cap-logo.jpg';
const headerStyle = {
  display: 'block',
  width: '100%',
  maxWidth: 300,
  margin: '0 auto'
};

const Header = () => (
  <header>
    <img src={logo} alt="CoinCap Logo" style={headerStyle} />
  </header>
);

export default Header;