import fetch from 'isomorphic-unfetch';
import { updateDetailsState } from './../pages/cripto-details/[id].js'

export const getDetails = async ({...args}) => {
  /* 
    Use moment.js for this and create two date fields to generate new ranges
    or a nice slider.
    Then create a nice set of radio buttons to select the period (1 giorno, 1 settimana, 1 anno)
  */
  const res = await fetch(`https://api.coincap.io/v2/assets/${args.id}/history?interval=${args.interval}&start=${args.start}&end=${args.end}`);
  const json = await res.json();
  
  return args.isUpdate ? json : {json}
}

export const onChangeRadio = (e) => {
  // To implement with a global state
  /* console.log(e.target)
  console.log(e.target.value)

  var interval = e.target.value;
  switch (interval) {
    case 'day':
      interval = 'm30';
      break;
    case 'week':
      interval = 'h6';
      break;
    case 'year':
      interval = 'd1';
      break;
    default:
      interval = 'd1';
  }

  const id = e.target.dataset.pageId;
  let end = Date.now();
  const daysBefore = (24*60*60*1000) * 14;
  let start = Date.now() - daysBefore;

  console.log(id)
  console.log(interval)
  
  const newData = getDetails({id, interval, start, end});
  console.log(this.state)
  */

}