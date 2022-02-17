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

let pathPrefix = "http://localhost:3050";

class UserDataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      userId: null
    };
  }

  render() {
    return (
      <div style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
        <h1>Crownstone user data management</h1>
        <br />
        {
          this.state.accessToken === null ?
            <LoginForm callback={(tokenData) => { this.setState({accessToken: tokenData.id, userId: tokenData.userId}); }} />
          :
            <UserData accessToken={this.state.accessToken} clearCallback={() => { this.setState({accessToken: null, userId: null})}} />
        }
      </div>
    );
  }

}


class UserData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: false,
      deleteCheck: false,
    };
  }

  render() {
    if (this.state.deleteCheck) {
      return (
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
          <h3>Deleting your data</h3>
          <h4>IMPORTANT! This can have severe consequences:</h4>
          <ul>
            <li>If you delete your data, you will no longer be able to log into your Crownstone app.</li>
            <li>If you delete your data, this cannot be undone.</li>
            <li>If you delete your data and there are no more people in your sphere, your sphere and Crownstones will also be removed.</li>
            <li>If your Crownstones are removed, you cannot use them without recovering them.</li>
          </ul>
          <h4>Are you sure you want to do this?</h4>
          <button style={styles.input} onClick={() => { this.setState({deleteCheck: false}) }}>No, nevermind.</button>
          <br />
          <button style={styles.warningButton} onClick={() => { this.deleteAllData() }}>Delete all my data</button>
        </div>
      );
    }


    if (this.state.downloading) {
      return (
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
          <h3>Downloading all your data....</h3>
          <img src={'../img/slow_spinner.gif'} />
          <h4>This can take up to 5 minutes...</h4>
        </div>
      );
    }

    return (
      <div style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
        <h2>What would you like to do?</h2>
        <br />
        <button style={styles.input} onClick={() => { this.downloadAllData().then(() => {
          alert('Your data has been downloaded!');
        }) }}>Download all my data</button>
        <br />
        <br />
        <h4>DANGER:</h4>
        <button style={styles.warningButton} onClick={() => { this.setState({deleteCheck: true}) }}>Delete all my data</button>
      </div>
    );
  }

  downloadAllData() {
    this.setState({downloading: true})
    fetch(`${pathPrefix}/api/user/allUserData`,{method: 'GET', headers: {'Authorization': this.props.accessToken}})
      .then((response) => {
        if (response.status !== 200) {
          alert(`Something went wrong (${response.status})`)
          this.setState({downloading: false})
        }
        else if (response.status === 429) {
          alert(`You can only do this once every 5 minutes... Try again later.`)
          this.setState({downloading: false})
        }
        else {
          return response.blob()
            .then(blob => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              // the filename you want
              a.download = 'userData.zip';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              this.setState({downloading: false})
            })
        }
      })
      .catch((err) => {
        alert('Something went wrong...');
        this.setState({downloading: false})
      });
  }

  deleteAllData() {
    if (confirm("WARNING: Are you sure you want to delete all your user data?")) {
      fetch(`${pathPrefix}/api/user?AreYouSure=I_AM_SURE`,{method: 'DELETE', headers: {'Authorization': this.props.accessToken}})
        .then((response) => {
          if (response.status !== 204) {
            alert(`Something went wrong (${response.status})`)
          }
          else {
            alert(`Delete successful.`)
            this.props.clearCallback()
          }
        })
        .catch((err) => {
          alert('Something went wrong...');
          console.log("Error deleteAllData", err)
        });
    }

  }
}


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
    };
  }

  render() {
    return (
      <form
        style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent:'center'}}
        onSubmit={(event) => { event.preventDefault(); }}
      >
        <h4>Log in here to manage your data</h4>
        <input
          style={styles.input}
          placeholder={"email"}
          value={this.state.email}
          onChange={(e) => { this.setState({email:e.target.value}); }}
        />
        <br />
        <input
          style={styles.input}
          placeholder={"password"}
          type={'password'}
          value={this.state.password}
          onChange={(e) => { this.setState({password:e.target.value}); }}
        />
        <br />
        <button style={styles.input} onClick={() => { this.login() }}>Log in</button>
      </form>
    );
  }

  login() {
    digestMessage(this.state.password)
      .then((hashedPassword) => {
        let data = {email: this.state.email, password: hashedPassword};
        return fetch(`${pathPrefix}/api/user/login`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
      })
      .then((result) => {
        if (result.status !== 200) {
          alert("Could not log in, please check your credentials and try again.")
        }
        else {
          result.json()
            .then((tokenData) => {
              this.props.callback(tokenData);
            })
        }
      })

  }
}


function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  return crypto.subtle.digest('SHA-1', msgUint8)
    .then((hashBuffer) => {
      // hash the message
      const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
      return hashHex;
    })
}


let domContainer = document.querySelector('#management_container');
ReactDOM.render(<UserDataContainer />, domContainer);