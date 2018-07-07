import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as scoreActions from "../../actions/scoreActions";
import UpgradesPage from "./upgrades/upgradesSection";

import "./homePage.scss";

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onClickUpdate = this.onClickUpdate.bind(this);
  }

  onClickUpdate() {
    let score = this.props.score;

    score.totalValue++;

    this.props.updateTotalValue(score);
  }

  render() {
    return (
      <div className="homePage">
        <h1>Fisher Clicker</h1>
        <input
          className="homePage__valueBtn"
          type="button"
          onClick={this.onClickUpdate}
          value="Fish"
        />
        <UpgradesPage />

      </div>
    );
  }
}

HomePage.propTypes = {
  score: PropTypes.object.isRequired,
  updatePerSecond: PropTypes.func.isRequired,
  updateTotalValue: PropTypes.func.isRequired
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
    updateTotalValue: score =>
      dispatch(scoreActions.updateTotalValue(score.totalValue))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
