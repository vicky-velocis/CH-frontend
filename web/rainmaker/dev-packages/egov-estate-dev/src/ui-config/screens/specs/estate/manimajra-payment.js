import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject,toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getCommonHeader,getBreak, getCommonCard, getCommonContainer, getTextField, getSelectField,getPattern, getCommonGrayCard, getCommonTitle, getLabel, getDateField  } from "egov-ui-framework/ui-config/screens/specs/utils";
import commonConfig from "config/common.js";
import { httpRequest } from "../../../../ui-utils";
import get from "lodash/get";
import { ESTATE_SERVICES_MDMS_MODULE } from "../../../../ui-constants";
import { getSearchResults } from "../../../../ui-utils/commons";
import { propertyInfo } from "./preview-resource/preview-properties";
import { getQueryArg, getTodaysDateInYMD } from "egov-ui-framework/ui-utils/commons";
import { convertDateToEpoch, validateFields, getRentSummaryCard } from "../utils";
import {demandResults} from './searchResource/searchResults'
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import {penaltyStatmentResult,extensionStatmentResult,securityStatmentResult} from './searchResource/functions'
import { penaltySummary } from "./generatePenaltyStatement";

  const header = getCommonHeader({
    labelName: "Rent Payment",
    labelKey: "ES_RENT_PAYMENT_HEADER"
  });

 export const getMdmsData = async (dispatch) => {
    let mdmsBody = {
      MdmsCriteria: {
        tenantId: commonConfig.tenantId,
        moduleDetails: [{
          moduleName: ESTATE_SERVICES_MDMS_MODULE,
          masterDetails: [{
           name: "paymentType"
          }]
        }]
      }
    };
    try {
      let payload = await httpRequest(
        "post",
        "/egov-mdms-service/v1/_search",
        "_search",
        [],
        mdmsBody
      );
      dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
    } catch (e) {
      console.log(e);
    }
  }
  
  const beforeInitFn = async(action, state, dispatch)=>{
    dispatch(prepareFinalObject("Properties", []))
    getMdmsData(dispatch);
    let propertyId = getQueryArg(window.location.href, "propertyId")
    const fileNumber = getQueryArg(window.location.href, "fileNumber")
    const queryObject = [
      {key: "propertyIds", value: propertyId},
      {key: "fileNumber", value: fileNumber}
    ]
    const response = await getSearchResults(queryObject)
    if(!!response.Properties && !!response.Properties.length) {
       dispatch(prepareFinalObject("Properties", response.Properties))
    }
    // dispatch(prepareFinalObject("payment.paymentType","PAYMENTTYPE.RENT"))
  }

  const propertyDetailsHeader = getCommonTitle(
    {
        labelName: "Property Details",
        labelKey: "ES_PROPERTY_DETAILS_HEADER"
    },
    {
        style: {
                marginBottom: 18,
                marginTop: 18
        }
    }
  )

  const paymentDetailsHeader = getCommonTitle(
    {
        labelName: "Payment Details",
        labelKey: "ES_PAYMENT_DETAILS_HEADER"
    },
    {
        style: {
                marginBottom: 18,
                marginTop: 18
        }
    }
  )

  const demandTypeHeader = getCommonTitle(
    {
        labelName: "Demand Type",
        labelKey: "ES_DEMAND_TYPE_HEADER"
    },
    {
        style: {
                marginBottom: 18,
                marginTop: 18
        }
    }
  )
  

  const fileNumberField = {
    label: {
        labelName: "File Number",
        labelKey: "ES_FILE_NUMBER_LABEL"
      },
      placeholder: {
        labelName: "Enter File Number",
        labelKey: "ES_FILE_NUMBER_PLACEHOLDER"
      },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    required: true,
    jsonPath: "searchScreenFileNo.fileNumber",
    disabled: true
  }

  const commentsField = {
    label: {
        labelName: "Comments",
        labelKey: "ES_COMMENTS_LABEL"
    },
    placeholder: {
        labelName: "Enter Comments",
        labelKey: "ES_COMMENTS_PLACEHOLDER"
    },
    visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
    gridDefination: {
        xs: 12,
        sm: 6
    },
    jsonPath: "payment.comments"
  }

  const paymentType = {
    label: {
        labelName: "Demand Type",
        labelKey: "ES_DEMAND_TYPE_LABEL"
      },
    required: false,
    // jsonPath: "payment.demandType",
    beforeFieldChange: async (action, state, dispatch) => {

    },
    optionValue: "code",
    optionLabel: "name",
    data:[{name:"Monthly",code:"month"},{name:"Annual",code:"annual"}],
    gridDefination: {
        xs: 12,
        sm: 6
    },
    errorMessage: "ES_ERR_DEMAND_TYPE_FIELD",
    placeholder: {
      labelName: "Select Demand Type",
      labelKey: "ES_SELECTDEMAND_TYPE_LABEL"
  },
    required: true,
    visible: true
  }

  const paymentDate = {
    label: {
      labelName: "Date of Payment",
      labelKey: "ES_DATE_OF_PAYMENT"
    },
    placeholder: {
        labelName: "Enter Date of paymet",
        labelKey: "ES_DATE_OF_PAYMENT_PLACEHOLDER"
    },
    required: true,
    pattern: getPattern("Date"),
    jsonPath: "payment.dateOfPayment",
    visible: process.env.REACT_APP_NAME !== "Citizen",
    props: {
      inputProps: {
        max: getTodaysDateInYMD()
    }
    },
    afterFieldChange: (action, state, dispatch) => {
      dispatch(prepareFinalObject(
        "payment.dateOfPayment", convertDateToEpoch(action.value)
      ))
    }
  }

  const paymentAmount = {
    label: {
        labelName: "Amount",
        labelKey: "ES_AMOUNT_LABEL"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    minLength: 3,
    maxLength: 7,
    errorMessage: "ES_ERR_AMOUNT_FIELD",
    placeholder: {
      labelName: "Enter amount",
      labelKey: "ES_ENTER_AMOUNT_PLACEHOLDER"
  },
    required: true,
    jsonPath: "payment.paymentAmount"
  }

  const bankName = {
    label: {
        labelName: "Bank Name",
        labelKey: "ES_BANK_NAME_LABEL"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    errorMessage: "ES_ERR_BANK_NAME_FIELD",
    placeholder: {
      labelName: "Enter Bank Name",
      labelKey: "ES_ENTER_BANK_NAME_PLACEHOLDER"
  },
    required: true,
    jsonPath: "payment.bankName",
    visible: process.env.REACT_APP_NAME !== "Citizen"
  }

  const transactionId = {
    label: {
        labelName: "Transaction ID",
        labelKey: "ES_TRANSACTION_ID_LABEL"
    },
    gridDefination: {
        xs: 12,
        sm: 6
    },
    errorMessage: "ES_ERR_TRANSACTION_ID_FIELD",
    placeholder: {
      labelName: "Enter Transaction ID",
      labelKey: "ES_ENTER_TRANSACTION_ID_PLACEHOLDER"
    },
    required: true,
    jsonPath: "payment.transactionNumber",
    visible: process.env.REACT_APP_NAME !== "Citizen"
  }

//   export const applicationOfflinePaymentDetails = getCommonCard({
//     header: paymentDetailsHeader,
//     detailsContainer: getCommonContainer({
//         dateOfPayment: getDateField(paymentDate),
//         bankName: getTextField(bankName),
//         transactionId: getTextField(transactionId)
//     })
//   })
  
  export const paymentDetails = getCommonCard({
      header: paymentDetailsHeader,
      detailsContainer: getCommonContainer({
        // paymentType: getSelectField(paymentType),
        Amount: getTextField(paymentAmount),
        dateOfPayment: getDateField(paymentDate),
        bankName: getTextField(bankName),
        transactionId: getTextField(transactionId),
        comments : getTextField(commentsField)
      })
  })

  export const demandType = getCommonCard({
    header: demandTypeHeader,
    detailsContainer: getCommonContainer({
      paymentType: getSelectField(paymentType)
    })
})
  
  const propertyDetails = getCommonCard(propertyInfo(false))

  const detailsContainer = {
    uiFramework: "custom-atoms",
    componentPath: "Form",
    props: {
      id: "apply_form1"
    },
    children: {
      propertyDetails,
      demandType,
      breakAfterSearch: getBreak(),
      demandResults,
      paymentDetails
    },
    visible: true
  }

  const goToPayment = async (state, dispatch, type) => {
    // let isValid = true;
    // let isValidAmount = false;
    // let {paymentAmount} = state.screenConfiguration.preparedFinalObject.payment
    // let amountValue = paymentAmount
    // // let amountValue = get(state.screenConfiguration.screenConfig["estate-payment"],"components.div.children.detailsContainer.children.offlinePaymentDetails.children.cardContent.children.detailsContainer.children.Amount.props.value")
    // isValid = validateFields("components.div.children.detailsContainer.children.offlinePaymentDetails.children.cardContent.children.detailsContainer.children", state, dispatch, "estate-payment")
    // if (!(Number.isInteger(parseInt(amountValue)) && amountValue.length >= 3 && amountValue.length <= 7)) {
  
    //   let errorMessage = {
    //     labelName:
    //         "Please enter value between 3 and 7 digits",
    //     labelKey: "ES_ERR_VALUE_BETWEEN_3_AND_7_DIGITS"
    // };
    
    // dispatch(toggleSnackbar(true, errorMessage, "warning"));
    // }
    
    // if(!!isValid && ((Number.isInteger(parseInt(amountValue)) && amountValue.length >= 3 && amountValue.length <= 7))) {
    //   const propertyId = getQueryArg(window.location.href, "propertyId")
    //   const offlinePaymentDetails = get(state.screenConfiguration.preparedFinalObject, "payment")
    //   const {paymentAmount, paymentType, ...rest} = offlinePaymentDetails
    //   switch(paymentType){
    //     case 'PAYMENTTYPE.PENALTY':
    //       const PenaltyStatementSummary = get(state.screenConfiguration.preparedFinalObject, "PenaltyStatementSummary")
    //       const {totalPenaltyDue} = PenaltyStatementSummary
    //       if(Number(amountValue) > Number(totalPenaltyDue)){
    //         let errorMessage = {
    //           labelName:
    //               "Amount Cannot be greater than total penalty due",
    //           labelKey: "ES_PENALTY_AMOUNT_ERR"
    //       };
    //       dispatch(toggleSnackbar(true, errorMessage, "warning"));
    //       }else{
    //         isValidAmount = true
    //       }

    //       break;
    //     case 'PAYMENTTYPE.EXTENSIONFEE':
    //         const ExtensionFeeStatementSummary = get(state.screenConfiguration.preparedFinalObject, "ExtensionFeeStatementSummary")
    //         const {totalExtensionFeeDue} = ExtensionFeeStatementSummary
    //         if(Number(amountValue) > Number(totalExtensionFeeDue)){
    //           let errorMessage = {
    //             labelName:
    //                 "Amount Cannot be greater than total extension fee Due",
    //             labelKey: "ES_EXTENSION_AMOUNT_ERR"
    //         };
    //         dispatch(toggleSnackbar(true, errorMessage, "warning"));
    //         }else{
    //           isValidAmount = true
    //         }
    //       break;
    //     case 'PAYMENTTYPE.SECURITYFEE':
    //         const SecurityStatementSummary = get(state.screenConfiguration.preparedFinalObject, "SecurityStatementSummary")
    //         const {totalSecurityDepositDue} = SecurityStatementSummary
    //         if(Number(amountValue) > Number(totalSecurityDepositDue)){
    //           let errorMessage = {
    //             labelName:
    //                 "Amount Cannot be greater than total security fee due",
    //             labelKey: "ES_SECURITY_AMOUNT_ERR"
    //         };
    //         dispatch(toggleSnackbar(true, errorMessage, "warning"));
    //         }else{
    //           isValidAmount = true
    //         } 
    //       break;
    //     default :
    //     isValidAmount = true
    //   }
    //   if(!!propertyId && isValidAmount) {
    //     const payload = [
    //       { id: propertyId, 
    //         propertyDetails: {
    //           offlinePaymentDetails: [{...rest, amount: paymentAmount, paymentType}]
    //         }
    //       }
    //     ]
    //     try {
    //       const url = paymentType === "PAYMENTTYPE.PENALTY" ? "/est-services/violation/_penalty_payment" : paymentType === "PAYMENTTYPE.EXTENSIONFEE" ? "/est-services/extension-fee/_payment" : paymentType === "PAYMENTTYPE.SECURITYFEE" ? "/est-services/security_deposit/_payment" : "/est-services/property-master/_payrent"
    //       const response = await httpRequest("post",
    //       url,
    //       "",
    //       [],
    //       { Properties : payload })
    //       if(!!response && ((!!response.Properties && !!response.Properties.length) || (!!response.OfflinePayments && !!response.OfflinePayments.length))) {
    //         let {rentPaymentConsumerCode,fileNumber, tenantId, consumerCode} = !!response.Properties ? response.Properties[0] : response.OfflinePayments[0]
    //         rentPaymentConsumerCode = rentPaymentConsumerCode || consumerCode;
    //         let billingBuisnessService=!!response.Properties ? response.Properties[0].propertyDetails.billingBusinessService : response.OfflinePayments[0].billingBusinessService
    //         type === "ONLINE" ? dispatch(
    //           setRoute(
    //            `/estate-citizen/pay?consumerCode=${rentPaymentConsumerCode}&tenantId=${tenantId}&businessService=${billingBuisnessService}`
    //           )
    //         ) : dispatch(
    //           setRoute(
    //           `acknowledgement?purpose=pay&applicationNumber=${rentPaymentConsumerCode}&status=success&tenantId=${tenantId}&type=${billingBuisnessService}&fileNumber=${fileNumber}`
    //           )
    //         )
    //       dispatch(prepareFinalObject("Properties", response.Properties))
    //       }
    //     } catch (error) {
    //       console.log("error", error)
    //     }
    //   }
    // }
  }
  
  export const getCommonApplyFooter = children => {
    return {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "apply-wizard-footer"
      },
      children
    };
  };

  const paymentFooter = getCommonApplyFooter({
    makePayment: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px",
          marginRight: "45px",
          borderRadius: "inherit"
        }
      },
      children: {
        submitButtonLabel: getLabel({
          labelName: "MAKE PAYMENT",
          labelKey: "COMMON_MAKE_PAYMENT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: (state, dispatch) => {
          const paymentType = process.env.REACT_APP_NAME === "Citizen" ? "ONLINE" : "OFFLINE"
          goToPayment(state, dispatch, paymentType)
        },
      },
      visible: true
    }
  })

const manimajraPayment = {
    uiFramework: "material-ui",
    name: "manimajra-payment",
    beforeInitScreen: (action, state, dispatch) => {
      beforeInitFn(action, state, dispatch);
      return action
    },
    components: {
        div: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            className: "common-div-css"
          },
          children: {
            headerDiv: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              children: {
                header: {
                  gridDefination: {
                    xs: 12,
                    sm: 10
                  },
                  ...header
                }
              }
            },
            detailsContainer :  detailsContainer,
            footer: paymentFooter
          }
        }
      }
}

export default manimajraPayment;