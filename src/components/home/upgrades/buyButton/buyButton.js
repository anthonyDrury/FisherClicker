import React from "react";

class BuyButton extends React.Component {
  handleClick = () => {
    this.props.buyUpgradeFish(this.props.value, this.props.index);
  };

  render() {
    return (
      <span className="upgradeElement__curserWrap">
        <button onClick={this.handleClick} className="upgradeElement__btn">
          Hire
        </button>
      </span>
    );
  }
}

export default BuyButton;
