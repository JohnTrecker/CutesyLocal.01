var React = require('react');
var ReactDOM = require('react-dom')

var Main = React.createClass({
  render: function(){
    return (
      <img class="logo" src="../assets/logo.png"/>
    )
  }
});

ReactDOM.render(<Main />, document.getElementById('app'));