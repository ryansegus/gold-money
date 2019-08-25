import Layout from '../../components/MyLayout';
import WebSocketClass from './../../shared/WebSocketClass';
import { getDetails } from './../../shared/DetailCriptoClass';
// import { getDaysBefore } from './../../shared/SortFunctions'; To implement later on
import { Line } from 'react-chartjs-2';

// components
import InputCalendar from './../../components/InputCalendar';
import InputRadioButtons from './../../components/InputRadioButtons';

const radioButtons = ['day', 'week', 'year'];
const defaultStyleUl = {
  display: 'flex',
  listStyle: 'none',
  margin: '0 0 20px',
  padding: 0
};
const defaultStyleLi = {
  flex: 1,
  fontSize: 11,
  padding: 10,
  border: '1px dotted lightgray'
};

const chartConfig = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
}

class CriptoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: this.props.json.data.map(entry => new Date(entry.time).toLocaleDateString("en-US")),
        datasets: [{
          ...{label: this.props.url.query['id']},
          ...chartConfig,
          ...{data: this.props.json.data.map(entry => entry.priceUsd)}
        }]
      }
    }
  }
  
  updatePricesAndLabels = (json) => {
    const newChartData = {
      labels: json.data.map(entry => new Date(entry.time).toLocaleDateString("en-US")),
      datasets: [{
        ...{label: this.props.url.query['id']},
        ...chartConfig,
        ...{data: json.data.map(entry => entry.priceUsd)}
      }]
    }
    // const newPrices = prices.data.map(entry => entry.priceUsd)
    // console.log(newPrices)
    this.setState({chartData: newChartData})
  }

  updateDetailsState = (e) => {
  
    const daysBefore = (n) => (24*60*60*1000) * n;
    const id = e.target.dataset.pageId;
    let interval = e.target.value;
    let end = null;
    let start = null;
    switch (interval) {
      case 'day':
        interval = 'm30';
        end = Date.now();
        start = Date.now() - daysBefore(1);
        break;
      case 'week':
        interval = 'h6';
        end = Date.now();
        start = Date.now() - daysBefore(28);
        break;
      case 'year':
        interval = 'd1';
        end = Date.now();
        start = Date.now() - daysBefore(365 * 3);
        break;
      default:
        interval = 'd1';
        end = Date.now();
        start = Date.now() - daysBefore(5);
    }
    
    getDetails({id, interval, start, end, isUpdate:true})
    .then((json) => {
      this.updatePricesAndLabels(json)
    })
    .catch(function(error){
      console.log(`No way JOSE ${error}`)
    })

  }

  render(){
    return (
    <Layout>
      <h1>{this.props.url.query['id']}</h1>
      <h2>Advance Search</h2>
      <h3>This Doesn't Work Yet :)</h3>
      <div className='l-dateInputs'>
        <InputCalendar id={'startDate'} label={'Start Date'} containerClass={'l-dateInputs__item'}/>
        <InputCalendar id={'endDate'} label={'End Date'} containerClass={'l-dateInputs__item'}/>
      </div>
      <h3>This Works :)</h3>
      <div className='l-radioInputs'>
        {
          radioButtons.map((input) => {
            return (
              <InputRadioButtons
              key={input}
              id={input}
              label={`by ${input}`}
              name='interval'
              containerClass={'l-radioInputs__item'}
              pageId={this.props.url.query['id']}
              value={input}
              onChangeRadio={this.updateDetailsState}/>
            )
          }
        )}
      </div>
      <h3>Todo</h3>
      <ul style={defaultStyleUl}>
        <li style={defaultStyleLi}>TODO: Prezzo più alto</li>
        <li style={defaultStyleLi}>TODO: prezzo più basso</li>
        <li style={defaultStyleLi}>TODO: prezzo medio</li>
        <li style={defaultStyleLi}>TODO: percentuale di cambio</li>
      </ul>
      <Line data={this.state.chartData} />
      <style jsx global>{`

    .l-dateInputs, .l-radioInputs {
        display: flex;
        margin-bottom: 20px; 
    }
    .l-dateInputs__item, .l-radioInputs__item {
      flex:1;
    }

`}</style>
    </Layout>
  )}
  
};

CriptoDetails.getInitialProps = function (context) {
    WebSocketClass.pricesWs.readyState === 1 && WebSocketClass.pricesWs.close(1000, "Landing on another page")

    const {id} = context.query;
    /* 
      Use moment.js for this and create two date fields to generate new ranges
      or a nice slider.
      Then create a nice set of radio buttons to select the period (1 giorno, 1 settimana, 1 anno)
    */
    let end = Date.now();
    const daysBefore = (24*60*60*1000) * 14;
    let start = Date.now() - daysBefore;
    const interval = 'd1'
    
    return getDetails({id, interval, start, end});

};

export default CriptoDetails;