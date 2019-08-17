import Layout from '../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import _ from 'lodash';

const inputStyle = {
  display: 'block',
  maxWidth: 300,
  margin: '0 auto',
  padding: 20,
  fontSize: 20
};

const seoHidden = {
  position: 'absolute',
  left: -10000,
  top: 'auto',
  width: 1,
  height: 1,
  overflow: 'hidden'
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      criptovalue: []
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.fetchData = _.throttle(this.fetchData.bind(this), 1200, false);
  }

  fetchData = async (str) => {
    /* Make the call only when user start typing, else reset criptovalue */
    if (str != '' && str.length > 2) {
      const limit = 10
      const res = await fetch(`https://api.coincap.io/v2/assets?limit=${limit}&search=${str}`)
      const json = await res.json()

      this.setState({
        criptovalue: json.data.map(entry => entry.id)
      })
    } else {
      this.setState({criptovalue: []});
    }

  }
  handleChange(event) {
  
    this.setState({q: event.target.value});
    this.fetchData(event.target.value);
  
  }

  render() {
    return (
      <Layout>
      <h1>Criptovalue App</h1>
      <label htmlFor='searchField' style={seoHidden}>Label</label>
      <input type="text"
      id='searchField'
      placeholder="search criptovalue"
      style={inputStyle}
      onChange={this.handleChange}
      value={this.state.value} />
      {this.state.criptovalue.length > 0 &&
        <ul>
          <li>{this.state.criptovalue}</li>
        </ul>
      }
      </Layout>
    );
  }
}

export default IndexPage;