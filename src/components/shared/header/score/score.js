import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../../../actions/scoreActions";
import * as upgradesFishActions from "../../../../actions/upgradesFishActions";
import * as upgradesSaleActions from "../../../../actions/upgradesSaleActions";

import "./score.scss";

class Score extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      valueBuffer: 0.0,
      fishBuffer: 0.0
    }
    this.incrementPerSecond = this.incrementPerSecond.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.incrementPerSecond(), 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  calculateFishPerSecond(fishScorePerTenth) {
    let remainder = fishScorePerTenth % 10;
    this.setState({ fishBuffer: remainder });
    fishScorePerTenth = Math.floor(fishScorePerTenth / 10);

    return fishScorePerTenth;
  }

  calculateSalePerSecond(saleScorePerTenth) {
    let remainder = saleScorePerTenth % 10;
    this.setState({ valueBuffer: remainder });
    saleScorePerTenth = Math.floor(saleScorePerTenth / 10);

    return saleScorePerTenth;
  }

  incrementPerSecond() {
    let score = this.props.score;
    let upgradesFish = this.props.upgradesFish;
    let upgradesSale = this.props.upgradesSale;


    //Calculate PerSecond for FISH and SALE to tenth. Add remainder to localstate to be used next tenth.
    let fishScorePerTenth = score.tpsFish + this.state.fishBuffer;

    let saleScorePerTenth = score.tpsSale + this.state.valueBuffer;

    fishScorePerTenth = this.calculateFishPerSecond(fishScorePerTenth);
    saleScorePerTenth = this.calculateSalePerSecond(saleScorePerTenth);



    //TotalFish = current fish + Fish per Second
    score.totalFish = (score.totalFish + fishScorePerTenth);

    //if fish available, TotalValue = current value + sale per Second if fish available
    if (score.totalFish > 0) {
      if (score.totalFish < saleScorePerTenth) {
        score.totalValue = score.totalValue + score.totalFish;
      } else {
        score.totalValue = score.totalValue + saleScorePerTenth;
      }
    }


    //TotalFish = current fish - salesPerSecond
    score.totalFish = score.totalFish - saleScorePerTenth;
    if (score.totalFish < 0) {
      score.totalFish = 0;
    }





    this.props.updateScore(score);

    Object.values(upgradesFish).forEach(element => {
      if (
        score.totalValue >= element.price &&
        element.disabled.substring(0, 8) === "disabled"
      ) {
        this.props.setUpgradeFishClass(element.id, "enabled");
        setTimeout(() => {
          this.props.setUpgradeFishClass(element.id, "");
        }, 1000);
      } else if (
        score.totalValue < element.price &&
        element.disabled.substring(0, 8) !== "disabled"
      ) {
        this.props.setUpgradeFishClass(element.id, "disabled");
      }
    });

    Object.values(upgradesSale).forEach(element => {
      if (
        score.totalValue >= element.price &&
        element.disabled.substring(0, 8) === "disabled"
      ) {
        //Sets enabled for 1 second then sets to "", this allows for animation to only run once.
        this.props.setUpgradeSaleClass(element.id, "enabled");
        setTimeout(() => {
          this.props.setUpgradeSaleClass(element.id, "");
        }, 1000);
      } else if (
        score.totalValue < element.price &&
        element.disabled.substring(0, 8) !== "disabled"
      ) {
        this.props.setUpgradeSaleClass(element.id, "disabled");
      }
    });
  }

  render() {
    return (
      <div className="score">
        <p className="score__value">
          Fish per/sec:<br />
          {this.props.score.tpsFish}
        </p>

        <p className="score__value">
          Sale per/sec:<br />
          {this.props.score.tpsSale}
        </p>

        <p className="score__value">
          Current Fish:<br />
          {this.props.score.totalFish}
        </p>

        <p className="score__value">
          Current Value:<br />
          {this.props.score.totalValue}
        </p>
      </div>
    );
  }
}

Score.propTypes = {
  score: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    score: state.score,
    upgradesFish: state.upgradesFish,
    upgradesSale: state.upgradesSale
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateScore: score =>
      dispatch(scoreActions.updateScore(score)),
    setUpgradeFishClass: (id, className) =>
      dispatch(upgradesFishActions.setUpgradeFishClass(id, className)),
    setUpgradeSaleClass: (id, className) =>
      dispatch(upgradesSaleActions.setUpgradeSaleClass(id, className))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
