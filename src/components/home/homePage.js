import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../actions/scoreActions";
import UpgradeFish from "./upgrades/upgradesFish/upgradesFishSection";
import UpgradeSale from "./upgrades/upgradesSale/upgradesSaleSection";

import "./homePage.scss";

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      upgradeView: "Fish",
      upgradeFishClass: "disabled",
      upgradeSaleClass: "disabled"
    }

    if (this.props.score.totalValue > 9 || this.props.score.tpsSale > 1 || this.props.tpsFish > 0) {
      this.state.upgradeFishClass = "active";
      this.state.upgradeSaleClass = "sale";
    }



    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.onClickUpdateSell = this.onClickUpdateSell.bind(this);
    this.updateUpgrades_Fish = this.updateUpgrades_Fish.bind(this);
    this.updateUpgrades_Sale = this.updateUpgrades_Sale.bind(this);
    this.displayUpgrades = this.displayUpgrades.bind(this);

  }

  updateUpgrades_Fish() {
    this.setState({ upgradeView: "Fish", upgradeFishClass: "active", upgradeSaleClass: "" });
  }

  updateUpgrades_Sale() {
    this.setState({ upgradeView: "Sale", upgradeFishClass: "", upgradeSaleClass: "active" });
  }

  onClickUpdate(e) {
    let score = this.props.score;

    score.totalFish++;

    this.props.updateTotalFish(score);

    if (this.state.upgradeFishClass === "disabled" && this.props.score.totalValue > 9) {
      this.setState({ upgradeFishClass: "active", upgradeSaleClass: "" });
    }
}


onClickUpdateSell() {
  let score = this.props.score;


  if (score.totalFish > 0) {
    score.totalFish--;
    score.totalValue++;
  }

  this.props.updateScore(score);

  if (this.state.upgradeFishClass === "disabled" && this.props.score.totalValue > 9) {
    this.setState({ upgradeFishClass: "active", upgradeSaleClass: "" });
  }
}

displayUpgrades() {
  let upgradesHTML = <UpgradeFish />;

  if (this.state.upgradeView === "Fish") {
    upgradesHTML = <UpgradeFish />;
  } else if (this.state.upgradeView === "Sale") {
    upgradesHTML = <UpgradeSale />;
  }

  return upgradesHTML;
}

render() {
  return (
    <div className="homePage">
      <button
        className="homePage__valueBtn"
        type="button"
        onClick={(e) => this.onClickUpdate(e)}
      ><i className="homePage__icon fas fa-fish" />
      </button>
      <button
        className="homePage__valueBtn"
        type="button"
        onClick={this.onClickUpdateSell}
      >
        <i className="homePage__icon fas fa-money-bill" />
      </button>

      <div className="homePage__upgrade">
        <button
          className={`homePage__upgradeBtn ${this.state.upgradeFishClass}`}
          onClick={this.updateUpgrades_Fish}
        >Fish Upgrades</button>

        <button
          className={`homePage__upgradeBtn ${this.state.upgradeSaleClass}`}
          onClick={this.updateUpgrades_Sale}
        >Sale Upgrades</button>
      </div>


      {this.displayUpgrades()}




    </div>
  );
}
}

HomePage.propTypes = {
  score: PropTypes.object.isRequired,
  updatePerSecond: PropTypes.func.isRequired,
  updateTotalFish: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    score: state.score
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePerSecond: score =>
      dispatch(scoreActions.updatePerSecond(score.perSecondValue)),
    updateTotalFish: score =>
      dispatch(scoreActions.updateTotalFish(score.totalFish)),
    updateScore: score =>
      dispatch(scoreActions.updateScore(score))

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
