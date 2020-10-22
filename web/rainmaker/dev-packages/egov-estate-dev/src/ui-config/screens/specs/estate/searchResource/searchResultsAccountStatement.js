import React from "react";
import {
  sortByEpoch,
  getEpochForDate,
} from "../../utils";
// import { getTextToLocalMapping } from "./searchFunctions";
import {
  getTextToLocalMapping
} from "../../utils/index";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";

export const MONTH = getTextToLocalMapping("ES_COMMON_TABLE_COL_MONTH")
export const RENT_DUE = getTextToLocalMapping("ES_COMMON_TABLE_COL_RENT_DUE") + " (₹)"
export const RECEIPT_NO = getTextToLocalMapping("ES_COMMON_TABLE_RECEIPT_NO")
export const DATE = getTextToLocalMapping("ES_COMMON_TABLE_COL_DATE")
export const PENALTY_INTEREST = getTextToLocalMapping("ES_COMMON_TABLE_COL_PENALTY_INTEREST")
export const ST_GST_RATE = getTextToLocalMapping("ES_COMMON_TABLE_COL_ST_GST_RATE")
export const PAID = getTextToLocalMapping("ES_COMMON_TABLE_COL_PAID") + " (₹)"
export const DATE_OF_RECEIPT = getTextToLocalMapping("ES_COMMON_TABLE_COL_DATE_OF_RECEIPT")
export const NO_OF_DAYS = getTextToLocalMapping("ES_COMMON_TABLE_COL_NO_OF_DAYS")
export const INT_ON_DELAYED_PAYMENT_OF_GST = getTextToLocalMapping("ES_COMMON_TABLE_COL_INT_ON_DELAYED_PAYMENT_GST")


export const searchResultsAccountStatement = {
  uiFramework: "custom-molecules",
  moduleName: "egov-estate",
  componentPath: "Table",
  visible: true,
  props: {
    columns: [
        getTextToLocalMapping("Month"),
        getTextToLocalMapping("Rent Due"),
        getTextToLocalMapping("Receipt No."),
        getTextToLocalMapping("Date"),
        getTextToLocalMapping("Penalty/Interest"),
        getTextToLocalMapping("ST/GST rate"),
        getTextToLocalMapping("Paid"),
        getTextToLocalMapping("Date of Receipt"),
        getTextToLocalMapping("No. of days"),
        getTextToLocalMapping("Int. on delayed payment of GST"),
      {
        name: "propertyId",
        options: {
          display: false,
          viewColumns: true
        }
      }
    ],
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20]
    //   onRowClick: (row, index) => {
    //     onRowClick(row);
    //   }
    }
  }
};

export const accountStatementResults = {
  ...searchResultsAccountStatement,
  visible: false,
  props: {...searchResultsAccountStatement.props, 
    columns: [
    MONTH,
    RENT_DUE,
    RECEIPT_NO,
    DATE,
    PENALTY_INTEREST,
    ST_GST_RATE,
    PAID,
    DATE_OF_RECEIPT,
    NO_OF_DAYS,
    INT_ON_DELAYED_PAYMENT_OF_GST

      // {
      //   name: AMOUNT,
      //   options: {
      //     customBodyRender: value => (
      //       <span style={{ display: 'flex', justifyContent: 'right', flexDirection: 'row-reverse',marginBottom:'none'}}>
      //     {value}
      //   </span> 
      //     )
      //   }
      // },
    ],
    options: {...searchResultsAccountStatement.props.options,
      onRowClick: () => {},
      pagination: false,
      filter: false,
      download: true,
      print: true,
      search:false,
      viewColumns:false,
      responsive: "stacked",
      selectableRows: false,
    }
  }
}

// const onRowClick = rowData => {
//   const type = getQueryArg(window.location.href, "type")
//   window.location.href = process.env.REACT_APP_NAME === "Citizen" ? `estate-branch-apply?propertyId=${rowData[4]}` : `apply?propertyId=${rowData[4]}&applicationType=${type}`
//   // window.location.href = `apply?propertyId=${rowData[4]}&applicationType=${type}`;
// };