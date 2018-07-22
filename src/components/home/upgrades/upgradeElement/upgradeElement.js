import React from "react";

class UpgradeElement extends React.Component {
  handleClick = () => {
    this.props.buyUpgrade(this.props.element, this.props.element.id);
  };

  render() {
    return (
      <div className={`upgradeElement ${this.props.element.disabled}`} onClick={this.handleClick}>
        <p>
          <span className="upgradeElement__title">{this.props.element.title} </span>
          <br/>
          <span className="upgradeElement__bonus">
            +{this.props.element.perSecondBonus}
          </span>
          {" "}
          <i className={this.props.iconClass}/>
        </p>
        <p>
          $: <span className="upgradeElement__price">{this.props.element.price}</span> #:{" "}
          <span className="upgradeElement__amount">{this.props.element.amount}</span>
        </p>
        {this.props.children}
      </div>
    );
  }
}

export default UpgradeElement;
