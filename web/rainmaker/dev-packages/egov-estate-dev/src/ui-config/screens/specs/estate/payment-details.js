import {
    getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject,handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getSearchResults ,setXLSTableData } from "../../../../ui-utils/commons";
import {getReviewPayment} from './preview-resource/payment-details'
import {onTabChange, headerrow, tabs} from './search-preview'
import {paymentDetailsTable} from './applyResource/applyConfig'
import { getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";

const beforeInitFn = async (action, state, dispatch, filenumber) => {
  // dispatch(prepareFinalObject("workflow.ProcessInstances", []))
  if(filenumber){
      let queryObject = [
          { key: "filenumber", value: filenumber }
        ];
  //  const response =  await getSearchResults(queryObject);
   const response = 
    {
      "ResponseInfo": {
          "apiId": "Rainmaker",
          "ver": ".01",
          "ts": null,
          "resMsgId": "uief87324",
          "msgId": "20170310130900|en_IN",
          "status": "successful"
      },
      "Calculations": {
          "estateDemands": [
              {
                  "id": null,
                  "demandDate": 1549756800000,
                  "isPrevious": false,
                  "rent": 1000.0,
                  "penaltyInterest": 268.0,
                  "gstInterest": 3.91,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 180.0,
                  "noOfDays": 44.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1551398400000,
                  "isPrevious": false,
                  "rent": 2678.0,
                  "penaltyInterest": 268.0,
                  "gstInterest": 5.94,
                  "gst": 18,
                  "collectedRent": 5356.0,
                  "collectedGST": 482.0,
                  "noOfDays": 25.0,
                  "paid": 964.0
              },
              {
                  "id": null,
                  "demandDate": 1554076800000,
                  "isPrevious": false,
                  "rent": 2678.0,
                  "penaltyInterest": 268.0,
                  "gstInterest": 30.43,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 482.0,
                  "noOfDays": 128.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1556668800000,
                  "isPrevious": false,
                  "rent": 2678.0,
                  "penaltyInterest": 268.0,
                  "gstInterest": 23.3,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 482.0,
                  "noOfDays": 98.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1559347200000,
                  "isPrevious": false,
                  "rent": 2678.0,
                  "penaltyInterest": 268.0,
                  "gstInterest": 15.93,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 482.0,
                  "noOfDays": 67.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1561939200000,
                  "isPrevious": false,
                  "rent": 2678.0,
                  "penaltyInterest": 268.0,
                  "gstInterest": 8.8,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 482.0,
                  "noOfDays": 37.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1564617600000,
                  "isPrevious": false,
                  "rent": 2678.0,
                  "penaltyInterest": 268.0,
                  "gstInterest": 47.54,
                  "gst": 18,
                  "collectedRent": 10712.0,
                  "collectedGST": 482.0,
                  "noOfDays": 200.0,
                  "paid": 1928.0
              },
              {
                  "id": null,
                  "demandDate": 1567296000000,
                  "isPrevious": false,
                  "rent": 2813.0,
                  "penaltyInterest": 281.0,
                  "gstInterest": 42.2,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 506.0,
                  "noOfDays": 169.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1569888000000,
                  "isPrevious": false,
                  "rent": 2813.0,
                  "penaltyInterest": 281.0,
                  "gstInterest": 34.71,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 506.0,
                  "noOfDays": 139.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1572566400000,
                  "isPrevious": false,
                  "rent": 2813.0,
                  "penaltyInterest": 281.0,
                  "gstInterest": 26.97,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 506.0,
                  "noOfDays": 108.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1575158400000,
                  "isPrevious": false,
                  "rent": 2813.0,
                  "penaltyInterest": 281.0,
                  "gstInterest": 19.48,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 506.0,
                  "noOfDays": 78.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1577836800000,
                  "isPrevious": false,
                  "rent": 2813.0,
                  "penaltyInterest": 281.0,
                  "gstInterest": 38.45,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 506.0,
                  "noOfDays": 154.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1580515200000,
                  "isPrevious": false,
                  "rent": 2813.0,
                  "penaltyInterest": 281.0,
                  "gstInterest": 30.71,
                  "gst": 18,
                  "collectedRent": 12956.0,
                  "collectedGST": 506.0,
                  "noOfDays": 123.0,
                  "paid": 2844.0
              },
              {
                  "id": null,
                  "demandDate": 1583020800000,
                  "isPrevious": false,
                  "rent": 2813.0,
                  "penaltyInterest": 281.0,
                  "gstInterest": 23.47,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 506.0,
                  "noOfDays": 94.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1585699200000,
                  "isPrevious": false,
                  "rent": 3094.0,
                  "penaltyInterest": 309.0,
                  "gstInterest": 26.64,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 557.0,
                  "noOfDays": 97.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1588291200000,
                  "isPrevious": false,
                  "rent": 3094.0,
                  "penaltyInterest": 309.0,
                  "gstInterest": 18.4,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 557.0,
                  "noOfDays": 67.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1590969600000,
                  "isPrevious": false,
                  "rent": 3094.0,
                  "penaltyInterest": 309.0,
                  "gstInterest": 9.89,
                  "gst": 18,
                  "collectedRent": 10712.0,
                  "collectedGST": 557.0,
                  "noOfDays": 36.0,
                  "paid": 1928.0
              },
              {
                  "id": null,
                  "demandDate": 1593561600000,
                  "isPrevious": false,
                  "rent": 3094.0,
                  "penaltyInterest": 309.0,
                  "gstInterest": 24.99,
                  "gst": 18,
                  "collectedRent": 8034.0,
                  "collectedGST": 557.0,
                  "noOfDays": 91.0,
                  "paid": 1446.0
              },
              {
                  "id": null,
                  "demandDate": 1596240000000,
                  "isPrevious": false,
                  "rent": 3094.0,
                  "penaltyInterest": 309.0,
                  "gstInterest": 16.48,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 557.0,
                  "noOfDays": 60.0,
                  "paid": 0.0
              },
              {
                  "id": null,
                  "demandDate": 1598918400000,
                  "isPrevious": false,
                  "rent": 3094.0,
                  "penaltyInterest": 309.0,
                  "gstInterest": 7.96,
                  "gst": 18,
                  "collectedRent": 0.0,
                  "collectedGST": 557.0,
                  "noOfDays": 29.0,
                  "paid": 0.0
              }
          ],
          "estatePayments": [
              {
                  "receiptDate": 1553558400000,
                  "rentReceived": 5356.0,
                  "receiptNo": "3961/28"
              },
              {
                  "receiptDate": 1581897600000,
                  "rentReceived": 10712.0,
                  "receiptNo": "3978/35"
              },
              {
                  "receiptDate": 1591142400000,
                  "rentReceived": 12956.0,
                  "receiptNo": "4899/42"
              },
              {
                  "receiptDate": 1594080000000,
                  "rentReceived": 10712.0,
                  "receiptNo": "4874/18"
              },
              {
                  "receiptDate": 1601424000000,
                  "rentReceived": 8034.0,
                  "receiptNo": "4880/31"
              }
          ]
      }
  }
    if(!!response) {
      // let {demands, payments} = response.Properties[0];
      let {estateDemands, estatePayments} = response.Calculations;
      estateDemands = estateDemands || []
      estatePayments = estatePayments || []
      setXLSTableData({demands:estateDemands,payments:estatePayments, componentJsonPath: "components.div.children.paymentDetailsTable", screenKey: "payment-details"})
      // setXLSTableData({demands : estateDemands,payments: estatePayments, screenKey: "payment-details", componentJsonPath: "components.div.children.paymentDetailsTable"})
    }
  }
}


const EstatePaymentDetails = {
  uiFramework: "material-ui",
  name: "payment-details",
  beforeInitScreen: (action, state, dispatch) => {
    const fileNumber = getQueryArg(window.location.href, "filenumber");
    beforeInitFn(action, state, dispatch, fileNumber);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: {
              gridDefination: {
                xs: 12,
                sm: 8
              },
             ...headerrow
            },
            }
          },
          tabSection: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-estate",
            componentPath: "CustomTabContainer",
            props: {
              tabs,
              activeIndex: 6,
              onTabChange
            },
            type: "array",
          },
          breakAfterSearch: getBreak(),
          paymentDetailsTable
      }
    }
  }
};

export default EstatePaymentDetails;