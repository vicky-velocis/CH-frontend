import React, { Component } from "react";
import { Card, Image, Icon, Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import isEmpty from "lodash/isEmpty";
import "./index.css";

class PayDetails extends Component {
  
  

render() {
const {amount, cGST, utGST, location,facilationChargesSuccess,result} = this.props














let num = 100.000;
let TotalAmountSp = parseInt(amount) + parseInt(cGST) + parseInt(utGST) + parseInt(num);
console.log("TotalAmountSp--",TotalAmountSp)
let number2 = Math.round((TotalAmountSp + Number.EPSILON) * 100) / 100
console.log("number2--",number2)

let ERamount = Math.round((amount + Number.EPSILON) * 100) / 100
console.log("ERamount--",ERamount)
let ERcGST = Math.round((cGST + Number.EPSILON) * 100) / 100
console.log("ERcGST--",ERcGST)
let ERutGST = Math.round((cGST + Number.EPSILON) * 100) / 100
console.log("ERutGST--",ERutGST)

let NewRamount =  (Math.round(amount * 100) / 100).toFixed(0);
console.log("NewRamount--",NewRamount)

let newRcGST = (Math.round(cGST * 100) / 100).toFixed(2);
console.log("newRcGST--",newRcGST)
let newRutGST = (Math.round(utGST * 100) / 100).toFixed(2);
console.log("newRutGST--",newRutGST)

let Ramount =  (Math.round(amount * 100) / 100).toFixed(2);
console.log("Ramount--",Ramount)
let RcGST = (Math.round(cGST * 100) / 100).toFixed(2);
console.log("RcGST--",RcGST)
let RutGST = (Math.round(utGST * 100) / 100).toFixed(2);
console.log("RutGST--",RutGST)
let Rnum = (Math.round(num * 100) / 100).toFixed(2);
console.log("Rnum--",Rnum)

let RTAmount = Ramount + RcGST + RutGST + Rnum;
console.log("RTAmount--",RTAmount)
let NumRTAmount = +RTAmount
console.log("NumRTAmount--",NumRTAmount)
let pRamount = parseInt(RTAmount);
console.log("pRamount--",pRamount)

let RoundAmount = (Math.round(TotalAmountSp * 100) / 100).toFixed(2);
console.log("RoundAmount--",RoundAmount)
    return (
      <div>
        <Card
          textChildren={
            <div>  
                <Label label="BK_MYBK_FEE_ESTIMATE" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
              {/* <div key={10} className="complaint-detail-full-width"> */}

              {/* <div className="rainmaker-displayInline row">
                <div className="col-md-4">
                  <Label label="BK_MYBK_FEE_ESTIMATE" containerStyle={{ marginLeft: "13px" }} labelClassName="dark-heading" />
                </div> */}
                {/* <div style={{right: '50px',position: 'absolute'}}>
                  <h5><Label label="BK_TOTAL_AMOUNT" /></h5>
                  <h3 style={{marginTop: '-8px',fontSize: '28px',color: 'black'}}><b>Rs {amount ? amount : 'NA'}</b></h3>
                </div> */}
              {/* </div> */}

              <div className="complaint-detail-detail-section-status row" style={{marginLeft:'-10px',marginTop:30}}>
                <div className="col-sm-4 col-xs-12">
                  <Label className="col-xs-12  col-sm-12 col-md-12 status-color" label="Amount" />
                </div>
                <div className="col-sm-4 col-xs-12"> 
                <h5 style={{ textAlign: "right" }}>{Ramount ? Ramount : 'NA'}</h5>
                </div>
              </div>

              <div className="complaint-detail-detail-section-status row" style={{marginLeft:'-10px'}}>
                <div className="col-sm-4 col-xs-12">
                  <Label className="col-xs-12  col-sm-12 col-md-12 status-color" label="BK_MYBK_UTGST_PLACEHOLDER" />
                </div>
                <div className="col-sm-4 col-xs-12">
                <h5 style={{ textAlign: "right" }}>{RcGST ? RcGST : 'NA'}</h5>
                </div>
              </div>
             

              <div className="complaint-detail-detail-section-status row" style={{marginLeft:'-10px'}}>
                <div className="col-sm-4 col-xs-12">
                  <Label className="col-xs-12  col-sm-12 col-md-12 status-color" label="BK_MYBK_CGST_PLACEHOLDER" />
                </div>
                <div className="col-sm-4 col-xs-12">
                <h5 style={{ textAlign: "right" }}>{RutGST ? RutGST : 'NA'}</h5>
                {/* <h5 style={{ textAlign: "right" }}>{location}</h5> */}
                </div>
              </div>

              <div className="complaint-detail-detail-section-status row" style={{marginLeft:'-10px'}}>
                <div className="col-sm-4 col-xs-12">
                  <Label className="col-xs-12  col-sm-12 col-md-12 status-color" label="Faciliation Charges" />
                </div>
                <div className="col-sm-4 col-xs-12">
                <h5 style={{ textAlign: "right" }}>{Rnum}</h5>
                {/* <h5 style={{ textAlign: "right" }}>{location}</h5> */}
                </div>
              </div>


              <div className="complaint-detail-detail-section-status row" style={{marginLeft:'-10px'}}>
                <hr class="MuiDividerLine" style={{ marginbottom: "16px" }}></hr>
                <div className="col-sm-4 col-xs-12">
                  <Label className="col-xs-12  col-sm-12 col-md-12 status-color" label="BK_MYBK_TOTAL_AMOUNT" />
                </div>
                <div className="col-sm-4 col-xs-12">
                  <h5 style={{ textAlign: "right" }}>{RoundAmount ? RoundAmount:number2}</h5>
                </div>
              </div>

            {/* </div> */}
            </div>
             } 
          /> 
      </div>
    );
  }
}

export default PayDetails;