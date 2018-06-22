const root = document.getElementById('hello-pwa');

class HelloPWA extends React.Component {
  render() {
    return <h1>Hello Progressive Web App</h1>;
  }
}

ReactDOM.render(<HelloPWA />, root);
