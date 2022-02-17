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

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setInterval(() => {
      window.fetch(`${pathPrefix}calls`,{method:"GET", headers: defaultHeaders})
        .then((data) => {
          return data.json();
        })
        .then((result) => {
          console.log('result',result);
          this.processData(result);
        })
        .catch((err) => {
          console.log("Err", err);
        })
    }, 1500)
  }

  processData(data) {
    let pending  = Object.values(data.pending);
    let finished = Object.values(data.finished);

    pending.sort((a,b) => { return a.tStart - b.tStart; })
    finished.sort((a,b) => { return a.tStart - b.tStart; })

    this.pending  = pending;
    this.finished = finished;

    this.forceUpdate()
  }

  drawLists(list) {
    let result = [];
    let even = false;
    for (let item of list) {
      result.push(<CallListing
        key={`${item.function}${item.tStart}`}
        function={item.function}
        args={item.args}
        tStart={item.tStart}
        tEnd={item.tEnd}
        even={even}
      />);
      even = !even;
    }
    return result;
  }

  render() {
    return (
      <div style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
        <h1>Bluenet Promise Calls</h1>
        <br />
        <CallListing
          header={true}
          backgroundColor={'#21a4a4'}
          function={'function'}
          args={["handle","arguments"]}
          tStart={'start'}
          tEnd={'end'}
        />
        { this.drawLists(this.pending) }
        <br />
        { this.drawLists(this.finished) }
      </div>
    );
  }
}


class CallListing extends React.Component {

  render() {
    let textStyle = this.props.header ? { fontWeight: 'bold', color:'#fff'} : { color:"#000" };
    let padding = 10;

    return (
      <div style={{display:'flex', flexDirection:'row', backgroundColor: this.props.backgroundColor || (this.props.even ? '#cbe5e5' : "#fff"), borderRadius: 10}}>
        <div style={{display:'flex', padding: padding, width: 200, ...textStyle}}>
          {this.props.function}
        </div>
        <div style={{display:'flex', padding: padding, width: 250, ...textStyle}}>
          {this.props.args[0] ? this.props.args[0] : ''}
        </div>
        <div style={{display:'flex', width: 500, padding: padding, ...textStyle}}>
          {JSON.stringify(this.props.args.slice(1))}
        </div>
        <div style={{display:'flex', padding: padding, width: 200, ...textStyle}}>
          { typeof this.props.tStart == 'string' ? this.props.tStart : new Date(this.props.tStart).toISOString() }
        </div>
        <div style={{display:'flex', padding: padding, width: 200, ...textStyle}}>
          { typeof this.props.tStart == 'string' ? this.props.tEnd : (this.props.tEnd ? new Date(this.props.tEnd).toISOString() : "pending") }
        </div>
      </div>
    );
  }

}



let domContainer = document.querySelector('#management_container');
ReactDOM.render(<BluenetCallListing />, domContainer);