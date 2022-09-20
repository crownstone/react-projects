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
    for (let item of data.bluenet) {  finished.push({id: item.id, finished: true, type: 'direct', ...item}) };

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
          key={`${item.id}__${item.function}${item.tStart}`}
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
    if (this.props.resolveType === 'autoResolve' && this.props.tEnd) {
      textStyle.fontStyle = 'italic'
    }
    if (this.props.resolveType === 'native' && this.props.tEnd) {
      textStyle.fontStyle  = 'italic';
      textStyle.fontWeight = 'bold';
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
