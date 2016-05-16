import React, { Component, PropTypes } from 'react';

export default class Square extends Component {

  static propTypes = {
    black: PropTypes.bool
  };

  render() {
    const { black } = this.props;
    const fill = black ? '#B58863' : '#F0D9B5';

    return (
      <div style={{
        backgroundColor: fill,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );
  }
}
