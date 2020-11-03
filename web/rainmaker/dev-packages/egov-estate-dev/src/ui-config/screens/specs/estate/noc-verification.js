import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getCommonHeader,
  getCommonCard,
  getCommonContainer,
  getTextField,
  getSelectField,
  getPattern,
  getCommonGrayCard,
  getCommonTitle,
  getLabel, 
  getCommonSubHeader,
  getLabelWithValue,
  getDateField,
  getTodaysDateInYMD
} from "egov-ui-framework/ui-config/screens/specs/utils";
import commonConfig from "config/common.js";
import {
  httpRequest
} from "../../../../ui-utils";
import get from "lodash/get";
import {
  WF_ALLOTMENT_OF_SITE
} from "../../../../ui-constants";
import {
  getSearchResults
} from "../../../../ui-utils/commons";
import {
  getQueryArg
} from "egov-ui-framework/ui-utils/commons";
import { _getPattern } from "../utils"
import { size } from "lodash";

const beforeInitFn = (action, state, dispatch) => {

}


export const headerDiv = {
  uiFramework: "custom-atoms",
  componentPath: "Container",
  props: {
    style: {
      marginBottom: "10px"
    }
  }
}

const hardCopyDocumentsReceivedDateField = {
  label: {
    labelName: "Hard copy document(s) received date",
    labelKey: "ES_HARD_COPY_DOCUMENTS_RECEIVED_DATE_LABEL"
  },
  placeholder: {
    labelName: "Enter hard copy document(s) received date",
    labelKey: "ES_HARD_COPY_DOCUMENTS_RECEIVED_DATE_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  jsonPath: "Properties[0].propertyDetails.hardCopyDocumentsReceivedDate",
  props: {
    inputProps: {
      max: getTodaysDateInYMD()
    }
  }
}

export const documentReceivedDate = getCommonCard({
  detailsContainer: getCommonContainer({
    hardCopyDocumentsReceivedDate: getDateField(hardCopyDocumentsReceivedDateField)
  })
})

const houseNumberLabel = {
  labelName: "House Number",
  labelKey: "ES_HOUSE_NUMBER_LABEL"
}
const mohallaLabel = {
  labelName: "Mohalla",
  labelKey: "ES_MOHALLA_LABEL"
}
const villageLabel = {
  labelName: "Village",
  labelKey: "ES_VILLAGE_LABEL"
}

const propertyInfo = () => ({
  headerDiv: {
    ...headerDiv,
    children: {
      header: {
        gridDefination: {
          xs: 12,
          sm: 10
        },
        ...getCommonSubHeader({
          labelName: "Property INFO",
          labelKey: "ES_PROPERTY_INFO_HEADER"
        })
      },
    }
  },
  viewFour: getCommonContainer({
    houseNumber: getLabelWithValue(
      houseNumberLabel, {
        jsonPath: "Properties[0].propertyDetails.houseNumber"
      }
    ),
    mohalla: getLabelWithValue(
      mohallaLabel, {
        jsonPath: "Properties[0].propertyDetails.mohalla"
      }
    ),
    village: getLabelWithValue(
      villageLabel, {
        jsonPath: "Properties[0].propertyDetails.village"
      }
    )
  })
})

const propertyDetails = getCommonCard(propertyInfo(false))

const header = getCommonHeader({
  labelName: "NOC Verification",
  labelKey: "ES_NOC_VERIFICATION_HEADER"
});

const ownedByField = {
  label: {
      labelName: "Owned By",
      labelKey: "ES_OWNED_BY_LABEL"
  },
  placeholder: {
      labelName: "Enter Owned By",
      labelKey: "ES_OWNED_BY_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.ownedBy"
}

const soField = {
  label: {
      labelName: "S/O",
      labelKey: "ES_SO_LABEL"
  },
  placeholder: {
      labelName: "Enter S/O",
      labelKey: "ES_SO_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.so"
}

const getWhetherWholeHouseHasBeenPurchasedRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.whetherWholeHouseHasBeenPurchased",
  props: {
    label: {
      name: "Whether whole house has been purchased",
      key: "ES_WHETHER_WHOLE_HOUSE_HAS_BEEN_PURCHASED_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.whetherWholeHouseHasBeenPurchased",
    required: true,
  },
  required: true,
  type: "array",
};

const sizeOfAreaPurchasedField = {
  label: {
      labelName: "The size of area purchased",
      labelKey: "ES_SIZE_OF_AREA_PURCHASED_LABEL"
  },
  placeholder: {
      labelName: "Enter the size of area purchased",
      labelKey: "ES_SIZE_OF_AREA_PURCHASED_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  pattern: _getPattern("areaOfProperty"),
  required: true,
  jsonPath: "Properties[0].propertyDetails.areaSqft"
}

const khasraNoField = {
  label: {
      labelName: "Khasra No.",
      labelKey: "ES_KHASRA_NO_LABEL"
  },
  placeholder: {
      labelName: "Enter Khasra No.",
      labelKey: "ES_KHASRA_NO_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.khasraNumber"
}

const hadbastNoField = {
  label: {
      labelName: "Hadbast No.",
      labelKey: "ES_HADBAST_NO_LABEL"
  },
  placeholder: {
      labelName: "Enter Hadbast No.",
      labelKey: "ES_HADBAST_NO_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.hadbastNumber"
}

const mutationNoField = {
  label: {
      labelName: "Mutation No.",
      labelKey: "ES_MUTATION_NO_LABEL"
  },
  placeholder: {
      labelName: "Enter Mutation No.",
      labelKey: "ES_MUTATION_NO_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.mutationNumber"
}

const khewatNoField = {
  label: {
      labelName: "Khewat No.",
      labelKey: "ES_KHEWAT_NO_LABEL"
  },
  placeholder: {
      labelName: "Enter Khewat No.",
      labelKey: "ES_KHEWAT_NO_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.khewatNumber"
}

const housesOfEastField = {
  label: {
      labelName: "Area/ House under consideration is bounded by the houses of East",
      labelKey: "ES_HOUSES_OF_EAST_LABEL"
  },
  placeholder: {
      labelName: "Enter Area/ House under consideration is bounded by the houses of East",
      labelKey: "ES_HOUSES_OF_EAST_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.housesOfEast"
}

const housesOfWestField = {
  label: {
      labelName: "Area/ House under consideration is bounded by the houses of West",
      labelKey: "ES_HOUSES_OF_WEST_LABEL"
  },
  placeholder: {
      labelName: "Enter Area/ House under consideration is bounded by the houses of West",
      labelKey: "ES_HOUSES_OF_WEST_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.housesOfWest"
}

const housesOfNorthField = {
  label: {
      labelName: "Area/ House under consideration is bounded by the houses of North",
      labelKey: "ES_HOUSES_OF_NORTH_LABEL"
  },
  placeholder: {
      labelName: "Enter Area/ House under consideration is bounded by the houses of North",
      labelKey: "ES_HOUSES_OF_NORTH_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.housesOfNorth"
}

const housesOfSouthField = {
  label: {
      labelName: "Area/ House under consideration is bounded by the houses of South",
      labelKey: "ES_HOUSES_OF_SOUTH_LABEL"
  },
  placeholder: {
      labelName: "Enter Area/ House under consideration is bounded by the houses of South",
      labelKey: "ES_HOUSES_OF_SOUTH_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.housesOfSouth"
}

const widthOfFrontElevationOfHouseField = {
  label: {
      labelName: "Width of the front elevation of house (in ft.)",
      labelKey: "ES_WIDTH_OF_FRONT_ELEVATION_OF_HOUSE_LABEL"
  },
  placeholder: {
      labelName: "Enter width of the front elevation of house (in ft.)",
      labelKey: "ES_WIDTH_OF_FRONT_ELEVATION_OF_HOUSE_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.widthOfFrontElevationOfHouse"
}

const totalWidthOfPublicStreetField = {
  label: {
      labelName: "Total width of the public street (in ft.)",
      labelKey: "ES_TOTAL_WIDTH_OF_PUBLIC_STREET_LABEL"
  },
  placeholder: {
      labelName: "Enter total width of the public street (in ft.)",
      labelKey: "ES_TOTAL_WIDTH_OF_PUBLIC_STREET_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.totalWidthOfPublicStreet"
}

const getWhetherThereIsStreetOnOtherSideOfHouseRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.whetherThereIsStreetOnOtherSideOfHouse",
  props: {
    label: {
      name: "Whether there is street on the other side of house?",
      key: "ES_WHETHER_THERE_IS_STREET_ON_OTHER_SIDE_OF_HOUSE_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.whetherThereIsStreetOnOtherSideOfHouse",
    required: true,
  },
  required: true,
  type: "array",
};

const widthOfStreetWithLengthOfHouseField = {
  label: {
      labelName: "Width of the same with the length of house adjoining to that side of street",
      labelKey: "ES_WIDTH_OF_THE_STREET_WITH_LENGTH_OF_HOUSE_LABEL"
  },
  placeholder: {
      labelName: "Enter width of the same with the length of house adjoining to that side of street",
      labelKey: "ES_WIDTH_OF_THE_STREET_WITH_LENGTH_OF_HOUSE_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.widthOfStreetWithLengthOfHouse"
}

const getWhetherAreaOfHouseAtSiteIsSameRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.whetherThereIsStreetOnOtherSideOfHouse",
  props: {
    label: {
      name: "Whether the area of the house at site is the same",
      key: "ES_WHETHER_AREA_OF_HOUSE_AT_SITE_IS_SAME_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.whetherAreaOfHouseAtSiteIsSame",
    required: true,
  },
  required: true,
  type: "array",
};

const variationDetailField = {
  label: {
      labelName: "If there are any variations given, detail thereof",
      labelKey: "ES_VARIATION_DETAIL_LABEL"
  },
  placeholder: {
      labelName: "Enter If there are any variations given, detail thereof",
      labelKey: "ES_VARIATION_DETAIL_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.variationDetail"
}

const getWhetherHouseWithinLalLakirRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.houseWithinLalLakir",
  props: {
    label: {
      name: "Whether the house/ plot is within the Lal Lakir or within the unacquired abadi area?",
      key: "ES_WHETHER_HOUSE_WITHIN_LAL_LAKIR_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.houseWithinLalLakir",
    required: true,
  },
  required: true,
  type: "array",
};

const getElectricityMeterExistRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.electricityMeterExist",
  props: {
    label: {
      name: "Whether electricity meter exists?",
      key: "ES_WHETHER_ELECTRICITY_METER_EXIST_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.electricityMeterExist",
    required: true,
  },
  required: true,
  type: "array",
};

const getWaterMeterExistRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.waterMeterExist",
  props: {
    label: {
      name: "Whether water meter exists?",
      key: "ES_WHETHER_WATER_METER_EXIST_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.waterMeterExist",
    required: true,
  },
  required: true,
  type: "array",
};

const heightOfBuildingField = {
  label: {
      labelName: "The height of the building excluding mumty",
      labelKey: "ES_HEIGHT_OF_BUILDING_LABEL"
  },
  placeholder: {
      labelName: "Enter The height of the building excluding mumty",
      labelKey: "ES_HEIGHT_OF_BUILDING_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.heightOfBuilding"
}

const heightOfMumtyField = {
  label: {
      labelName: "The height of mumty",
      labelKey: "ES_HEIGHT_OF_MUMTY_LABEL"
  },
  placeholder: {
      labelName: "Enter The height of mumty",
      labelKey: "ES_HEIGHT_OF_MUMTY_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.heightOfMumty"
}

const getCattleKeptInPremisesRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.cattleKeptInPremises",
  props: {
    label: {
      name: "Are any milk cattle kept in the premises?",
      key: "ES_CATTLE_KEPT_IN_PREMISES_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.cattleKeptInPremises",
    required: true,
  },
  required: true,
  type: "array",
};

const getAnyCantileverRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.anyCantilever",
  props: {
    label: {
      name: "Is there any cantilever/ projection more than 3 feet over hanging structure existing at site falling over the Govt. land public street?",
      key: "ES_ANY_CANTILEVER_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.anyCantilever",
    required: true,
  },
  required: true,
  type: "array",
};

const cantileverDetailsField = {
  label: {
      labelName: "Cantilever Details",
      labelKey: "ES_CANTILEVER_DETAILS_LABEL"
  },
  placeholder: {
      labelName: "Enter Cantilever Details",
      labelKey: "ES_CANTILEVER_DETAILS_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.cantileverDetails"
}

const getAnyCommercialActivityGoingOnRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.anyCommercialActivityGoingOn",
  props: {
    label: {
      name: "Whether any commercial activity is going on Ground/ 1st floor/ 2nd floor of the house?",
      key: "ES_ANY_COMMERCIAL_ACTIVITY_GOING_ON_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.anyCommercialActivityGoingOn",
    required: true,
  },
  required: true,
  type: "array",
};

const getAnyBasementsOnRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.anyBasements",
  props: {
    label: {
      name: "Whether there exist any basements to the house?",
      key: "ES_ANY_BASEMENTS_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.anyBasements",
    required: true,
  },
  required: true,
  type: "array",
};

const otherViolationDetailsField = {
  label: {
      labelName: "Other violation, if any, give details thereof",
      labelKey: "ES_OTHER_VIOLATION_DETAILS_LABEL"
  },
  placeholder: {
      labelName: "Enter other violation",
      labelKey: "ES_OTHER_VIOLATION_DETAILS_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.otherViolation"
}

const getRecommendedForIssueOfNocOnRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.recommendedForIssueOfNoc",
  props: {
    label: {
      name: "Whether recommended for issue of NOC or not?",
      key: "ES_RECOMMENDED_FOR_ISSUE_OF_NOC_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.recommendedForIssueOfNoc",
    required: true,
  },
  required: true,
  type: "array",
};

const reasonForNotIssuingNocField = {
  label: {
      labelName: "Reason for not issuing NOC",
      labelKey: "ES_REASON_FOR_NOT_ISSUING_NOC_LABEL"
  },
  placeholder: {
      labelName: "Enter reason for not issuing NOC",
      labelKey: "ES_REASON_FOR_NOT_ISSUING_NOC_PLACEHOLDER"
  },
  gridDefination: {
      xs: 12,
      sm: 6
  },
  required: true,
  jsonPath: "Properties[0].propertyDetails.reasonForNotIssuingNoc"
}

const getArchitectsReportRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.architectsReport",
  props: {
    label: {
      name: "Architect’s report, whether recommended for NOC or not?",
      key: "ES_ARCHITECTS_REPORT_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.architectsReport",
    required: true,
  },
  required: true,
  type: "array",
};

const getFireNocRadioButton = {
  uiFramework: "custom-containers",
  componentPath: "RadioGroupContainer",
  gridDefination: {
    xs: 12,
    sm: 6,
  },
  jsonPath: "Properties[0].propertyDetails.fireNoc",
  props: {
    label: {
      name: "Fire NOC for commercial buildings?",
      key: "ES_FIRE_NOC_LABEL"
    },
    buttons: [{
        labelName: "Yes",
        labelKey: "ES_COMMON_YES",
        value: "true",
      },
      {
        label: "No",
        labelKey: "ES_COMMON_NO",
        value: "false",
      }
    ],
    jsonPath: "Properties[0].propertyDetails.fireNoc",
    required: true,
  },
  required: true,
  type: "array",
};

const dateOfVisitField = {
  label: {
    labelName: "Date of Visit",
    labelKey: "ES_DATE_OF_VISIT_LABEL"
  },
  placeholder: {
    labelName: "Enter Date of Visit",
    labelKey: "ES_DATE_OF_VISIT_PLACEHOLDER"
  },
  pattern: getPattern("Date"),
  jsonPath: "Properties[0].propertyDetails.dateOfVisit",
  props: {
    inputProps: {
      max: getTodaysDateInYMD()
    }
  }
}

export const commentField = {
  label: {
    labelName: "Comment",
    labelKey: "ES_COMMENT_LABEL"
  },
  placeholder: {
    labelName: "Enter Comment",
    labelKey: "ES_COMMENT_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  props: {
    multiline: true,
    rows: 2
  },
  pattern: _getPattern("alphabet"),
  jsonPath: "Properties[0].propertyDetails.comment"
}

export const auditTrailDetailsField = {
  label: {
    labelName: "Audit Trail Details",
    labelKey: "ES_AUDIT_TRAIL_DETAILS_LABEL"
  },
  placeholder: {
    labelName: "Audit Trail Details",
    labelKey: "ES_AUDIT_TRAIL_DETAILS_PLACEHOLDER"
  },
  gridDefination: {
    xs: 12,
    sm: 6
  },
  required: true,
  props: {
    multiline: true,
    rows: 2
  },
  pattern: _getPattern("alphabet"),
  jsonPath: "Properties[0].propertyDetails.auditTrailDetails"
}


export const nocVerificationDetails = getCommonCard({
  detailsContainer: getCommonContainer({
    ownedBy: getTextField(ownedByField),
    so: getTextField(soField),
    houseHasBeenPurchased: getWhetherWholeHouseHasBeenPurchasedRadioButton,
    sizeOfAreaPurchased: getTextField(sizeOfAreaPurchasedField),
    khasraNo: getTextField(khasraNoField),
    hadbastNo: getTextField(hadbastNoField),
    mutationNo: getTextField(mutationNoField),
    khewatNo: getTextField(khewatNoField),
    housesOfEast: getTextField(housesOfEastField),
    housesOfWest: getTextField(housesOfWestField),
    housesOfNorth: getTextField(housesOfNorthField),
    housesOfSouth: getTextField(housesOfSouthField),
    widthOfFrontElevationOfHouse: getTextField(widthOfFrontElevationOfHouseField),
    totalWidthOfPublicStreet: getTextField(totalWidthOfPublicStreetField),
    streetOnOtherSideOfHouse: getWhetherThereIsStreetOnOtherSideOfHouseRadioButton,
    widthOfStreetWithLengthOfHouse: getTextField(widthOfStreetWithLengthOfHouseField),
    areaOfHouseAtSiteIsSame: getWhetherAreaOfHouseAtSiteIsSameRadioButton,
    variationDetail: getTextField(variationDetailField),
    houseWithinLalLakir: getWhetherHouseWithinLalLakirRadioButton,
    electricityMeterExists: getElectricityMeterExistRadioButton,
    waterMeterExists: getWaterMeterExistRadioButton,
    heightOfBuilding: getTextField(heightOfBuildingField),
    heightOfMumty: getTextField(heightOfMumtyField),
    cattleKeptInPremises: getCattleKeptInPremisesRadioButton,
    anyCantilever: getAnyCantileverRadioButton,
    cantileverDetails: getTextField(cantileverDetailsField),
    commercialActivityGoingOn: getAnyCommercialActivityGoingOnRadioButton,
    anyBasements: getAnyBasementsOnRadioButton,
    otherViolationDetails: getTextField(otherViolationDetailsField),
    recommendedForIssueOfNoc: getRecommendedForIssueOfNocOnRadioButton,
    reasonForNotIssuingNoc: getTextField(reasonForNotIssuingNocField),
    architectsReport: getArchitectsReportRadioButton,
    fireNoc: getFireNocRadioButton,
    dateOfVisit: getDateField(dateOfVisitField),
    comment: getTextField(commentField),
    auditTrailDetails: getTextField(auditTrailDetailsField)
  })
})

const detailsContainer = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    documentReceivedDate,
    propertyDetails,
    nocVerificationDetails
  },
  visible: true
}

const nocVerification = {
  uiFramework: "material-ui",
  name: "noc-verfication",
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
        taskStatus: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-estate",
          componentPath: "WorkFlowContainer",
          props: {
            dataPath: "Properties",
            moduleName: WF_ALLOTMENT_OF_SITE,
            updateUrl: "/est-services/property-master/_update",
            style: {
              wordBreak: "break-word"
            }
          }
        },
        detailsContainer
      }
    }
  }
}

export default nocVerification;