import React from "react";

class BuyButton extends React.Component {
  handleClick = () => {
    this.props.buyUpgrade(this.props.value, this.props.index);
  };

  render() {
    return (
      <button onClick={this.handleClick} className="upgradeElement__btn">
        <i class="fas fa-user-plus"></i>
      </button>
    );
  }
}

export default BuyButton;
