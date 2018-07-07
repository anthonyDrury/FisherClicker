import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../actions/scoreActions";
import * as upgradesActions from "../../actions/upgradesActions";
import BuyButton from "./buyButton/buyButton";
import "./upgradesPage.scss";

class UpgradesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      disabledClass: ""
    };

    this.buyUpgrade = this.buyUpgrade.bind(this);
    this.displayUpgrades = this.displayUpgrades.bind(this);
  }

  /* Purchases Upgrade if user has enough points,
     Sets new total score minus price of upgrade,
     adds to the per second total score,
     sets upgrade to disabled if not enough points */
  buyUpgrade(element, index) {
    if (this.props.score.totalValue >= this.props.upgrades[index].price) {
      let newScore = this.props.score;
      newScore.totalValue =
        newScore.totalValue - this.props.upgrades[index].price;
      newScore.perSecondValue += this.props.upgrades[index].perSecondBonus;

      let newUpgrades = this.props.upgrades;
      newUpgrades[index].amount++;
      newUpgrades[index].price += newUpgrades[index].initialPrice;

      this.props.updateScore(newScore);
      this.props.buyUpgrade(newUpgrades[index], index);

      //update total score and upgrade price before setting class
      if (
        this.props.score.totalValue >= this.props.upgrades[index].price &&
        element.disabled === "disabled"
      ) {
        this.props.setUpgradeClass(newUpgrades, index, "");
      } else if (
        this.props.score.totalValue < this.props.upgrades[index].price &&
        element.disabled !== "disabled"
      ) {
        this.props.setUpgradeClass(newUpgrades, index, "disabled");
      }
    }
  }

  displayUpgrades() {
    let upgrades = this.props.upgrades;
    let upgradesHTML = [];
    let count = 0;
    Object.values(upgrades).forEach(element => {
      upgradesHTML.push(
        <div className={`upgradeElement ${element.disabled}`} key={count}>
          <p>
            <span className="upgradeElement__title">{element.title} </span>
            <span className="upgradeElement__bonus">
              +{element.perSecondBonus}
            </span>
          </p>
          <p>
            $: <span className="upgradeElement__price">{element.price}</span> #:{" "}
            <span className="upgradeElement__amount">{element.amount}</span>
          </p>
          <BuyButton
            value={element}
            index={count}
            buyUpgrade={this.buyUpgrade}
          />
        </div>
      );
      count++;
    });

    return upgradesHTML;
  }

  render() {
    return (
      <div className="upgrades">
        <div className="upgrades__displaySection">{this.displayUpgrades()}</div>
      </div>
    );
  }
}

UpgradesPage.propTypes = {
  score: PropTypes.object.isRequired,
  upgrades: PropTypes.array.isRequired,
  updatePerSecond: PropTypes.func.isRequired,
  updateTotalValue: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    score: state.score,
    upgrades: state.upgrades
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTotalValue: score =>
      dispatch(scoreActions.updateTotalValue(score.totalValue)),
    updatePerSecond: score =>
      dispatch(scoreActions.updatePerSecond(score.perSecondValue)),
    updateScore: score => dispatch(scoreActions.updateScore(score)),
    buyUpgrade: (upgrades, index) =>
      dispatch(upgradesActions.buyUpgrade(upgrades, index)),
    setUpgradeClass: (upgrade, id, className) =>
      dispatch(upgradesActions.setUpgradeClass(upgrade, id, className))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpgradesPage);
