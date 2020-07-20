import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import {
  LabelContainer,
  TextFieldContainer
} from "egov-ui-framework/ui-containers";
import { Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { UploadMultipleFiles } from "egov-ui-framework/ui-molecules";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { get } from "lodash";

const styles = theme => ({
  root: {
    marginTop: 24,
    width: "100%"
  }
});

const fieldConfig = {
  approverName: {
    label: {
      labelName: "Assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_LABEL"
    },
    placeholder: {
      labelName: "Select assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_PLACEHOLDER"
    }
  },
  comments: {
    label: {
      labelName: "Comments",
      labelKey: "WF_COMMON_COMMENTS"
    },
    placeholder: {
      labelName: "Enter Comments",
      labelKey: "WF_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
    }
  },
  applicationCharges: {
    label: {
      labelName: "Application Charges",
      labelKey: "WF_APPLICATION_CHARGES"
    },
    placeholder: {
      labelName: "Enter Application Charges",
      labelKey: "WF_APPLICATION_CHARGES_PLACEHOLDER"
    }
  },
  publicationCharges: {
    label: {
      labelName: "Publication Charges",
      labelKey: "WF_PUBLICATION_CHARGES"
    },
    placeholder: {
      labelName: "Enter Publication Charges",
      labelKey: "WF_PUBLICATION_CHARGES_PLACEHOLDER"
    }
  }
};

class ActionDialog extends React.Component {
  state = {
    employeeList: [],
    roles: ""
  };

  // onEmployeeClick = e => {
  //   const { handleFieldChange, toggleSnackbar } = this.props;
  //   const selectedValue = e.target.value;
  //   const currentUser = JSON.parse(getUserInfo()).uuid;
  //   if (selectedValue === currentUser) {
  //     toggleSnackbar(
  //       true,
  //       "Please mark to different Employee !",
  //       "error"
  //     );
  //   } else {
  //     handleFieldChange("Licenses[0].assignee", e.target.value);
  //   }
  // };

  getButtonLabelName = label => {
    switch (label) {
      case "FORWARD":
        return "Verify and Forward";
      case "MARK":
        return "Mark";
      case "REJECT":
        return "Reject";
      case "CANCEL":
      case "APPROVE":
        return "APPROVE";
      case "PAY":
        return "Pay";
      case "SENDBACK":
        return "Send Back";
      default:
        return label;
    }
  };

  render() {  
    let {
      open,
      onClose,
      dropDownData,
      handleFieldChange,
      onButtonClick,
      dialogData,
      dataPath,
      state
    } = this.props;
    const {
      buttonLabel,
      showEmployeeList,
      dialogHeader,
      moduleName,
      isDocRequired
    } = dialogData;
    const { getButtonLabelName } = this;
    let fullscreen = false;
    if (window.innerWidth <= 768) {
      fullscreen = true;
    }
    if (dataPath === "FireNOCs") {
      dataPath = `${dataPath}[0].fireNOCDetails`
    } else if (dataPath === "BPA") {
      dataPath = `${dataPath}`;
    } else {
      dataPath = `${dataPath}[0]`;
    }

    const applicationState = (get(state.screenConfiguration.preparedFinalObject, dataPath) || []).applicationState
    const duplicateCopyApplicationState = (get(state.screenConfiguration.preparedFinalObject, dataPath) || []).state
    return (
      <Dialog
        fullScreen={fullscreen}
        open={open}
        onClose={onClose}
        maxWidth={false}
        style={{zIndex:2000}}
      >
        <DialogContent
          children={
            <Container
              children={
                <Grid
                  container="true"
                  spacing={12}
                  marginTop={16}
                  className="action-container"
                >
                  <Grid
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    item
                    sm={10}
                  >
                    <Typography component="h2" variant="subheading">
                      <LabelContainer {...dialogHeader} />
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    style={{
                      textAlign: "right",
                      cursor: "pointer",
                      position: "absolute",
                      right: "16px",
                      top: "16px"
                    }}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </Grid>
                  {showEmployeeList && !!dropDownData.length && (
                    <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                      <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px" }}
                        label={fieldConfig.approverName.label}
                        placeholder={fieldConfig.approverName.placeholder}
                        data={dropDownData}
                        optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        //onChange={e => this.onEmployeeClick(e)}
                        onChange={e =>
                          handleFieldChange(
                            `${dataPath}.assignee`,
                            [e.target.value]
                          )
                        }
                        jsonPath={`${dataPath}.assignee[0]`}
                      />
                    </Grid>
                  )}
                  <Grid item sm="12">
                    <TextFieldContainer
                      InputLabelProps={{ shrink: true }}
                      label={fieldConfig.comments.label}
                      onChange={e =>
                        handleFieldChange(`${dataPath}.comment`, e.target.value)
                      }
                      jsonPath={`${dataPath}.comment`}
                      placeholder={fieldConfig.comments.placeholder}
                    />
                  </Grid>
    
                  {moduleName === "OwnershipTransferRP" && (applicationState === "PENDINGSAVERIFICATION" || applicationState === "PENDINGAPRO") && (buttonLabel === "FORWARD" || buttonLabel === "SUBMIT") && (
                    <Grid item sm="12">
                    <TextFieldContainer
                      InputLabelProps={{ shrink: true }}
                      label={applicationState === "PENDINGSAVERIFICATION" ? fieldConfig.applicationCharges.label : fieldConfig.publicationCharges.label}
                      onChange={e =>
                        handleFieldChange(applicationState === "PENDINGSAVERIFICATION" ? `${dataPath}.ownerDetails.dueAmount` : `${dataPath}.ownerDetails.aproCharge` , e.target.value)
                      }
                      jsonPath={applicationState === "PENDINGSAVERIFICATION" ? `${dataPath}.ownerDetails.dueAmount` : `${dataPath}.ownerDetails.aproCharge`}
                      placeholder={applicationState === "PENDINGSAVERIFICATION" ? fieldConfig.applicationCharges.placeholder : fieldConfig.publicationCharges.placeholder}
                    />
                  </Grid>
                  )}

                  {moduleName === "DuplicateCopyOfAllotmentLetterRP" && (duplicateCopyApplicationState === "PENDINGSAVERIFICATION" || duplicateCopyApplicationState === "PENDINGAPRO") && (buttonLabel === "FORWARD" || buttonLabel === "SUBMIT") && (
                    <Grid item sm="12">
                    <TextFieldContainer
                      InputLabelProps={{ shrink: true }}
                      label={duplicateCopyApplicationState === "PENDINGSAVERIFICATION" ? fieldConfig.applicationCharges.label : fieldConfig.publicationCharges.label}
                      onChange={e =>
                        handleFieldChange(duplicateCopyApplicationState === "PENDINGSAVERIFICATION" ? `${dataPath}.applicant[0].feeAmount` : `${dataPath}.applicant[0].aproCharge` , e.target.value)
                      }
                      jsonPath={duplicateCopyApplicationState === "PENDINGSAVERIFICATION" ? `${dataPath}.applicant[0].feeAmount` : `${dataPath}.applicant[0].aproCharge`}
                      placeholder={duplicateCopyApplicationState === "PENDINGSAVERIFICATION" ? fieldConfig.applicationCharges.placeholder : fieldConfig.publicationCharges.placeholder}
                    />
                  </Grid>
                  )}
                    <Grid sm={12} style={{ textAlign: "right" }} className="bottom-button-container">
                      <Button
                        variant={"contained"}
                        color={"primary"}
                        style={{
                          minWidth: "200px",
                          height: "48px"
                        }}
                        className="bottom-button"
                        onClick={() =>
                          onButtonClick(buttonLabel, isDocRequired)
                        }
                      >
                        <LabelContainer
                          labelName={getButtonLabelName(buttonLabel)}
                          labelKey={
                            moduleName
                              ? `WF_${moduleName.toUpperCase()}_${buttonLabel}`
                              : ""
                          }
                        />
                      </Button>
                    </Grid>
                </Grid>
              }
            />
          }
        />
      </Dialog>
    );
  }
}
export default withStyles(styles)(ActionDialog);