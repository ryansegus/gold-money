import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import WebSocketClass from './../../shared/WebSocketClass';
// import { getDaysBefore } from './../../shared/SortFunctions'; To implement later on
import { Line } from 'react-chartjs-2';

const CriptoDetails = props => {
  
  const times = props.json.data.map(entry => new Date(entry.time).toLocaleDateString("en-US"))
  const prices = props.json.data.map(entry => entry.priceUsd)

  const data = {
    labels: times,
  datasets: [
    {
      label: props.url.query['id'],
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
      data: prices
    }
  ]
  };
  return (
    <Layout>
    <h1>{props.url.query['id']}</h1>
    <Line data={data} />
  </Layout>
  )
};

CriptoDetails.getInitialProps = async function (context) {
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
    
    const res = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=d1&start=${start}&end=${end}`);
    const json = await res.json();
    return {json};

};

export default CriptoDetails;