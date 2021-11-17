import React, { Component } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import Radium, { StyleRoot, Style } from "radium";
import "./Modal-Styles";

let Textarea = Radium(TextareaAutosize);

class Modal extends Component {
  state = {
    feedbackEmail: this.props.emailDefaultValue,
    feedbackType: this.props.feedbackTypes[0],
    interestType: this.props.interestTypes[0],
    feedbackMsg: "",
    subProject: this.props.subProject,
    loading: false,
    submitted: false,
    feedbackTypes: ["",""],
    interestTypes: ["",""],
  };

  componentDidMount() {
    this.mounted = true;

    let tempArr = [];
    this.props.feedbackTypes.forEach((f, i) => tempArr[i] = f.trim());
    this.setState({ feedbackTypes: tempArr });

    let tempArr2 = [];
    this.props.interestTypes.forEach((f, i) => tempArr2[i] = f.trim());
    this.setState({ interestTypes: tempArr2 });

  }

  componentWillUnmount() {
    this.mounted = false;
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

    let { feedbackEmail, feedbackType, interestType, feedbackMsg, subProject } = this.state;
    let { projectId } = this.props;

    let payload = {
      projectId,
      feedbackEmail,
      feedbackType,
      feedbackMsg: 
      `[${interestType}]\n${feedbackMsg}`,
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
        }, 3000); // time to post-submit message before reverting
      }
    }, 1000);
  };

  render() {
    let { feedbackType, interestType, loading, submitted, feedbackTypes, interestTypes } = this.state;
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
            <div className="frf-modal-label">{props.feedbackPrompt} *</div>
              <div className="frf-modal-feedback-types">
                {this.state.feedbackTypes.map((f, i) => (
                  <span
                    className={
                      feedbackType === feedbackTypes[i]
                        ? "frf-modal-feedback-type frf-modal-feedback-selected"
                        : "frf-modal-feedback-type"
                    }
                    key={`${i}why`}
                    style={
                      feedbackType === feedbackTypes[i]
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
                      this.setState({ feedbackType: feedbackTypes[i] })
                    }
                  >
                    {this.capitalize(feedbackTypes[i])}
                  </span>
                ))}
              </div>
              <div className="frf-modal-label">{props.interestPrompt} *</div>
              <div className="frf-modal-feedback-types">
                {this.state.interestTypes.map((f, i) => (
                  <span
                    className={
                      interestType === interestTypes[i]
                        ? "frf-modal-feedback-type frf-modal-feedback-selected"
                        : "frf-modal-feedback-type"
                    }
                    key={`${i}field`}
                    style={
                      interestType === interestTypes[i]
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
                      this.setState({ interestType: interestTypes[i] })
                    }
                  >
                    {this.capitalize(interestTypes[i])}
                  </span>
                ))}
              </div>
            </div>

            <div className="frf-modal-input-group">
              <div className="frf-modal-label" htmlFor="feedbackMsg">
                Did you get what you needed today? *
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
                placeholder={`Let us know how we can improve${
                  props.subProject
                    ? ` ${props.subProject}`
                    : props.projectName
                    ? ` ${props.projectName}`
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
            
          </div>
        </form>
      </StyleRoot>
    );
  }
}

export default Radium(Modal);
