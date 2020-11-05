
import { httpRequest } from "egov-ui-kit/utils/api";
import LoadingIndicator from "egov-ui-kit/components/LoadingIndicator";
import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from "@material-ui/core/styles";
import {
  MuiThemeProvider,createMuiTheme
} from "@material-ui/core/styles";


const theme = createMuiTheme({
  
  
  typography: {
    
    fontSize: 20,
  },
 
  palette: {
    primary:{
      main : "#fe7a51"
    },
    secondary:{
      main : "#ffffff"
    },
    
    textColor: "#5f5c62",
    canvasColor: "#F7F7F7",
    borderColor: "#e6e6e6"
  },

 
});



const useStyle= theme=>({

    dialogStyle: {

        minWidth : '800px',
        maxWidth : '800px',
      

    }
})



class DialogComponent extends Component {


    async componentDidMount(){
        this.setState({sectorList: this.props.sectorList})

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

            this.setState({sectorList: this.props.sectorList})
            this.setState({updateData: this.props.updateData, errors: {}})

            if(Object.keys(this.props.updateData).length === 0){
                this.setState({create: true})
            }else{
                this.setState({create: false})
                let uuid = this.props.updateData.uuid
                this.fectchApproverRoleCode(uuid)
            }
        }

    }
    

    async fectchApproverRoleCode (uuid){

        let reqBody={
            "uuid": uuid
        }
        
        const responseStatus = await httpRequest(
                  
            "bookings/master/roles/_search",
            "_search",
            [],
            reqBody
          );
      

          console.log(responseStatus, "rolecode")
        
            

    }
    state={

        updateData: {}, 
        errors: {},
        create: true, 
        sectorList: []
    }


    validate (){

        let temp= {}
        const submitData= this.state.updateData
        temp.sector=submitData.sector? "": "This field is required"
       
        this.setState({errors: temp})

        return Object.values(temp).every(x => x=="")
    }

    async handleSubmit  (){
        if(this.validate()){

           if(this.state.create===true)
           {
            var reqBody =  {
              
                "ApproverDetails":[
                    {
                        "sector": this.updateData.sector,
                        "uuid": this.updateData.uuid,
                        "roleCode": "OSBM_APPROVER"
                    }
                 ],
             
              }
            const responseStatus = await httpRequest(
                  
              "bookings/master/approver/_create",
              "_search",
              [],
              reqBody
            );
        

            console.log(responseStatus, "createresponse")
          
              

    
           }
           else
           
           {

              var reqBody =  {
              
                "ApproverDetails":[
                    {
                        "id": "2d19651c-ae74-4726-91e3-a8ce5812ff97",
                        "sector": "SECTOR-17",
                        "uuid": "10e1a649-c4b5-4a48-a184-267cee3f45c2",
                        "roleCode": "OSBM_APPROVER"
                    }
                 ],

                }
              const responseStatus = await httpRequest(
                    
                "bookings/master/approver/_update",
                "_search",
                [],
                reqBody
              );
           

              console.log(responseStatus, "createresponse")
            }
  
           
        }
        
    }
    
    render() {
        
       
        const {classes} =this.props
        return (

       this.state.sectorList.length === 0  ?<LoadingIndicator status="loading"  /> :
        
        <MuiThemeProvider theme={theme}>
        <div> <LoadingIndicator status="hide" /> 
        <div>

        <Dialog
            classes={{ paper :classes.dialogStyle}}
            maxWidth="md"
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="form-dialog-title"
         >
        <DialogTitle id="form-dialog-title">Edit Open Space Fee Master</DialogTitle>
         
        <DialogContent>
          <DialogContentText>
            Please fill the form to update fee master of OSBM
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item sm={6}>
                <h1> heelo</h1> 
              {/* <TextField
                p={"2rem"} 
                select
                margin="dense"
                id="villageCity"
                label="Village/City"
                type="string"
                fullWidth
                variant="outlined"
                value={this.state.updateData.villageCity}
                onChange={e=> { 
                    let updateData = {...this.state.updateData}
                    updateData.villageCity= e.target.value
                    let errors= {...this.state.errors}
                    errors.villageCity=""
                    this.setState({updateData, errors})
                    

                }}
                error={ this.state.errors && this.state.errors.villageCity}
                helperText={this.state.errors.villageCity}
              
              >
                {this.state.mdmsRes.VillageCity.map((value)=>{
                    return (<MenuItem value={value.code}>{value.name}</MenuItem>)
                 })}
              </TextField>
               */}
            </Grid>
            <Grid item sm={6}>
              <TextField
                
                select
                margin="dense"
                id="sector"
                label="Area"
                type="string"
                fullWidth
                variant="outlined"
                value={this.state.updateData.sector}
                onChange={e=> { 
                    let updateData = {...this.state.updateData}
                    updateData.sector= e.target.value
                    let errors= {...this.state.errors}
                    errors.sector=""
                    this.setState({updateData, errors})
                    

                }}
                error={ this.state.errors && this.state.errors.sector}
                helperText={this.state.errors.sector}
              >
                    { this.state.sectorList && this.state.sectorList.map((value)=>{
                    return (<MenuItem value={value.code}>{value.name}</MenuItem>)
                 })}
              </TextField>
           
                    
              
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{ this.props.handleClose()
            this.setState({errors : {}})}} color="primary">
            Cancel
          </Button>
          <Button  onClick={()=>{ this.handleSubmit() }} color="primary">
            Update
          </Button>
        </DialogActions>
    
      </Dialog>
                
            </div>
        
        </div>
       
        </MuiThemeProvider>
        )
    }
}

export default withStyles(useStyle)( DialogComponent) 