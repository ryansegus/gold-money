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
      criptoData: [],
      availableCriptos: [],
      sortBy: 'name-asc',
      sortOrderUp: true
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

  setArrowClasses(target, arrow) {
    /* This is a good start, we need to add some logic like when the array < 2  */
    if (arrow === '-up') {
      target.classList.remove('-down')
      target.classList.add('-up')
      
    } else {
      target.classList.remove('-up')
      target.classList.add('-down')
    }
  }

  sortByRank = (e, sortBy) => {
    const criptoData = this.state.criptoData
    this.setState({sortOrderUp: this.state.sortOrderUp = !this.state.sortOrderUp})
    
    const sortedCriptoData = criptoData.sort((a,b) => 
    this.state.sortOrderUp ? a.rank-b.rank : b.rank-a.rank
    )

    this.state.sortOrderUp ? this.setArrowClasses(e.target, '-up') : this.setArrowClasses(e.target, '-down')

    this.updateStateSorting(sortedCriptoData, sortBy)
  }

  resetAvailableCriptos = () => {
    this.setState({availableCriptos: []});
  }
  
  handleListClick = (event) => {
    const str = event.target.dataset.key
    this.resetAvailableCriptos();
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
    
    this.setState({criptoData: this.state.criptoData.concat(json.data)})
    
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
    <MainTable criptoData={this.state.criptoData} sort={this.state.sortBy} sortByRank={this.sortByRankClick} />}
      </Layout>
    );
  }
}

export default IndexPage;