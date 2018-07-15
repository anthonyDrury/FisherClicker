import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../../../actions/scoreActions";
import * as upgradesFishActions from "../../../../actions/upgradesFishActions";
import BuyButton from "../buyButton/buyButton";
import "./upgradesFishSection.scss";

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
     adds to the per second total score,
     sets upgrade to disabled if not enough points */
  buyUpgradeFish(element, index) {
    if (this.props.score.totalValue >= this.props.upgradesFish[index].price) {
      let newScore = this.props.score;
      newScore.totalValue =
        newScore.totalValue - this.props.upgradesFish[index].price;
      newScore.tpsFish += this.props.upgradesFish[index].perSecondBonus;

      let newupgradesFish = this.props.upgradesFish[index];
      newupgradesFish.amount++;
      newupgradesFish.price += newupgradesFish.initialPrice;

      this.props.updateScore(newScore);
      this.props.buyUpgradeFish(newupgradesFish, index);

      //update total score and upgrade price before setting class
      if (
        this.props.score.totalValue >= this.props.upgradesFish[index].price &&
        element.disabled === "disabled"
      ) {
        this.props.setUpgradeFishClass(index, "");
      } else if (
        this.props.score.totalValue < this.props.upgradesFish[index].price &&
        element.disabled !== "disabled"
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
            buyUpgrade={this.buyUpgradeFish}
          />
        </div>
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
  upgradesFish: PropTypes.array.isRequired,
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
