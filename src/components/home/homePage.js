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

    this.onClickUpdate = this.onClickUpdate.bind(this);
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

  onClickUpdate() {
    let score = this.props.score;

    score.totalFish++;

    this.props.updateTotalFish(score);

    if (this.state.upgradeFishClass === "disabled" && this.props.score.totalValue > 9){
      this.setState({upgradeFishClass: "active", upgradeSaleClass: ""});
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
        <input
          className="homePage__valueBtn"
          type="button"
          onClick={this.onClickUpdate}
          value="Fish"
        />

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
      dispatch(scoreActions.updateTotalFish(score.totalFish))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
