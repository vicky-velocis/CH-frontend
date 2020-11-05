

import { httpRequest } from "egov-ui-kit/utils/api";
import { SortDialog, Screen } from "modules/common";
import TableUi from '../Table/index'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Paper } from '@material-ui/core';
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Search from "@material-ui/icons/Search";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "components";
import Typography from "@material-ui/core/Typography";
import LoadingIndicator from "egov-ui-kit/components/LoadingIndicator";
import Label from "egov-ui-kit/utils/translationNode";
import   DialogComponent from './DialogComponent'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {
  MuiThemeProvider,createMuiTheme
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import inherits from "babel-runtime/helpers/inherits";
//import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
const theme = createMuiTheme({
  
  
  typography: {
    
    fontSize: 20,
    fontWeight: 400,
    lineHeight: '17px',
    letterSpacing: '.3px',
    color: "#FF5733"

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

const styles=theme=>({

 
  addIcon: {
    visibility: 'hidden'
  },
  [theme.breakpoints.only('xs')]: {
    addIcon: {
      visibility: 'visible'
    }
  }
})

class SimpleTable extends React.Component {

  
  async componentDidMount(){

    let mdmsBody = {
      MdmsCriteria: {
        tenantId: "ch",
        moduleDetails: [
            {
                moduleName: "tenant",
                masterDetails: [
                    {
                        name: "tenants",
                    },
                ],
            },
              {
                  moduleName: "Booking",
                  masterDetails: [
                      {
                          name: "Booking_Vanue",
                      },
                      {
                          name: "Commerical_Ground_Cat",
                      },

                  ],
              },
          ],
      },
    };      
    const {MdmsRes:{Booking}} = await httpRequest(
          
          "/egov-mdms-service/v1/_search",
          "_search",
          [],
          mdmsBody
      );
     
   



    
    
       this.setState({mdmsResCg: Booking})
       console.log(this.state.mdmsResCg, "stateresponse")
  

    this.setState({updateData: {}})
    
    this.fetchTableData()
  
     
    }




  async fetchTableData(){
    this.setState({isLoading: true})
    let feeResponse = await httpRequest(
        "bookings/master/gfcp/fee/_fetch",
        "_search",
        [],[]
      );
      let  feeData=this.state.data
      let feeDataRes=feeResponse.data
      
     feeData.rows= feeDataRes.reverse()

     
     feeData.headers=['Id','Locality','Category','Rate Per Day','Booking Venue','Last Modified Date','Created Date','Action']

  
     

      this.setState({data: feeData})
      console.log(feeData, "feeData")
      this.setState({isLoading: false})
  }
    

  state = {
    
    
    data:{
      rows: [],
      headers: []
    },
    mdmsRes: {}, 
    sectorList: [],
    page: 0,
    rowsPerPage: 5,
    isLoading: true, 
    open: false,
    updateData: {},
    columnHideIndex:[0],
    mdmsResCg: {},
    filterfun: {
      fn: (item) => {
        return item;
      }
    }

  };
  
  async handleEditClick (row) {
    await this.setState({updateData: row})
     this.handleClickOpen();
   }
  
 

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
    this.setState({ updateData: {} });
    
  }

    
  handleSearch(e) {
    const target = e.target;
    let filterfun = this.state.filterfun;
    filterfun.fn = (item) => {
      if (target.value === "") return item;
      else {
        return item.filter(
          (x) =>
          x.villageCity.toLowerCase().includes(target.value.toLowerCase()) ||
          x.residentialCommercial.toLowerCase().includes(target.value.toLowerCase()) ||
          x.storage.toLowerCase().includes(target.value.toLowerCase()) ||
          x.durationInMonths.toString().includes(target.value) ||
          x.constructionType.toLowerCase().includes(target.value.toLowerCase()) ||
          x.amount.toString().includes(target.value) 
        );
      }
    };
    this.setState({ filterfun: filterfun });
  }

  handleCreateNew(){
    this.setState({updateData: {}})
    this.setState({open: true})
  }

  render() {
    
   const emptyRows =
   this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.data.length - this.state.page * this.state.rowsPerPage);
   const {classes}= this.props
    return (
      this.state.isLoading===true ?<LoadingIndicator></LoadingIndicator>:
      <MuiThemeProvider theme={theme}>
        <div align ="right"  >
         <Button primary={true}  label="Create New" style={{margin: '15px'}} onClick={()=>{ this.handleCreateNew() }}/>
        
          
      </div>  
      
      
      
      
      <div class="col-xs-12 " style={{ wordBreak: "break-word"}}>

        <Paper>
        <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            style={{ width: "75%", margin: "20px", marginLeft: '10px' }}
            id="outlined-search"
            label="Search field"
            type="search"
            placeholder="search any field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
            onChange={(e) => this.handleSearch(e)}
            variant="outlined"
          />
          {/* <Fab color="white" style={{margin: '15px'}} className={classes.addIcon} size="small" aria-label="add" onClick={()=>this.handleCreateNew()}>
            <AddIcon />
          </Fab>
          */}
        </div>
        <TableUi data={this.state.data}    columnHideIndex={this.state.columnHideIndex} filterfun={this.state.filterfun} handleEditClick={this.handleEditClick.bind(this)} />
        </div>
        
        </Paper>
        <div>
         <DialogComponent  mdmsResCg ={ this.state.mdmsResCg} open={this.state.open}    fetchTableData={this.fetchTableData.bind(this)}  handleClose={this.handleClose.bind(this)} updateData={this.state.updateData} /> 
        </div>
        </div> 
    
          
      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(SimpleTable)