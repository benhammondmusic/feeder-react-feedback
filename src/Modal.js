import React, { Component } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import Radium, { StyleRoot, Style } from "radium";
import "./Modal-Styles";

let Textarea = Radium(TextareaAutosize);

class Modal extends Component {
  state = {
    feedbackEmail: this.props.emailDefaultValue,
    userType: this.props.userTypes[0],
    reasonType: this.props.reasonTypes[0],
    feedbackMsg: "",
    subProject: this.props.subProject,
    loading: false,
    submitted: false,
    userTypes: ["1", "2", "3"],
    reasonTypes: ["a", "b", "c"],
  };

  componentDidMount() {
    this.mounted = true;

    let tempUserArr = [];
    let tempReasonArr = [];

    this.props.userTypes.forEach((f, i) => tempUserArr[i] = f.trim());
    this.props.reasonTypes.forEach((f, i) => tempReasonArr[i] = f.trim());

    this.setState({ userTypes: tempUserArr });
    this.setState({ reasonTypes: tempReasonArr });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // Only relevant to demo/playground
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.emailDefaultValue !== this.props.emailDefaultValue) {
      this.setState({ feedbackEmail: this.props.emailDefaultValue });
    }

    if (prevProps.subProject !== this.props.subProject) {
      this.setState({ subProject: this.props.subProject });
    }

    if (prevProps.userTypes !== this.props.userTypes) {
      this.setState({ userType: this.props.userTypes[0] });
      let tempArr = [];
      let { userTypes } = this.props;

      userTypes.forEach((f, i) =>  tempArr[i] = f.trim());

      this.setState({ userTypes: tempArr });
    }
  }

  capitalize = (str) => {
    return str.replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Prevent double+ submit
    if (this.state.loading) {
      return;
    }

    this.setState({ loading: true });

    let { feedbackEmail, userType, reasonType, feedbackMsg, subProject } = this.state;
    let { projectId } = this.props;

    let payload = {
      projectId,
      feedbackEmail,
      userType,
      reasonType,
      feedbackMsg,
      subProject,
      feedbackSrc:
        typeof window !== "undefined" ? window.location.pathname : null,
    };

    axios
      .post("https://feeder-node-1337.herokuapp.com/feedback/create", payload)
      .then(() => {
        return;
      })
      .catch((e) => console.log(e.toString()));

    setTimeout(() => {
      if (this.mounted) {
        this.setState({ loading: false });
        this.setState({ submitted: true });
        setTimeout(() => {
          if (this.mounted) {
            this.props.triggerModal();
          }
        }, 1000);
      }
    }, 1000);
  };

  render() {
    let { userType, reasonType, loading, submitted, userTypes, reasonTypes } = this.state;
    let { props } = this;

    return (
      <StyleRoot>
        <form
          className="frf-modal-container"
          style={{ zIndex: parseInt(props.zIndex) }}
          onSubmit={this.handleSubmit}
        >
          <div className="frf-modal-content-container">
            {props.email && (
              <div className="frf-modal-input-group">
                <div className="frf-modal-label" htmlFor="feedbackEmail">
                  Email{props.emailRequired ? " *" : null}
                </div>
                <input
                  className="frf-modal-input"
                  onChange={this.handleChange}
                  value={this.state.feedbackEmail}
                  required={props.emailRequired}
                  id="feedbackEmail"
                  name="feedbackEmail"
                  type="email"
                  key="1"
                  style={{
                    ":hover": {
                      border: `1px solid ${props.hoverBorderColor}`,
                      boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                    },
                    ":focus": {
                      border: `1px solid ${props.hoverBorderColor}`,
                      boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                    },
                    ":active": {
                      border: `1px solid ${props.hoverBorderColor}`,
                      boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                    },
                  }}
                  placeholder={"Enter your email"}
                />
              </div>
            )}

            <div className="frf-modal-input-group">
              <div className="frf-modal-label">Feedback Type *</div>
              <div className="frf-modal-feedback-types">
                {this.state.userTypes.map((f, i) => (
                  <span
                    className={
                      userType === userTypes[i]
                        ? "frf-modal-feedback-type frf-modal-feedback-selected"
                        : "frf-modal-feedback-type"
                    }
                    key={`${i}userType2`}
                    style={
                      userType === userTypes[i]
                        ? {
                            background: props.primaryColor,
                            color: props.textColor,
                            border: `1px solid ${props.hoverBorderColor}`,
                            boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                            ":hover": {
                              border: `1px solid ${props.hoverBorderColor}`,
                              boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                            },
                          }
                        : {
                            color: "#000",
                            ":hover": {
                              border: `1px solid ${props.hoverBorderColor}`,
                              boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                            },
                          }
                    }
                    onClick={() =>
                      this.setState({ userType: userTypes[i] })
                    }
                  >
                    {this.capitalize(userTypes[i])}
                  </span>
                ))}
              </div>
            </div>

            <div className="frf-modal-input-group">
              <div className="frf-modal-label" htmlFor="feedbackMsg">
                Did You Get What You Needed Today? *
              </div>
              <Style
                key="5"
                scopeSelector="textarea"
                rules={{
                  ":hover": {
                    border: `1px solid ${props.hoverBorderColor}`,
                    boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                  },
                }}
              />
              <Textarea
                key="6"
                className="frf-modal-input"
                onChange={this.handleChange}
                value={this.state.feedbackMsg}
                required
                id="feedbackMsg"
                name="feedbackMsg"
                type="text"
                style={{
                  ":hover": {
                    border: `1px solid ${props.hoverBorderColor}`,
                    boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                  },
                  ":focus": {
                    border: `1px solid ${props.hoverBorderColor}`,
                    boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                  },
                }}
                placeholder={`Enter your feedback${
                  props.subProject
                    ? ` for ${props.subProject}`
                    : props.projectName
                    ? ` for ${props.projectName}`
                    : ""
                }`}
              />
            </div>
            <button
              className="frf-modal-button"
              disabled={submitted}
              key="7"
              style={{
                background: props.primaryColor,
                color: props.textColor,
                ":hover": {
                  border: `1px solid ${props.hoverBorderColor}`,
                  boxShadow: `${props.hoverBorderColor} 0px 0px 0px 1px`,
                },
              }}
              type="submit"
            >
              {loading ? (
                <div
                  key="8"
                  style={{
                    borderTop: `2.133px solid ${props.textColor}`,
                  }}
                  className="frf-modal-button-loader"
                ></div>
              ) : submitted ? (
                <span>{props.postSubmitButtonMsg}</span>
              ) : (
                <span>{props.submitButtonMsg}</span>
              )}
            </button>
            <div className="frf-water">
              Feedback Powered by{" "}
              <a
                href="http://feeder.sh/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Feeder.sh
              </a>
            </div>
          </div>
        </form>
      </StyleRoot>
    );
  }
}

export default Radium(Modal);
