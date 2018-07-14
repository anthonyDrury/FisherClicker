import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../../../actions/scoreActions";
import * as upgradesSaleActions from "../../../../actions/upgradesSaleActions";
import BuyButton from "../buyButton/buyButton";
import "./upgradesSaleSection.scss";

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
      newScore.totalValue =
        newScore.totalValue - this.props.upgradesSale[index].price;
      newScore.perSecondValue += this.props.upgradesSale[index].perSecondBonus;

      let newupgradesSale = this.props.upgradesSale;
      newupgradesSale[index].amount++;
      newupgradesSale[index].price += newupgradesSale[index].initialPrice;

      this.props.updateScore(newScore);
      this.props.buyUpgradeSale(newupgradesSale[index], index);

      //update total score and upgrade price before setting class
      if (
        this.props.score.totalValue >= this.props.upgradesSale[index].price &&
        element.disabled === "disabled"
      ) {
        this.props.setUpgradeSaleClass(newupgradesSale, index, "");
      } else if (
        this.props.score.totalValue < this.props.upgradesSale[index].price &&
        element.disabled !== "disabled"
      ) {
        this.props.setUpgradeSaleClass(newupgradesSale, index, "disabled");
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
            buyUpgradeSale={this.buyUpgradeSale}
          />
        </div>
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
  upgradesSale: PropTypes.array.isRequired,
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
    setUpgradeSaleClass: (upgrade, id, className) =>
      dispatch(upgradesSaleActions.setUpgradeSaleClass(upgrade, id, className))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(upgradesSaleSection);
