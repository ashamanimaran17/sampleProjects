import React, {Component, Fragment} from "react";
import {InputLabel, OutlinedInput} from "@material-ui/core";
import PropTypes from "prop-types";
import {isEqual} from "lodash";
import { v1 as uuidv1 } from "uuid";
export class TextFieldWithValidation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        item: this.props.item,
        errorMessage: "",
        submitAttemptUUID: this.props.submitAttemptUUID
      };
      this.componentUUID = uuidv1();
      this.componentID = `field:${this.state.item.name}`;
    }
  
    componentDidMount() {
      this.validateElement("doNotShowErrorMessage"); //this will validate form to set setCustomValidity for blocking form submission - but validation errors will not be shown until first submitAttempt
    }

    static getDerivedStateFromProps(newProps, prevState) {
      const update = {};
      if (!isEqual(prevState.item, newProps.item)) {
        update.item = newProps.item;
      }
      if (prevState.submitAttemptUUID !== newProps.submitAttemptUUID) {
        update.submitAttemptUUID = newProps.submitAttemptUUID;
      }
      return Object.keys(update).length ? update : null;
    }
  
    componentDidUpdate(prevProps) {
      if (!isEqual(prevProps.item, this.props.item) || (prevProps.submitAttemptUUID !== this.props.submitAttemptUUID)) {
        if (this.props.submitAttemptUUID === "0") {
          this.validateElement("doNotShowErrorMessage");
        } else {
          this.validateElement("showErrorMessage");
        }
      }
    }
  
    validateElement = (showErrorMessageOrNot) => {
      // if validate is called during initial load do not show error messages- but still
      //validate and set customValidity so that form submission will be blocked due to empty fields etc
      let errorMessages = [];
      //const tempValue = this.state.item.value;
      const validators = {};
      if (this.state.item.required) {
        validators.required = true;
      }
        //errorMessages = getAllValidationErrors(this.props.validators, validators, tempValue);
        if (errorMessages.length > 0) {
          this.props.updateHasErrors(this.componentUUID, true, "updateComponent", this.componentID);
       } else {
         this.props.updateHasErrors(this.componentUUID, false, "updateComponent", this.componentID);
       }
      const errorMessage = errorMessages.join();
      if ((this.state.submitAttemptUUID !== "0") || (this.props.operation === "edit") || (showErrorMessageOrNot === "showErrorMessage")) {
        //show error messages on initial load if opened for edit or a new rule(on submitAttempt or after editing when validation is called with showErrorMessage)
        this.setState({errorMessage});
     }
    };
  
    handleValueChange = event => {
      this.props.updateField(event.currentTarget.value);
    };
  
    render() {
        return (
          <Fragment>
              <InputLabel className={this.props.classNameAsPropForLabel}>{this.props.item.label}{this.props.item.required ? "*" : ""}</InputLabel>
              <OutlinedInput
              id={this.componentUUID}
              variant="outlined"
              fullWidth={true}
              size="medium"
              onChange={this.handleValueChange}
              value={this.props.item.value || ""}
              type={this.props.item.dataType}
              disabled={this.props.item.disabled || (this.props.operation === "view")}
              placeholder={this.props.placeholder}
              onFocus = {this.props.handleFocus}
            />
           <div style={{color: "red"}}>{this.state.errorMessage}</div>
          </Fragment>
        );
    }
  }
  TextFieldWithValidation.propTypes = {
    item: PropTypes.object,
    operation: PropTypes.string,
    validators: PropTypes.object,
    submitAttemptUUID: PropTypes.string,
    index: PropTypes.number,
    updateField: PropTypes.func,
    updateHasErrors: PropTypes.func,
    placeholder: PropTypes.string,
    classNameAsPropForLabel: PropTypes.any,
    handleFocus: PropTypes.func
  };