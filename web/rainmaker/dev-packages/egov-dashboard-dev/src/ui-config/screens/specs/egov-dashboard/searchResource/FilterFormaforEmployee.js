import { getCommonCard, getCommonContainer, getDateField, getLabel, getPattern,} from "egov-ui-framework/ui-config/screens/specs/utils";
import { searchAPICall } from "./functions";
import { dashboard1ResetFields } from "./functions";
import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";

export const FilterFormforEmployee = getCommonCard({
  FilterConstraintsContainer: getCommonContainer({
    fromDate: getDateField({
      label: { labelName: "From Date", labelKey: "DASHBOARD_FROM_DATE" },
      // placeholder: {
      //   labelName: "Select From Date",
      //   labelKey: ""
      // },
      gridDefination: {
        xs: 12,
        sm: 6,
        md: 4
      },
      pattern: getPattern("Date"),
      jsonPath: "dahsboardHome.defaultFromDate",
      afterFieldChange: (action, state, dispatch) => {
        dispatch(
          handleField(
            "dashboardType",
            "components.div.children.FilterFormforEmployee.children.cardContent.children.FilterConstraintsContainer.children.toDate",
            "props.inputProps.min",
            action.value
          )
        );
        }
    }),
    toDate: getDateField({
      label: { labelName: "To Date", labelKey: "DASHBOARD_TO_DATE" },
      // placeholder: {
      //   labelName: "To Date",
      //   labelKey: "Select To Date"
      // },
      props: {
        inputProps: {
          min: ''
        }
      },
      gridDefination: {
        xs: 12,
        sm: 6,
        md: 4
      },
      pattern: getPattern("Date"),
      jsonPath: "dahsboardHome.defaulttoDate"
    }),
  }),
  button: getCommonContainer({
    buttonContainer: getCommonContainer({
      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 4,
          md: 4
        },
        props: {
          variant: "contained",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px",
            marginRight: "45px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Search",
            labelKey: "DASHBOARD_SEARCH_BTN_LABEL"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            searchAPICall(state, dispatch)
          }
        }
      },
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 4,
          md: 4
          // align: "center"
        },
        props: {
          variant: "outlined",
          style: {
            color: "#FE7A51",
            border: "#FE7A51 solid 1px",
            borderRadius: "2px",
             width: "80%",
            height: "48px",
            marginBottom: "8px"
          }
        },
        children: {
          buttonLabel: getLabel({
            labelName: "Reset",
            labelKey: "DASHBOARD_RESET_BTN_LABEL"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: dashboard1ResetFields
        }
      },
    })
  })
});