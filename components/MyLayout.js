import Header from './Header';

const layoutStyle = {
  margin: '0 auto',
  padding: 20,
  border: '1px solid #DDD',
  maxWidth: 1080
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
);

export default Layout;