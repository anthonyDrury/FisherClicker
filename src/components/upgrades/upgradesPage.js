import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../actions/scoreActions";
import * as upgradesActions from "../../actions/upgradesActions";
import BuyButton from "./buyButton/buyButton";
import "./upgradesPage.css";

class UpgradesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      disabledClass: ""
    };

    this.buyUpgrade = this.buyUpgrade.bind(this);
    this.displayUpgrades = this.displayUpgrades.bind(this);
  }

  buyUpgrade(element, index) {
    if (this.props.score.totalValue >= element.price) {
      let newScore = this.props.score;
      newScore.totalValue = newScore.totalValue - element.price;
      newScore.perSecondValue += element.perSecondBonus;

      let newUpgrades = this.props.upgrades;
      newUpgrades[index].amount++;
      newUpgrades[index].price *= newUpgrades[index].amount + 1;

      this.props.updateScore(newScore);
      this.props.buyUpgrade(newUpgrades[index], index);
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
  upgrades: PropTypes.object.isRequired,
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
      dispatch(upgradesActions.buyUpgrade(upgrades, index))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpgradesPage);
