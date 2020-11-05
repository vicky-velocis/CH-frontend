import { Button,  TextField } from "components";
import { httpRequest } from "egov-ui-kit/utils/api";
import LoadingIndicator from "egov-ui-kit/components/LoadingIndicator";
import React, { Component } from 'react'
import { Toast } from "components";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
//import Button from "@material-ui/core/Button";
//import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
//import useMediaQuery from '@material-ui/core/useMediaQuery';
//import MenuItem from '@material-ui/core/MenuItem'
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import {
  MuiThemeProvider,createMuiTheme
} from "@material-ui/core/styles";
import { connect } from "react-redux";




const theme = createMuiTheme({
  
  
  typography: {
    
    fontSize: 20,
  },
 
  palette: {
    primary:{
      main : "#fe7a51"
    },
    secondary:{
      main : "#fe7a51"
    },
    
    textColor: "#5f5c62",
    canvasColor: "#F7F7F7",
    borderColor: "#e6e6e6"
  },

 
});



const styles= theme=>({
  space: {
    "& .MuiGrid-item": {
      padding: "20px"
    }
  },
  dialogStyle: {
    minWidth: '960px',
  },
 
  
  [theme.breakpoints.down('sm')]: {

   
    dialogStyle: {
      minWidth: '0px',
      maxWidth: '960px'
    }
  }



})



class DialogComponent extends Component {


    async componentDidMount(){
        this.setState({mdmsRes: this.props.mdmsResOsbm})

        if(this.props.updateData!=={})
        {
            this.setState({updateData: this.props.updateData})
        }else 
        {   
            this.setState({updateData: {}})
            
        }
    
     
    }

    componentDidUpdate(prevProps){
    
        
        if(this.props.updateData !== prevProps.updateData){

            this.setState({mdmsRes: this.props.mdmsResOsbm})
            this.setState({updateData: this.props.updateData, errors: {}})

            if(Object.keys(this.props.updateData).length === 0){
                this.setState({create: true})
            }else{
                this.setState({create: false})
            }
        }

    }
    


    state={

        updateData: {}, 
        errors: {},
        create: true, 
        mdmsRes: {}, 
      
    }


    validate (){

        let temp= {}
        const submitData= this.state.updateData
        temp.villageCity=submitData.villageCity? "": "This field is required"
        temp.residentialCommercial=submitData.residentialCommercial? "": "This field is required"
        temp.storage=submitData.storage? "": "This field is required"
        temp.durationInMonths=submitData.durationInMonths? "": "This field is required"
        temp.constructionType=submitData.constructionType? "": "This field is required"
        temp.amount=submitData.amount? "": "This field is required"

        this.setState({errors: temp})

        return Object.values(temp).every(x => x=="")
    }

    async handleSubmit  (){
        if(this.validate()){

           if(this.state.create===true)
           {
            var reqBody =  {
              
              "OsbmFeeDetails": [

                {

                  "villageCity": this.state.updateData.villageCity ,
                  "residentialCommercial": this.state.updateData.residentialCommercial,
                  "storage":this.state.updateData.storage,
                  "durationInMonths":this.state.updateData.durationInMonths,
                  "constructionType":this.state.updateData.constructionType,
                  "amount":this.state.updateData.amount

                }
               
               ]
              }
            const responseStatus = await httpRequest(
                  
              "bookings/master/osbm/fee/_create",
              "_search",
              [],
              reqBody
            );
            if(responseStatus.status== '200'){
              this.props.toggleSnackbarAndSetText(
                true,
                {labelName: "Create Successfull",
                labelKey: `Create Successfull`} ,
                "success"
              );
              }else{
              this.props.toggleSnackbarAndSetText(
                true,
                {labelName: "Create Failed.Try Again",
                labelKey: `Create Failed.Try Again`} ,
                "error"
              );
              }
              this.props.fetchTableData()
              this.props.handleClose()

            console.log(responseStatus, "createresponse")
          
              

    
           }
           else
           
           {

              var reqBody =  {
              
                "OsbmFeeDetails": [

                  {

                    "id": this.state.updateData.id,
                    "villageCity": this.state.updateData.villageCity ,
                    "residentialCommercial": this.state.updateData.residentialCommercial,
                    "storage":this.state.updateData.storage,
                    "durationInMonths":this.state.updateData.durationInMonths,
                    "constructionType":this.state.updateData.constructionType,
                    "amount":this.state.updateData.amount
  
                  }
                 
                 ]
                }
              const responseStatus = await httpRequest(
                    
                "bookings/master/osbm/fee/_update",
                "_search",
                [],
                reqBody
              );
              if(responseStatus.status== '200'){
              this.props.toggleSnackbarAndSetText(
                true,
                {labelName: "Update Successfull",
                labelKey: `Update Successfull`} ,
                "success"
              );
              }else{
              this.props.toggleSnackbarAndSetText(
                true,
                {labelName: "Update Failed.Try Again",
                labelKey: `Update Failed.Try Again`} ,
                "error"
              );
              }
              this.props.fetchTableData()
              this.props.handleClose()
              console.log(responseStatus, "createresponse")
            }
  
           
        }
        
    }
    
    render() {
           
       
        console.log(this.state.mdmsRes, "owl")
       
        const {classes} =this.props
        return (

      
        Object.keys(this.state.mdmsRes).length === 0?<LoadingIndicator status="loading" loadingColor="#fe7a51" /> :
        
        <MuiThemeProvider theme={theme}>
        <div> <LoadingIndicator status="hide" /> 
        <div>

        <Dialog
            classes={{ paper :classes.dialogStyle}}
            minWidth="md"
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="form-dialog-title"
         >
        <DialogTitle id="form-dialog-title">Edit Open Space Fee Master</DialogTitle>
         
        <DialogContent style={{overflow:'hidden'}}>
          <DialogContentText>
            Please fill the form to update fee master of OSBM
          </DialogContentText>
          <Grid container spacing={2} className={classes.space} >
            <Grid item sm={6} xs={12}>
            <SelectField
           //id="villageCity"
            hintText={"Village/City"}
            underlineDisabledStyle={{ background: "blue" }}
            dropDownMenuProps={{
              targetOrigin: { horizontal: "left", vertical: "top" }
            }}
            floatingLabelFixed={true}
            floatingLabelText={
              <span style={{fontSize:17, fontWeight: 200}}>
                {"Village/City"}{" "}
                <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
              </span>
            }
            value={this.state.updateData.villageCity} 
            onChange={(event, key, value)=> { 
            
              let updateData =this.state.updateData
              updateData.villageCity= value
              let errors= {...this.state.errors}
              errors.villageCity=""
              this.setState({updateData: updateData, errors: errors})

            }}
            fullWidth={true}
            maxHeight={200}
            errorText={ this.state.errors && this.state.errors.villageCity}
          >
            {this.state.mdmsRes.VillageCity.map((dd, index)=>{
              
              return <MenuItem value={dd.code} key={index} primaryText={dd.name} />
             })}
          
          </SelectField>
          <SelectField
           //id="villageCity"
            hintText={"City Type"}
            underlineDisabledStyle={{ background: "blue" }}
            dropDownMenuProps={{
              targetOrigin: { horizontal: "left", vertical: "top" }
            }}
            floatingLabelFixed={true}
            floatingLabelText={
              <span style={{fontSize:17, fontWeight: 200}}>
                {"City Type"}{" "}
                <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
              </span>
            }
            value={this.state.updateData.residentialCommercial} 
            onChange={(event, key, value)=> { 
            
              let updateData =this.state.updateData
              updateData.residentialCommercial= value
              let errors= {...this.state.errors}
              errors.residentialCommercial=""
              this.setState({updateData: updateData, errors: errors})

            }}
            fullWidth={true}
            maxHeight={200}
            errorText={ this.state.errors && this.state.errors.residentialCommercial}
          >
            {this.state.mdmsRes.CityType.map((dd, index)=>{
              
              return <MenuItem value={dd.code} key={index} primaryText={dd.name} />
             })}
          
          </SelectField>  

          {this.state.updateData.constructionType==="New"?
             
             <SelectField
        
              hintText={"Duration"}
              underlineDisabledStyle={{ background: "blue" }}
              dropDownMenuProps={{
                targetOrigin: { horizontal: "left", vertical: "top" }
              }}
              floatingLabelFixed={true}
              floatingLabelText={
                <span style={{fontSize:17, fontWeight: 200}}>
                  {"Duration"}{" "}
                  <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
                </span>
              }
              value={this.state.updateData.durationInMonths} 
              onChange={(event, key, value)=> { 
              
                let updateData =this.state.updateData
                updateData.durationInMonths= value
                let errors= {...this.state.errors}
                errors.durationInMonths=""
                this.setState({updateData: updateData, errors: errors})
  
              }}
              fullWidth={true}
              maxHeight={200}
              errorText={ this.state.errors && this.state.errors.durationInMonths}
            >
             
               
             <MenuItem value={this.state.mdmsRes.Duration[5].code}  primaryText={this.state.mdmsRes.Duration[5].name} />
             
            
            </SelectField>
           :
          <SelectField
           //id="villageCity"
            hintText={"Duration"}
            underlineDisabledStyle={{ background: "blue" }}
            dropDownMenuProps={{
              targetOrigin: { horizontal: "left", vertical: "top" }
            }}
            floatingLabelFixed={true}
            floatingLabelText={
              <span style={{fontSize:14, fontWeight: 200}}>
                {"Duration"}{" "}
                <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
              </span>
            }
            value={this.state.updateData.durationInMonths} 
            onChange={(event, key, value)=> { 
            
              let updateData =this.state.updateData
              updateData.durationInMonths= value
              let errors= {...this.state.errors}
              errors.durationInMonths=""
              this.setState({updateData: updateData, errors: errors})

            }}
            fullWidth={true}
            maxHeight={200}
            errorText={ this.state.errors && this.state.errors.durationInMonths}
          >
            {this.state.mdmsRes.Duration.map((dd, index)=>{
              return <MenuItem value={dd.code} key={index} primaryText={dd.name} />
             })}
          
          </SelectField>
          }
            </Grid>
            <Grid item sm={6} xs={12}>
            <SelectField
           //id="villageCity"
            hintText={"Area"}
            underlineDisabledStyle={{ background: "blue" }}
            dropDownMenuProps={{
              targetOrigin: { horizontal: "left", vertical: "top" }
            }}
            floatingLabelFixed={true}
            floatingLabelText={
              <span style={{fontSize:17, fontWeight: 200}}>
                {"Area"}{" "}
                <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
              </span>
            }
            value={this.state.updateData.storage} 
            onChange={(event, key, value)=> { 
            
              let updateData =this.state.updateData
              updateData.storage= value
              let errors= {...this.state.errors}
              errors.storage=""
              this.setState({updateData: updateData, errors: errors})

            }}
            fullWidth={true}
            maxHeight={200}
            errorText={ this.state.errors && this.state.errors.storage}
          >
            {this.state.mdmsRes.Area.map((dd, index)=>{
              
              return <MenuItem value={dd.code} key={index} primaryText={dd.name} />
             })}
          
          </SelectField>
          <SelectField
           //id="villageCity"
            hintText={"Type of Construction"}
            underlineDisabledStyle={{ background: "blue" }}
            dropDownMenuProps={{
              targetOrigin: { horizontal: "left", vertical: "top" }
            }}
            floatingLabelFixed={true}
            floatingLabelText={
              <span style={{fontSize:17, fontWeight: 200}}>
                {"Type of Construction"}{" "}
                <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
              </span>
            }
            value={this.state.updateData.constructionType} 
            onChange={(event, key, value)=> { 
            
              let updateData =this.state.updateData
              updateData.constructionType= value
              let errors= {...this.state.errors}
              errors.constructionType=""
              this.setState({updateData: updateData, errors: errors})

            }}
            fullWidth={true}
            maxHeight={200}
            errorText={ this.state.errors && this.state.errors.constructionType}
          >
            {this.state.mdmsRes.Type_of_Construction.map((dd, index)=>{
              
              return <MenuItem value={dd.code} key={index} primaryText={dd.name} />
             })}
          
          </SelectField>
          
          <TextField
                    id="amount"
                    name="amount"
                    type="number"
                    floatingLabelFixed={true}
                    
                    value={this.state.updateData.amount}
                    hintText={"Amount"}
                    floatingLabelText={
                      <span style={{fontSize:14, fontWeight: 200}}>
                      {"Amount"}{" "}
                      <span style={{ color: "#FF0000" }}>{true ? " *" : ""}</span>
                    </span>
                    }
                    onChange={(e, value) => {
                      let updateData = {...this.state.updateData}
                      let errors= {...this.state.errors}
                      errors.amount=""
                      updateData.amount= value
                      this.setState({updateData:updateData, errors:errors})
                    }}
                    underlineStyle={{ bottom: 7 }}
                    underlineFocusStyle={{ bottom: 7 }}
                    hintStyle={{ width: "100%", color: "rgb(150, 150, 150)", fontSize: 14 }}
                    errorText={ this.state.errors && this.state.errors.amount}
                  />
          
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button label="Cancel" onClick={()=>{ this.props.handleClose()
            this.setState({errors : {}})}} color="secondary"/>
           
          <Button label={this.state.create===true? "Create":"Update"} onClick={()=>{ this.handleSubmit() }} primary={true} />
            
        </DialogActions>
    
      </Dialog>
                
            </div>
        
        </div>
       
        </MuiThemeProvider>
        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
   
    toggleSnackbarAndSetText: (open, message, error) =>
      dispatch(toggleSnackbarAndSetText(open, message, error)),
    
  };
};



export default (connect(
  null,
  mapDispatchToProps
)(withStyles(styles)( DialogComponent) ))