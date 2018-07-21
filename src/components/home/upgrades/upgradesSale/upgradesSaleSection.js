import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../../../actions/scoreActions";
import * as upgradesSaleActions from "../../../../actions/upgradesSaleActions";
import BuyButton from "../buyButton/buyButton";
import UpgradeElement from "../upgradeElement/upgradeElement";
import "../upgradesSection.scss";

class upgradesSaleSection extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      disabledClass: ""
    };

    this.buyUpgradeSale = this.buyUpgradeSale.bind(this);
    this.displayupgradesSale = this.displayupgradesSale.bind(this);
  }

  /* Purchases UpgradeSale if user has enough points,
     Sets new total score minus price of upgrade,
     adds to the per second total score,
     sets upgrade to disabled if not enough points */
  buyUpgradeSale(element, index) {
    if (this.props.score.totalValue >= this.props.upgradesSale[index].price) {
      let newScore = this.props.score;
      newScore.totalValue = newScore.totalValue - this.props.upgradesSale[index].price;
      newScore.tpsSale += this.props.upgradesSale[index].perSecondBonus;

      let newUpgradesSale = this.props.upgradesSale[index];
      newUpgradesSale.amount++;
      newUpgradesSale.price = newUpgradesSale.initialPrice * newUpgradesSale.amount;
      newUpgradesSale.price += newUpgradesSale.price * (newUpgradesSale.amount / 10);
      newUpgradesSale.price = Math.floor(newUpgradesSale.price);

      this.props.updateScore(newScore);
      this.props.buyUpgradeSale(newUpgradesSale, index);

      //update total score and upgrade price before setting class
      if (
        this.props.score.totalValue >= this.props.upgradesSale[index].price &&
        element.disabled.substring(0, 8) === "disabled"
      ) {
        this.props.setUpgradeSaleClass(index, "enabled");
        setTimeout(() => {
          this.props.setUpgradeSaleClass(index, "");
        }, 1000);
      } else if (
        this.props.score.totalValue < this.props.upgradesSale[index].price &&
        element.disabled.substring(0, 8) !== "disabled"
      ) {
        this.props.setUpgradeSaleClass(index, "disabled");
      }
    }
  }


  //Loops through Redux state and builds the UpgradeSale Elements
  displayupgradesSale() {
    let upgradesSale = this.props.upgradesSale;
    let upgradesSaleHTML = [];
    let count = 0;
    Object.values(upgradesSale).forEach(element => {
      upgradesSaleHTML.push(
        <UpgradeElement
          element={element}
          key={count}
          iconClass={"homePage__icon fas fa-money-bill"}
        >
          <BuyButton
            value={element}
            buyUpgrade={this.buyUpgradeSale}
            index={count}
          />
        </UpgradeElement>
      );
      count++;
    });

    return upgradesSaleHTML;
  }

  render() {
    return (
      <div className="upgradesSale">
        <div className="upgradesSale__displaySection">{this.displayupgradesSale()}</div>
      </div>
    );
  }
}

upgradesSaleSection.propTypes = {
  score: PropTypes.object.isRequired,
  upgradesSale: PropTypes.object.isRequired,
  updatePerSecond: PropTypes.func.isRequired,
  updateTotalValue: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    score: state.score,
    upgradesSale: state.upgradesSale
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTotalValue: score =>
      dispatch(scoreActions.updateTotalValue(score.totalValue)),
    updatePerSecond: score =>
      dispatch(scoreActions.updatePerSecond(score.perSecondValue)),
    updateScore: score => dispatch(scoreActions.updateScore(score)),
    buyUpgradeSale: (upgradesSale, index) =>
      dispatch(upgradesSaleActions.buyUpgradeSale(upgradesSale, index)),
    setUpgradeSaleClass: (id, className) =>
      dispatch(upgradesSaleActions.setUpgradeSaleClass(id, className))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(upgradesSaleSection);
