/* 
    I personally don't like inline styling,
    I rather set a SCSS system based on components using the ABEM philosophy,
    but for this exercise I will maintain inline styling and some constants
*/
import Layout from '../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import _ from 'lodash';
import WebSocketClass from '../shared/WebSocketClass';
import { setArrowClasses } from '../shared/SortFunctions';

// components
import AutoCompleteList from '../components/AutoCompleteList';
import MainTable from '../components/MainTable';

// global const styles
import ConstantsClasses from '../shared/Constants';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criptoData: [],
      availableCriptos: [],
      sortBy: 'name-asc',
      sortOrderUp: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.fetchData = _.throttle(this.fetchData.bind(this), 900, false);
  }

  sortByRankClick = (e) => this.sortCriptoData(e, 'rank')

  sortCriptoData = (e, obj) => {
    switch (obj) {
      case 'rank': this.sortByRank(e, obj);
      break;
    }
  }

  updateStateSorting(obj, sort) {
    this.setState({
      criptoData: obj,
      sortBy: sort})
  }

  sortByRank = (e, sortBy) => {
    const criptoData = this.state.criptoData
    this.setState({sortOrderUp: this.state.sortOrderUp = !this.state.sortOrderUp})
    
    const sortedCriptoData = criptoData.sort((a,b) => 
    this.state.sortOrderUp ? a.rank-b.rank : b.rank-a.rank
    )

    this.state.sortOrderUp ? setArrowClasses(e.target, '-up') : setArrowClasses(e.target, '-down')

    this.updateStateSorting(sortedCriptoData, sortBy)
  }

  resetAvailableCriptos = () => {
    this.setState({availableCriptos: []});
  }
  
  handleListClick = (event) => {
    const str = event.target.dataset.key
    this.resetAvailableCriptos();
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
      const keys = this.state.criptoData.map(entry => entry.id)
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
      this.resetAvailableCriptos();
    }

  }

  fetchCriptoData = async (str) => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${str}`)
    const json = await res.json()
    
    this.setState({criptoData: this.state.criptoData.concat(json.data)})

    /* TODO: Handle the live update with one socket
    TODO: Handle the back button keeping the criptoData updated (the logic here needs adjustment) */
    this.connectToWS()
    
  }

  handlePricesUpdateCB = (prices) => {
    // Update prices on each coin of the table
    const data = JSON.parse(prices)
    let newCriptoDataState = this.state.criptoData.slice(0);
    
    Object.entries(data).forEach(([id, price]) => {
      let indexFound = newCriptoDataState.findIndex(el => el.id === id)
      let oldPrice = parseFloat(newCriptoDataState[indexFound].priceUsd)
      let newPrice = parseFloat(price)
      
      newCriptoDataState[indexFound].priceUsd = price
      newCriptoDataState[indexFound].increasing = oldPrice < newPrice
      
    });

    this.setState({criptoData: newCriptoDataState});
    
  }
  connectToWS() {
    const loadedKeys = this.state.criptoData.map(entry => entry.id).join()
    const webSocketURL = `wss://ws.coincap.io/prices?assets=${loadedKeys}`
    
    WebSocketClass.connectToWs(webSocketURL, this.handlePricesUpdateCB)

  }
  
  handleChange(event) {
    this.fetchData(event.target.value);
  }

  render() {
    return (
      <Layout>
      <h1>Criptovalues App</h1>
      <button onClick={WebSocketClass.closeWs}>Disconnect WS</button>
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
    <MainTable criptoData={this.state.criptoData} sort={this.state.sortBy} sortByRank={this.sortByRankClick} />}
      </Layout>
    );
  }
}

export default IndexPage;