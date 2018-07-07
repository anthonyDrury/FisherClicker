import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../../../actions/scoreActions";
import * as upgradesActions from "../../../../actions/upgradesActions";

import "./score.scss";

class Score extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.incrementPerSecond = this.incrementPerSecond.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.incrementPerSecond(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  incrementPerSecond() {
    let score = this.props.score;
    let upgrades = this.props.upgrades;
    score.totalValue = score.totalValue + score.perSecondValue;
    this.props.updateTotalValue(score);

    Object.values(upgrades).forEach(element => {
      if (
        score.totalValue >= element.price &&
        element.disabled === "disabled"
      ) {
        this.props.setUpgradeClass(upgrades, element.id, "");
      } else if (
        score.totalValue < element.price &&
        element.disabled !== "disabled"
      ) {
        this.props.setUpgradeClass(upgrades, element.id, "disabled");
      }
    });
  }

  render() {
    return (
      <div className="score">
        <p className="score__value">
          Per Second:<br />
          {this.props.score.perSecondValue}
        </p>

        <p className="score__value">
          Total Fish:<br />
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
    upgrades: state.upgrades
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTotalValue: score =>
      dispatch(scoreActions.updateTotalValue(score.totalValue)),
    setUpgradeClass: (upgrade, id, className) =>
      dispatch(upgradesActions.setUpgradeClass(upgrade, id, className))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);
