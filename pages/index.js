/* 
    I personally don't like inline styling,
    I rather set a SCSS system based on components using the ABEM philosophy,
    but for this exercise I will maintain inline styling and some constants
*/
import Layout from '../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import _ from 'lodash';

// components
import AutoCompleteList from '../components/AutoCompleteList';
import MainTable from '../components/MainTable';

// global const styles
import ConstantsClasses from '../shared/Constants';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: false,
      criptoData: {},
      availableCriptos: []
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.fetchData = _.throttle(this.fetchData.bind(this), 900, false);
  }

  resetCriptoValue = () => {
    this.setState({availableCriptos: []});
  }
  
  handleListClick = (event) => {
    const str = event.target.dataset.key
    this.resetCriptoValue();
    this.setState({q: str});
    document.getElementById('searchField').value = str;

    this.fetchCriptoData(str)
  }

  fetchData = async (str) => {
    /* Make the call only when user start typing, else reset availableCriptos */
    if (str != '' && str.length > 1) {
      const limit = 10
      const res = await fetch(`https://api.coincap.io/v2/assets?limit=${limit}&search=${str}`)
      const json = await res.json()
      
      // Control duplicates and removed them from autocomplete list
      const keys = Object.keys(this.state.criptoData)
      const arr = json.data.map(entry => entry.id)
      const listItems = arr.filter(item => !keys.includes(item))

      this.setState({
        availableCriptos: listItems.map(entry => 
          <li className='c-list__item'
          key={entry}
          data-key={entry}
          onClick={this.handleListClick}
          >{entry}</li>)
      })
    } else {
      this.resetCriptoValue();
    }

    /* 
    TODO: Handle the live update with one socket
    TODO: Handle the back button keeping the criptoData updated (the logic here needs adjustment)
    const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin')

    pricesWs.onmessage = function (msg) {
        console.log(msg.data)
    } */

  }

  fetchCriptoData = async (str) => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${str}`)
    const json = await res.json()
    
    this.setState({criptoData: {...this.state.criptoData, ...{[json.data.id]: json.data}}})
    
  }
  handleChange(event) {
    this.fetchData(event.target.value);
  }

  render() {
    return (
      <Layout>
      <h1>Criptovalues App</h1>
      <label htmlFor='searchField' style={ConstantsClasses.seoHidden}>Label</label>
      <input type="text"
      id='searchField'
      placeholder="search criptovalue"
      autoComplete='off'
      style={ConstantsClasses.inputStyle}
      onChange={this.handleChange}
      value={this.state.value} />
      {(this.state.availableCriptos.length > 0) &&
      <AutoCompleteList list={this.state.availableCriptos} />
    }
    <h2>Criptovalue Details</h2>
    {!(_.isEmpty(this.state.criptoData)) &&
    <MainTable criptoData={this.state.criptoData} />}
      </Layout>
    );
  }
}

export default IndexPage;