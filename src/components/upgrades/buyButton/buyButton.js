import React from "react";

class BuyButton extends React.Component {
  handleClick = () => {
    this.props.buyUpgrade(this.props.value, this.props.index);
  };

  render() {
    return <button onClick={this.handleClick}>Buy</button>;
  }
}

export default BuyButton;
