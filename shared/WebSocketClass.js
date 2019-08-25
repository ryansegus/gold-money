
export default class WebSocketClass {
  /* I am not really sure how to Update the request URL,
  I tried using the send() method but it keeps sending the
  first data... needs further investigation and Learnig, so,
  I will for now close the conection and reopen a new one
  with new parameters  */
  static pricesWs = []
  static connectToWs = (webSocketURL, handleUpdateCB) => {
    if ("WebSocket" in window) {
      // Check is WS it's already conected
      WebSocketClass.pricesWs.readyState === 1 && WebSocketClass.pricesWs.close(1000, "Need new URL request")
      // Create a new WS connection
      WebSocketClass.pricesWs = new WebSocket(webSocketURL);

      WebSocketClass.pricesWs.onopen = function () {
        console.log(`conected: ${WebSocketClass.pricesWs.readyState}`)
      }
      WebSocketClass.pricesWs.onmessage = function (msg) {
        handleUpdateCB(msg.data);
      }
      WebSocketClass.pricesWs.error = function (e) {
        console.log(e)
      }
      WebSocketClass.pricesWs.onclose = function () {
        console.log(`Closing the WS`)
      }
    } else {
      // The browser doesn't support WebSocket
      console.log('Create some kind of div with a message here.')
    }
  }
  static closeWs = () => {
    WebSocketClass.pricesWs.close()
  }
  /* I would like to use some kind of update here */
  static updareWs = () => {
    console.log(WebSocketClass.pricesWs.url)
    const data = {
      assets: 'bitcoin'
    }
    const json = JSON.stringify(data);
    WebSocketClass.pricesWs.send(json)
  }
}