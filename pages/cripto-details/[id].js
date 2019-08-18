import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';

const CriptoDetails = props => (
  <Layout>
    {/* TODO: Add graph to show cripto history */}
    <h1>{props.url.query['id']}</h1>
    <p>{props.json.data[0].priceUsd}</p>
  </Layout>
);

CriptoDetails.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.coincap.io/v2/assets/${id}/history?interval=h1`);
  const json = await res.json();

  /*
    TODO: Organize Object to send the right data to the graph plugin 
    Could be Charts.js @ https://www.chartjs.org/
  */
  console.log(`Fetched CriptoData: ${json.data} `);

  return { json };
};

export default CriptoDetails;