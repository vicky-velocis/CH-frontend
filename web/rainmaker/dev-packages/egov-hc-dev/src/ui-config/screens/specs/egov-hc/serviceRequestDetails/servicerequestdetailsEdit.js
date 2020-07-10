import { getBreak, getCommonCard, getCommonContainer, getCommonTitle, getPattern, getSelectField, getTextField } from "egov-ui-framework/ui-config/screens/specs/utils";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const getMapLocatorEdit = textSchema => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-hc",
    componentPath: "MapLocatorEdit",
    props: {}
  };
};
export const showHideMapPopupEdit = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.mapsDialog.props.open",
    false
  );
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.servicerequestdetailsEdit.children.cardContent.children.servicerequestdetailsContainer.children.mapsDialog",
      "props.open",
      !toggle
    )
  );
};

export const servicerequestdetailsEdit = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Service Request Details",
      labelKey: "HC_SERVICE_REQUEST_DETAILS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),


  break: getBreak(),
  servicerequestdetailsContainer: getCommonContainer({
    // typeofrequest: {
    //   ...getSelectField({
    //     label: {
    //       labelName: "Type of Service Request",
    //       labelKey: "HC_TYPE_OF_SERVICE_REQUEST_LABEL"
    //     },
    //     optionLabel: "name",
    //     optionValue: "name",
    //     placeholder: {
    //       labelName: "Type of Service Request",
    //       labelKey: "HC_TYPE_OF_SERVICE_REQUEST_PLACEHOLDER"
    //     },
    //     gridDefination: {
    //       xs: 12,
    //       sm: 12,
    //       md: 12,
    //       lg: 12
    //     },
    //     sourceJsonPath: "applyScreenMdmsData.eg-horticulture.ServiceType",
    //     jsonPath: "SERVICEREQUEST.serviceType",
    //     errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    //     required: true,






    //   })
    // },
    typeofrequest: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-hc",
      componentPath: "AutosuggestContainer",
      jsonPath: "SERVICEREQUEST.serviceType",
            required: true,
            gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 12,
                    lg:12
                  },
    props: {
    style: {
    width: "100%",
    cursor: "pointer"
    },
   
    className: "citizen-city-picker",
    label: {
      labelName: "Type of Service Request",
      labelKey: "HC_TYPE_OF_SERVICE_REQUEST_LABEL"
    },  
    placeholder: {
      labelName: "Select Type of Service Request",
      labelKey: "HC_TYPE_OF_SERVICE_REQUEST_PLACEHOLDER"
    }, 
    sourceJsonPath: "applyScreenMdmsData.eg-horticulture.ServiceType",
    jsonPath: "SERVICEREQUEST.serviceType",
   
    labelsFromLocalisation: false,
    suggestions: [],
    fullwidth: true,
    required: true,
    inputLabelProps: {
      shrink: true
    },
    isMulti: false,
    labelName: "name",
    valueName: "name"
    },
  },
    nooftrees: {
      ...getTextField({
        label: {
          labelName: "No. of Trees for Cutting/Prunning/Removal",
          labelKey: "HC_NUMBER_OF_TREES_FOR_CUTTING_PRUNING_REMOVAL_LABEL"
        },
        placeholder: {
          labelName: "No. of Trees for Cutting/Prunning/Removal",
          labelKey: "HC_NUMBER_OF_TREES_FOR_CUTTING_PRUNING_REMOVAL_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12
        },
        required: true,
        pattern: getPattern("NoOfTree"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "SERVICEREQUEST.treeCount"
      })
    },
    details: {
      ...getTextField({
        label: {
          labelName: "Service Request Additional Details",
          labelKey: "HC_SERVICE_REQUEST_ADDITIONAL_DETAILS_LABEL"
        },
        placeholder: {
          labelName: "Service Request Additional Details",
          labelKey: "HC_SERVICE_REQUEST_ADDITIONAL_DETAILS_LABEL_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12
        },
        required: true,
        pattern: getPattern("serviceRequestDescription"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "SERVICEREQUEST.description"
      })
    },
    SILocationDetailsConatiner: getCommonContainer({
      propertyGisCoordinates:
      {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className: "gis-div-css",
          style: {
            width: "100%",
            cursor: "pointer"
          },
          jsonPath:
            "SERVICEREQUEST.address"
        },
        jsonPath: "SERVICEREQUEST.latitude",
        onClickDefination: {
          action: "condition",
          callBack: showHideMapPopupEdit
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12,
          lg:12
        },
        children: {
          gisTextField: {
            ...getTextField({
              label: {
                labelName: "Locate on Map",
                labelKey: "HC_VIOLATION_DETAILS_GIS_CORD_LABEL"
              },
              placeholder: {
                labelName: "Select your property location on map",
                labelKey: "EC_VIOLATION_DETAILS_GIS_CORD_PLACEHOLDER"
              },
              jsonPath:
                "SERVICEREQUEST.latitude",
              iconObj: {
                iconName: "gps_fixed",
                position: "end"
              },
              gridDefination: {
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12
              },
              required: true,
              props: {
                disabled: true,
                cursor: "pointer",
                jsonPath:
                  "SERVICEREQUEST.latitude"
              }
            })
          }
        }
      }
    }),
    mapsDialog: {
      componentPath: "Dialog",
      props: {
        open: false
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          children: {
            popup: getMapLocatorEdit()
          }
        }
      }

    },
    // locality: {
    //   ...getSelectField({
    //     label: {
    //       labelName: "Locality/Mohalla",
    //       labelKey: "HC_LOCALITY_MOHALLA_LABEL"
    //     },
    //     optionLabel: "name",
    //     optionValue: "name",
    //     placeholder: {
    //       labelName: "Locality/Mohalla",
    //       labelKey: "HC_LOCALITY_MOHALLA_LABEL_PLACEHOLDER"
    //     },
    //     gridDefination: {
    //       xs: 12,
    //       sm: 12,
    //       md: 12,
    //       lg: 12
    //     },
    //     required: true,
    //     sourceJsonPath: "applyScreenMdmsData.RAINMAKER-PGR.Sector",
    //     jsonPath: "SERVICEREQUEST.mohalla",
    //     errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    //     required: true,






    //   })
    // },
    locality: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-hc",
      componentPath: "AutosuggestContainer",
      jsonPath: "SERVICEREQUEST.mohalla",
            required: true,
            gridDefination: {
                    xs: 12,
                    sm: 12,
                    md: 12,
                    lg:12
                  },
    props: {
    style: {
    width: "100%",
    cursor: "pointer"
    },
   
    className: "citizen-city-picker",
    label: {
      labelName: "Locality/Mohalla",
      labelKey: "HC_LOCALITY_MOHALLA_LABEL"
    }, 
    placeholder: {
      labelName: "Select Locality/Mohalla",
      labelKey: "HC_LOCALITY_MOHALLA_LABEL_PLACEHOLDER"
    },
    sourceJsonPath: "applyScreenMdmsData.RAINMAKER-PGR.Sector",
    jsonPath: "SERVICEREQUEST.mohalla",
   
    labelsFromLocalisation: false,
    suggestions: [],
    fullwidth: true,
    required: true,
    inputLabelProps: {
      shrink: true
    },
    isMulti: false,
    labelName: "name",
    valueName: "name"
    },
  },
    houseno: {
      ...getTextField({
        label: {
          labelName: "House No. and Street Name",
          labelKey: "HC_HOUSE_NO_STREET_NAME_LABEL"
        },
        placeholder: {
          labelName: "House no and Street Name",
          labelKey: "HC_HOUSE_NO_STREET_NAME_LABEL_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12
        },
        required: true,
        pattern: getPattern("location"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "SERVICEREQUEST.houseNoAndStreetName"
      })
    },
    landmark: {
      ...getTextField({
        label: {
          labelName: "Landmark",
          labelKey: "HC_LANDMARK_LABEL"
        },
        placeholder: {
          labelName: "Landmark",
          labelKey: "HC_LANDMARK_LABEL_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12,
          lg: 12
        },
        pattern: getPattern("location"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "SERVICEREQUEST.landmark"
      }),


    },
  })
});

