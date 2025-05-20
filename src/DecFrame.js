import React from 'react';
import axios from 'axios';

const divStyle = {
  color: 'blue',
  height: '800px'
};

function doLogin(component) {
    console.log('try logging in');
        if (!component.state.loginToken) {
            console.log("calling login method.");
            axios.get(`http://localhost:8080/Primary/REST/AccountService/LoginUser?outputType=JSON&userId=heath@decisions.com&password=admin`).then((res)=> {
                component.setState( { 
                    loginToken: res.data.LoginUserResult.SessionValue, 
                    frameUrl: "http://localhost:8080/Primary/projects?FolderId=PROJECTS&pageName=Projects&sessionId=" + res.data.LoginUserResult.SessionValue,
                    urlKey: Math.random()
                });
            });
        }
}

function doLogout(component) {

    const config = {
        headers: {
            Authorization: `Session ` + component.state.loginToken,
        }
    };

    console.log('attempting logout.');
            axios.post(`http://localhost:8080/Primary/REST/AccountService/Logout?sessionid=` + component.state.loginToken,
                JSON.stringify({ 
                    context: { SessionValue: component.state.loginToken },
                    outputType: "Json"
                 }), config 
            ).then(function (response) {
                // Clear the session id and reload the iframe if present.
                component.setState( {
                    loginToken: "", 
                    frameUrl: "http://localhost:8080/",
                    urlKey: Math.random()
                }

                );
                alert('Logout ok.');
                console.log(response);
            })
            .catch(function (error) {
                alert('logout failed, please check the console for details.')
                console.log(error);
            });
}

function toggleContent(elementName) {
    var ele = document.getElementById(elementName);
    if (ele.hidden === false) {
        ele.hidden = true;
        return;
    }
    if (ele.hidden === true) {
        ele.hidden = false;
    }
}

const loginSample = `     console.log("calling login method.");
            axios.get("http://localhost:8080/Primary/REST/AccountService/LoginUser?outputType=JSON&userId=heath@decisions.com&password=admin").then((res)=> {
                component.setState( { 
                    loginToken: res.data.LoginUserResult.SessionValue, 
                    frameUrl: "http://localhost:8080/Primary/projects?FolderId=PROJECTS&pageName=Projects&sessionId=" + res.data.LoginUserResult.SessionValue,
                    urlKey: Math.random()
                });
            });`;

const logoutSample = `
            axios.post("http://localhost:8080/Primary/REST/AccountService/Logout?sessionid=" + component.state.loginToken,
                JSON.stringify({ 
                    context: { SessionValue: component.state.loginToken },
                    outputType: "Json"
                 }), config 
            ).then(function (response) {
                // Clear the session id and reload the iframe if present.
                component.setState( {
                    loginToken: "", 
                    frameUrl: "http://localhost:8080/",
                    urlKey: Math.random()
                }

                );
                alert('Logout ok.');
                console.log(response);
            })
            .catch(function (error) {
                alert('logout failed, please check the console for details.')
                console.log(error);
            });`;

class DecFrame extends React.Component {

  state = { loginToken: '', frameUrl: 'http://localhost:8080', urlKey: 1 }

  render() {
    return <div>
             <div style={ divStyle }>
                <div>This page shows Decisions in an iFrame and has the containing application call the Decisions core services to log the user in, log the user out and refresh the frame.  This works by
                    <ul>
                        <li>Calling the AccountService, Login method and getting a session id.</li>
                        <li>Setting the iFrame URL to include session id so that the iFrame session can be established.</li>
                    </ul>
                </div>
                <button onClick={ () => doLogin(this) }>Login</button><br/><br/>
                <button type="button" className="infobutton" onClick={ () => { toggleContent("loginCode"); } }>Click To View Javascript Login Code</button>
                <div id="loginCode" className="content" hidden="true">
                    <pre> <code>{ loginSample }</code></pre>
                </div><br/>
                <span>Current Session: { this.state.loginToken } </span><br/>
                <iframe title="test" height="100%" width="90%" key={ this.state.urlKey } src={ this.state.frameUrl }></iframe>
                <br/> <button onClick={ () => doLogout( this ) }>Logout</button>
                <br/><br/>
                <div>Logout occurs the opposite way, by
                    <ul>
                        <li>Calling the AccountService, Logout method using the session id.</li>
                        <li>Setting the iFrame URL to force a refresh so the session is invalidated.</li>
                    </ul>
                </div>
                <button type="button" className="infobutton" onClick={ () => { toggleContent("logoutCode"); } }>Click To View Javascript Logout Code</button>
                <div id="logoutCode" className="content" hidden="true">
                    <pre> <code>{ logoutSample }</code></pre>
                </div>
                <div className="footer">&nbsp;</div>
            </div>
        </div>;
  }
}

export default DecFrame;