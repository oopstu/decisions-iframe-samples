// Help.js
    
const helpStyle = {
  color: 'blue',
  margin: '10px'
};
    
const settingsXml = `<CustomHeaders>
    <CustomHeader>
      <Name>Content-Security-Policy</Name>
      <Value>frame-ancestors 'self' http://localhost:3000;</Value>
    </CustomHeader>
   <CustomHeader>
      <Name>Access-Control-Allow-Origin</Name>
      <Value>http://localhost:3000</Value>
    </CustomHeader>
    <CustomHeader>
      <Name>Access-Control-Allow-Headers</Name>
      <Value>Origin, X-Requested-With, Content-Type, Accept, Authorization</Value>
    </CustomHeader>
</CustomHeaders>`;

function Help() {
      return (
        <div style={ helpStyle }>
          <h1>Help and Info</h1><br/>
          <div>
            <p>If you are seeing CORS errors in your browser console, you need to ensure that the DECISIONS SERVER that you are embedding has the following CustomHeaders set in Settings.xml</p>
            <p>Please Note: These settings go in Settings.xml and Decisions will require a restart.</p>
            <p>You can read more about Decisions and CORS here: <a href="https://documentation.decisions.com/docs/handling-cross-origin-requests" target="_blank">Decisions Documentation on CORS</a></p>
            <pre><code>{ settingsXml }</code></pre>
          </div>
        </div>
      );
    }
    
    export default Help;