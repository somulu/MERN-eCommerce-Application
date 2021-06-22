import React from 'react';

class App extends React.Component {
  handleClick = () => {
    console.log('Hi there, user!');
    window.redirect('https://www.google.com');
  };

  render() {
    return (
      <div onClick={() => this.handleClick()}>
        <a onClick={() => this.handleClick()}>
          <p>Click this text to see the event bubbling</p>
        </a>
                       {' '}
        <button onClick={() => this.handleClick()}>Click me</button>     {' '}
      </div>
    );
  }
}

export default App;
