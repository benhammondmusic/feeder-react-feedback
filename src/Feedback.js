import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Feedback-Styles";
import Trigger from "./Trigger";

class Feedback extends Component {
  render() {
    let { props } = this;

    return (
      <div
        className="frf-feedback-container"
        style={{ zIndex: parseInt(props.zIndex) }}
      >
        <Trigger
          email={props.email}
          emailRequired={props.emailRequired}
          emailDefaultValue={props.emailDefaultValue}
          projectName={props.projectName}
          subProject={props.subProject}
          feedbackPrompt={props.feedbackPrompt}
          feedbackTypes={props.feedbackTypes}
          interestPrompt={props.interestPrompt}
          interestTypes={props.interestTypes}
          textboxPrompt={props.textboxPrompt}
          projectId={props.projectId}
          primaryColor={props.primaryColor}
          textColor={props.textColor}
          hoverBorderColor={props.hoverBorderColor}
          postSubmitButtonMsg={props.postSubmitButtonMsg}
          submitButtonMsg={props.submitButtonMsg}
          zIndex={props.zIndex}
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  email: PropTypes.bool,
  emailRequired: PropTypes.bool,
  emailDefaultValue: PropTypes.string,
  projectName: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  primaryColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverBorderColor: PropTypes.string,
  postSubmitButtonMsg: PropTypes.string,
  submitButtonMsg: PropTypes.string,
  subProject: PropTypes.string,
  zIndex: PropTypes.string,
  feedbackPrompt: PropTypes.string,
  feedbackTypes: PropTypes.arrayOf(PropTypes.string),
  interestPrompt: PropTypes.string,
  interestTypes: PropTypes.arrayOf(PropTypes.string),
  textboxPrompt: PropTypes.string
};

Feedback.defaultProps = {
  email: false,
  emailRequired: false,
  emailDefaultValue: "",
  projectName: "",
  subProject: "",
  primaryColor: "#000000",
  textColor: "#ffffff",
  hoverBorderColor: "#000000",
  postSubmitButtonMsg: "Thanks!",
  submitButtonMsg: "Send Feedback",
  textboxPrompt: "",
  feedbackPrompt: "",
  feedbackTypes: ["",""],
  interestPrompt: "",
  interestTypes: ["",""],
  zIndex: "100000000",
};

export default Feedback;
