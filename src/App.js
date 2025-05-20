import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Help from './Help';
import IFrameSampleApp from './IFrameSampleApp';

const headerTitle = {
  fontSize: 'larger',
  fontWeight: 'bold'
};
const navStyle = {
  color: 'white',
  padding: '5px',
  background: 'black'
};
const linkStyle = {
  color: 'white'
}

// Code to make collapsible sections in the test application.
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
// end collapse code bcan be used on any component because it's in the App.

function App() {
  
  return (
     <Router>
          <div>
            <div style={ navStyle }>
              <span style={ headerTitle }>Decisions Testing App</span>
            <nav>
              <ul>
                <li>
                  <Link to="/" ><span style={ linkStyle }>iFrame Sample Page</span></Link>
                </li>
                <li>
                  <Link to="/settingshelp"><span style={ linkStyle }>CORS HELP!</span></Link>
                </li>
              </ul>
            </nav>
            </div>
            <hr/>
    
            <Routes>
              <Route path="/" element={<IFrameSampleApp />} />
              <Route path="/settingshelp" element={<Help />} />
            </Routes>
          </div>
        </Router>


  );
}

export default App;