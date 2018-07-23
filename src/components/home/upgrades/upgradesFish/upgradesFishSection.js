import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../../../actions/scoreActions";
import * as upgradesFishActions from "../../../../actions/upgradesFishActions";
import UpgradeElement from "../upgradeElement/upgradeElement";
import "../upgradesSection.scss";

class upgradesFishSection extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      disabledClass: ""
    };

    this.buyUpgradeFish = this.buyUpgradeFish.bind(this);
    this.displayupgradesFish = this.displayupgradesFish.bind(this);
  }

  /* Purchases UpgradeFish if user has enough points,
     Sets new total score minus price of upgrade,
     adds to the per second total Fish score,
     sets upgrade to disabled if not enough points */
  buyUpgradeFish(element, index) {
    if (this.props.score.totalValue >= this.props.upgradesFish[index].price) {
      let newScore = this.props.score;
      newScore.totalValue = newScore.totalValue - this.props.upgradesFish[index].price;
      newScore.tpsFish += this.props.upgradesFish[index].perSecondBonus;

      let newUpgradesFish = this.props.upgradesFish[index];
      newUpgradesFish.amount++;
      newUpgradesFish.price = newUpgradesFish.initialPrice * newUpgradesFish.amount;
      newUpgradesFish.price += newUpgradesFish.price * (newUpgradesFish.amount / 10);
      newUpgradesFish.price = Math.floor(newUpgradesFish.price);

      this.props.updateScore(newScore);
      this.props.buyUpgradeFish(newUpgradesFish, index);

      //update total score and upgrade price before setting class
      if (
        this.props.score.totalValue >= this.props.upgradesFish[index].price &&
        element.disabled.substring(0, 8) === "disabled"
      ) {
        this.props.setUpgradeFishClass(index, "enabled");
        setTimeout(() => {
          this.props.setUpgradeFishClass(index, "");
        }, 1000);
      } else if (
        this.props.score.totalValue < this.props.upgradesFish[index].price &&
        element.disabled.substring(0, 8) !== "disabled"
      ) {
        this.props.setUpgradeFishClass(index, "disabled");
      }
    }
  }


  //Loops through Redux state and builds the UpgradeFish Elements
  displayupgradesFish() {
    let upgradesFish = this.props.upgradesFish;
    let upgradesFishHTML = [];
    let count = 0;
    Object.values(upgradesFish).forEach(element => {
      upgradesFishHTML.push(
        <UpgradeElement
          element={element}
          key={count}
          iconClass={"homePage__icon fas fa-fish"}
          buyUpgrade={this.buyUpgradeFish}
        />
      );
      count++;
    });

    return upgradesFishHTML;
  }

  render() {
    return (
      <div className="upgradesFish">
        <div className="upgradesFish__displaySection">{this.displayupgradesFish()}</div>
      </div>
    );
  }
}

upgradesFishSection.propTypes = {
  score: PropTypes.object.isRequired,
  upgradesFish: PropTypes.object.isRequired,
  updatePerSecond: PropTypes.func.isRequired,
  updateTotalValue: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    score: state.score,
    upgradesFish: state.upgradesFish
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTotalValue: score =>
      dispatch(scoreActions.updateTotalValue(score.totalValue)),
    updatePerSecond: score =>
      dispatch(scoreActions.updatePerSecond(score.perSecondValue)),
    updateScore: score => dispatch(scoreActions.updateScore(score)),
    buyUpgradeFish: (upgradesFish, index) =>
      dispatch(upgradesFishActions.buyUpgradeFish(upgradesFish, index)),
    setUpgradeFishClass: (id, className) =>
      dispatch(upgradesFishActions.setUpgradeFishClass(id, className))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(upgradesFishSection);
