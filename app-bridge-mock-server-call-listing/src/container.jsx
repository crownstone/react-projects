'use strict';

let styles = {
  input: {
    width: 450,
    height: 35,
    padding: 5,
    borderRadius: 5,
    borderColor: '#eee',
    borderWidth: 1
  },
  warningButton: {
    width: 450,
    height: 35,
    padding: 5,
    borderRadius: 5,
    borderColor: '#9b601d',
    borderWidth: 2,
    backgroundColor:"#ff9c2c"
  }
}
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': null,
};

let pathPrefix = "http://127.0.0.1:3100/";

// let testData = {"pending":{"dfa4c14-85ec-6e8-8d87-9fcf428030b4":{"function":"setKeySets","args":[[{"adminKey":"0af563936e7bc5f799e480cf8035356e","memberKey":"56232deeb8f42dc08cc148f46093bdc1","basicKey":"2e66046a68b3251066f7cd4f21dbf6bd","localizationKey":"6e68bbf277f29be2d286e260667686b3","serviceDataKey":"0ca97b1b5522a3618039cd36edcaea0e","referenceId":"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19","iBeaconUuid":"fb0ae746-01a3-4ae1-aa25-2413bdcaf120"}]],"tStart":1645196131551,"tEnd":null},"7c65ec1b-78b3-7c7e-3d91-5fdaba13edbd":{"function":"setKeySets","args":[[{"adminKey":"0af563936e7bc5f799e480cf8035356e","memberKey":"56232deeb8f42dc08cc148f46093bdc1","basicKey":"2e66046a68b3251066f7cd4f21dbf6bd","localizationKey":"6e68bbf277f29be2d286e260667686b3","serviceDataKey":"0ca97b1b5522a3618039cd36edcaea0e","referenceId":"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19","iBeaconUuid":"fb0ae746-01a3-4ae1-aa25-2413bdcaf120"}]],"tStart":1645196131711,"tEnd":null}},"finished":{"1bd19abf-cc38-eec5-d6df-35c956dc9b24":{"function":"canUseDynamicBackgroundBroadcasts","args":[],"tStart":1645196125878,"tEnd":1645196125878,"autoResolve":true},"2e8672f5-4e54-b06b-173a-8c699e1ccebe":{"function":"requestLocation","args":[],"tStart":1645196125913,"tEnd":1645196125916,"autoResolve":true},"bb6cac86-6f03-4e27-53f2-ae8a5f426c1b":{"function":"clearTrackedBeacons","args":[],"tStart":1645196129296,"tEnd":1645196129298,"autoResolve":true},"4abeef2f-af68-d558-4758-a3ff4814ee6":{"function":"isReady","args":[],"tStart":1645196129317,"tEnd":1645196129317,"autoResolve":true},"65d0bf9a-d280-c1f9-4061-fdb4f721d0c9":{"function":"clearFingerprintsPromise","args":[],"tStart":1645196129367,"tEnd":1645196129367,"autoResolve":true},"a919b435-9857-9266-d94b-766ccacbbad0":{"function":"isPeripheralReady","args":[],"tStart":1645196131567,"tEnd":1645196131567,"autoResolve":true},"336672d5-a20a-f00c-326e-d65c105d51ba":{"function":"clearTrackedBeacons","args":[],"tStart":1645196131569,"tEnd":1645196131569,"autoResolve":true},"c4e72878-da74-4589-505f-3563bb34b85b":{"function":"isReady","args":[],"tStart":1645196131572,"tEnd":1645196131572,"autoResolve":true},"a9e39895-113c-5435-9b46-7f6429979425":{"function":"isReady","args":[],"tStart":1645196131578,"tEnd":1645196131578,"autoResolve":true},"8652413b-cfd0-d755-b613-31ffe050ef06":{"function":"clearFingerprintsPromise","args":[],"tStart":1645196131583,"tEnd":1645196131583,"autoResolve":true}},"bluenet":[{"function":"batterySaving","args":[true],"tCalled":1645195042021},{"function":"batterySaving","args":[false],"tStart":1645195192151},{"function":"enableLoggingToFile","args":[true],"tStart":1645195192151},{"function":"requestLocationPermission","args":[],"tStart":1645195193361},{"function":"trackIBeacon","args":["ed28687c-47f9-4452-be69-0e312f047766","a965d911-f028-2cf1-d7d9-1954a1f6d99e"],"tStart":1645195193367},{"function":"startIndoorLocalization","args":[],"tStart":1645195193367},{"function":"requestBleState","args":[],"tStart":1645195195623},{"function":"setCrownstoneNames","args":[{"a965d911-f028-2cf1-d7d9-1954a1f6d99e":{}}],"tStart":1645195195623},{"function":"enableLoggingToFile","args":[true],"tStart":1645195195624},{"function":"batterySaving","args":[false],"tStart":1645195195624},{"function":"initBroadcasting","args":[],"tStart":1645195195626},{"function":"requestLocationPermission","args":[],"tStart":1645195195627},{"function":"startScanningForCrownstonesUniqueOnly","args":[],"tStart":1645195195638},{"function":"startAdvertising","args":[],"tStart":1645195195641},{"function":"setLocationState","args":[48,0,0,0,"a965d911-f028-2cf1-d7d9-1954a1f6d99e"],"tStart":1645195195642},{"function":"setDevicePreferences","args":[0,false,false,5393572,false],"tStart":1645195195643},{"function":"trackIBeacon","args":["ed28687c-47f9-4452-be69-0e312f047766","a965d911-f028-2cf1-d7d9-1954a1f6d99e"],"tStart":1645195195646},{"function":"startIndoorLocalization","args":[],"tStart":1645195195648},{"function":"setLocationState","args":[48,0,0,0,"a965d911-f028-2cf1-d7d9-1954a1f6d99e"],"tStart":1645195195720},{"function":"setDevicePreferences","args":[0,false,false,0,false],"tStart":1645195796737},{"function":"batterySaving","args":[true],"tStart":1645196095690},{"function":"batterySaving","args":[false],"tStart":1645196127969},{"function":"enableLoggingToFile","args":[true],"tStart":1645196127973},{"function":"requestLocationPermission","args":[],"tStart":1645196129292},{"function":"trackIBeacon","args":["fb0ae746-01a3-4ae1-aa25-2413bdcaf120","d8094738-9cb1-8f7a-cdeb-5e5b3098bb19"],"tStart":1645196129299},{"function":"startIndoorLocalization","args":[],"tStart":1645196129301},{"function":"setCrownstoneNames","args":[{"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19":{}}],"tStart":1645196131552},{"function":"requestBleState","args":[],"tStart":1645196131552},{"function":"enableLoggingToFile","args":[true],"tStart":1645196131553},{"function":"initBroadcasting","args":[],"tStart":1645196131556},{"function":"requestLocationPermission","args":[],"tStart":1645196131556},{"function":"batterySaving","args":[false],"tStart":1645196131554},{"function":"setLocationState","args":[215,0,0,0,"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19"],"tStart":1645196131570},{"function":"startAdvertising","args":[],"tStart":1645196131569},{"function":"setDevicePreferences","args":[0,false,false,16700918,false],"tStart":1645196131571},{"function":"trackIBeacon","args":["fb0ae746-01a3-4ae1-aa25-2413bdcaf120","d8094738-9cb1-8f7a-cdeb-5e5b3098bb19"],"tStart":1645196131573},{"function":"startIndoorLocalization","args":[],"tStart":1645196131574},{"function":"startScanningForCrownstonesUniqueOnly","args":[],"tStart":1645196131576},{"function":"setLocationState","args":[215,0,0,0,"d8094738-9cb1-8f7a-cdeb-5e5b3098bb19"],"tStart":1645196131698}]}

class BluenetCallListing extends React.Component {

  pending  = [];
  finished = [];
  bluenet  = [];
  eventSource;

  updating = false;
  updatePending = false;

  constructor(props) {
    super(props);
    this.state = {loaded:false};
    // this.processData(testData)
  }

  openEvenSource() {
    this.eventSource = new EventSource("http://localhost:3100/sse");
    this.eventSource.addEventListener('open', (event) => {
      console.log("Opened SSE connection to bridge mock server.")
      this.update();
    });
    this.eventSource.addEventListener('message', (event) => {
      console.log("Incoming SSE:", event);
      if (event && event.data) {
        let message = JSON.parse(event.data);
        if (message.type === "callAdded") {
          this.update();
        }
      }
    });
    this.eventSource.addEventListener('error', (error) => {
      console.log("Error with SSE connection", error)
      this.eventSource.close();
      setTimeout(() => {
        console.log("Retrying SSE connection...")
        this.openEvenSource();
      }, 1000)
    });
  }

  componentDidMount() {
    this.openEvenSource();
  }

  update() {
    if (this.updating === true) {
      this.updatePending = true;
      return;
    }

    this.updatePending = false;
    this.updating = true;

    window.fetch(`${pathPrefix}calls`,{method:"GET", headers: defaultHeaders})
      .then((data) => {
        return data.json();
      })
      .then((result) => {
        console.log("gotsy Data", result)
        this.processData(result);
        if (this.state.loaded === false) {
          this.setState({loaded:true});
        }
      })
      .catch((err) => {
        console.log("Err", err);
      })
      .then(() => {
        this.updating = false;
        if (this.updatePending) { this.update(); }
      })
  }

  processData(data) {
    let pending  = [];
    let finished = [];

    for (let id in data.pending)   {  pending.push({id, ...data.pending[id]}); }
    for (let id in data.finished)  {  finished.push({id, finished: true, type: 'promise', ...data.finished[id]}); }
    for (let item of data.bluenet) {  finished.push({finished: true, type: 'direct', ...item}) };

    pending.sort( (a,b) => { return b.tStart - a.tStart; });
    finished.sort((a,b) => { return b.tStart - a.tStart; });

    this.pending  = pending;
    this.finished = finished;

    this.forceUpdate()
  }

  drawLists(list) {
    let result = [];
    let even = false;
    for (let item of list) {
      result.push(
        <PromiseCallListing
          key={`${item.function}${item.tStart}`}
          {...item}
          update={() => { this.update(); }}
          even={even}
        />
      );
      even = !even;
    }
    return result;
  }


  render() {
    return (
      <div style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
        <h1>Bluenet Promise Calls</h1>
        <br />
        <PromiseCallListingLegend />
        { this.state.loaded === false && <h3>Loading...</h3> }
        { this.drawLists(this.pending) }
        <br />
        { this.finished.length > 0 && <h3>Finished tasks:</h3> }
        { this.drawLists(this.finished) }
      </div>
    );
  }
}


class PromiseCallListingLegend extends React.Component {

  render() {
    let textStyle = { fontWeight: 'bold', color:'#fff'}
    let padding = 10;

    return (
      <div style={{display:'flex', flexDirection:'row', backgroundColor: '#21a4a4', borderRadius: 10}}>
        <div style={{display:'flex', padding: padding, width: 300, ...textStyle}}>
          function
        </div>
        <div style={{display:'flex', width: 800, padding: padding, ...textStyle}}>
          arguments[]
        </div>
        <div style={{display:'flex', padding: padding, width: 100, ...textStyle}}>
          start
        </div>
        <div style={{display:'flex', padding: padding, width: 100, ...textStyle}}>
          finished
        </div>
        <div style={{display:'flex', padding: padding, width: 100, ...textStyle}}>
          control
        </div>
      </div>
    );
  }
}


class PromiseCallListing extends React.Component {

  constructor(props) {
    super(props);

    this.state = {height: 40, expanded: false}
  }

  resolve(id) {
    window.fetch(`${pathPrefix}successById`,{method:"POST", headers: defaultHeaders, body: JSON.stringify({
        id: id, data: null
      })})
      .then((result) => {
        this.props.update();
      })
      .catch((err) => {
        console.log("Err", err);
      })
  }

  expand() {
    if (this.state.expanded) {
      this.setState({height:40, expanded: false})
      return;
    }

    let args = JSON.stringify(this.props.args);
    if (args.length > 95) {
      let prettyArgs = JSON.stringify(this.props.args,null,2);
      let lines = prettyArgs.match(/\n/g).length;
      this.setState({expanded: true, height: 40 + 20*lines})
    }
  }

  render() {
    let textStyle = this.props.header ? { fontWeight: 'bold', color:'#fff'} : { color:"#000" };
    if (this.props.autoResolve !== false && this.props.tEnd) {
      textStyle.fontStyle = 'italic'
    }
    let padding = 10;
    let button = <button onClick={() => { this.resolve(this.props.id) }} style={{margin:0, width: 80}}>Resolve</button>;
    let args = JSON.stringify(this.props.args);
    let usedArgs = args;
    let length = 95;
    if (args.length > length) {
      usedArgs = usedArgs.substring(0, length) + "..."
    }

    return (
      <div style={{display:'flex', height: this.state.height, flexDirection:'row', backgroundColor: this.props.backgroundColor || (this.props.even ? '#cbe5e5' : "#fff"), borderRadius: 10}}>
        <div style={{display:'flex', padding: padding, width: 300, ...textStyle}}>
          {this.props.function}
        </div>
        <div style={{display:'flex', width: 800, padding: padding, whiteSpace: this.state.expanded ? 'pre' : undefined, ...textStyle}} onClick={() => { this.expand(); }}>
          {this.state.expanded ? JSON.stringify(this.props.args,null,2) : usedArgs}
        </div>
        <div style={{display:'flex', padding: padding, width: 100, ...textStyle}}>
          {new Date(this.props.tStart).toLocaleTimeString()}
        </div>
        <div style={{display:'flex', padding: padding, width: 100, ...textStyle}}>
          {
            this.props.finished ?
              this.props.tEnd && new Date(this.props.tEnd).toLocaleTimeString() : "pending"
          }
        </div>
        <div style={{display:'flex', padding: 6, width: 100, ...textStyle}}>
          {
            this.props.finished ?
              this.props.type : button
          }
        </div>
      </div>
    );
  }
}


let domContainer = document.querySelector('#management_container');
ReactDOM.render(<BluenetCallListing />, domContainer);