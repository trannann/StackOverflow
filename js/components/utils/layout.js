import React from 'react';

import Header from './header';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
          <Header></Header>
          <div className="container">{this.props.children}</div>
      </div>
    );
  }
}