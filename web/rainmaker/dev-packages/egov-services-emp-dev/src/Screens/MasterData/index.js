

  import { httpRequest } from "egov-ui-kit/utils/api";
  import React from "react"; 
  import { Button } from "components";
  import { makeStyles } from "@material-ui/core/styles";
  import { Paper } from '@material-ui/core';
  import Table from "@material-ui/core/Table";
  import MenuItem from '@material-ui/core/MenuItem';
  import InputLabel from '@material-ui/core/InputLabel';
  import Select from '@material-ui/core/Select';
  import TableBody from "@material-ui/core/TableBody";
  import TableCell from "@material-ui/core/TableCell";
  import TextField from "@material-ui/core/TextField";
  import Dialog from "@material-ui/core/Dialog";
  import DialogActions from "@material-ui/core/DialogActions";
  import DialogContent from "@material-ui/core/DialogContent";
  import DialogContentText from "@material-ui/core/DialogContentText";
  import DialogTitle from "@material-ui/core/DialogTitle";
  import TablePagination from "@material-ui/core/TablePagination";
  import TableHead from "@material-ui/core/TableHead";
  import TableRow from "@material-ui/core/TableRow";
  
  import Typography from "@material-ui/core/Typography";
  import AddBoxIcon from "@material-ui/icons/AddBox";
  import {
    MuiThemeProvider,createMuiTheme
  } from "@material-ui/core/styles";
  
  
  const theme = createMuiTheme({
    
    
    typography: {
      
      fontSize: 16,
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
  


  export default class SimpleTable extends React.Component {
    state = {
      row: [
        { name: "ram", calories: "152", fat: "22", carbs: "11", protein: "5.0" }
      ],
      data: [],
      sectorList: [],
      sector: "",
      page: 0,
      rowsPerPage: 5,
      open: false,
      updateRowData:{},
      
    };

    async componentDidMount(){
      let {data} = await httpRequest(
        "bookings/master/all/approver/_fetch",
        "_search",
        [],[]
      );
       this.setState({data: data})
        this.fetchApplicaionSector()
        
        let approver = await httpRequest(
          "bookings/master/approver/_fetch",
          "_search",
          [],[]
        );
        console.log(approver,"approver")
     }

     
 async fetchApplicaionSector() {
	//Fetching Application sector from MDMS
	let requestBody = {
		MdmsCriteria: {
			tenantId: "ch",//commonConfig.tenantId,
			moduleDetails: [
				{
					moduleName: "Booking",
					masterDetails: [
						{
							name: "Sector",
						},


					],
				},
			],
		},
	};

		try {
			const payload = await httpRequest("egov-mdms-service/v1/_search", "_search", [], requestBody);
      console.log(payload, "payload")
      const {MdmsRes : {Booking: { Sector}}}= payload
      this.setState({sectorList: Sector})
			
		} catch (error) {
      alert("error")
		}
	
};



  
    handleChangePage(event, newPage) {
      this.setState({ page: newPage });
    }
  
    handleChangeRowsPerPage(event) {
      this.setState({
        rowsPerPage:parseInt(event.target.value, 10),
        page: 0
      });
    }
  
    handleClickOpen() {
      this.setState({ open: true });
      
    }
  
    handleClose() {
      this.setState({ open: false });
    }
  // <MuiThemeProvider theme={theme}>  
    render() {
      
  const emptyRows =
  this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.data.length - this.state.page * this.state.rowsPerPage);

      return (
       
          <div class="col-xs-12">
          <Paper >
            <Table aria-label="simple table">
            <TableHead style={{ fontSize: "small" }}>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Id</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">User Name</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">Mobile No.</Typography>
                </TableCell>
                <TableCell style={{display: "flex", justifyContent: "center"}} >
                  <Typography variant="h6">Action</Typography>
                  <AddBoxIcon
                 
                 style={{marginLeft: "10px" , fontSize: '200%', marginBottom: "3px"}}
                  onClick={() => alert("uouo")}
                  
                />
                
                
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} style={{color: "black"}}>
                  <TableCell component="th" scope="row">
                    <Typography variant="h6">{row.id}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">{row.name}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">{row.userName}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">{row.mobileNumber}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    {/* <Button
                      style={{ width: "100px", marginRight: '10px' }}
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                    
                        this.handleClickOpen();
                        this.setState({updateRowData: row})
                      }}
                    >
                      Edit
                    </Button>
                    <Button style={{ width: "100px" }} variant="contained" color="secondary" size="large">
                      Delete
                    </Button> */}
                    <Button
                      style={{ width: "100px", marginRight: '10px' }}
                      
                      primary={true}
                      label={"Edit"}
                      onClick={() => {
                    
                        this.handleClickOpen();
                        this.setState({updateRowData: row})
                      }}
                    />
                    
                    <Button style={{ width: "100px" }}  primary={false} label={"Delete"}/>
                   
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={this.state.data.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={(e,newPage) => {
              this.handleChangePage(e,newPage);
            }}
            onChangeRowsPerPage={(e) => {
              this.handleChangeRowsPerPage(e);
            }}
          />
          </Paper>

          
          
            <Dialog
              open={this.state.open}
              onClose={() => {
                this.handleClose();
              }}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Edit Approver</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please fill the form to update selected approver details.
                </DialogContentText>
                <TextField
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  defaultValue={this.state.updateRowData.name}
                  required="true"
                  InputProps={{ disableUnderline: true }}
                />
                 <TextField
                  variant="outlined"
                  margin="dense"
                  id="userName"
                  label="User Name"
                  type="text"
                  fullWidth
                  defaultValue={this.state.updateRowData.userName}
                  required="true"
                  InputProps={{ disableUnderline: true }}
                />
                 <TextField
                  variant="outlined"
                  margin="dense"
                  id="mobileNumber"
                  label="Mobile Number"
                  type="number"
                  fullWidth
                  defaultValue={this.state.updateRowData.mobileNumber}
                  required="true"
                  InputProps={{ disableUnderline: true }}

                />
                 <TextField
          id="outlined-select-currency"
          select
          label="Select"
          fullWidth
          value={this.state.sector}
          variant="outlined"
          onChange={(e)=>{this.setState({sector: e.target.value})}}
        >
           <MenuItem value="" disabled>Select Sector</MenuItem>
        { this.state.sectorList.map((sector)=>{
           return (<MenuItem value={sector.code}>{sector.name}</MenuItem>)
         })}
       
         
        </TextField>
                 {/* <InputLabel id="demo-simple-select-label">Sector</InputLabel>
                <Select
                style={{width: "441px"}}
                label="Sector"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.sector}
                variant="outlined"
                onChange={(e)=>{this.setState({sector: e.target.value})}}
                >
         <MenuItem value="" disabled>Select Sector</MenuItem>
        { this.state.sectorList.map((sector)=>{
           return (<MenuItem value={sector.code}>{sector.name}</MenuItem>)
         })}
       
          
        </Select> */}
              </DialogContent>
              <DialogActions>
                <Button
                color="secondary"
                  onClick={() => {
                    this.handleClose();
                  }}
                  color="black"
                >
                  Cancel
                </Button>
                <Button
                color="primary"
                  onClick={() => {
                    this.handleClose();
                  }}
                  color="primary"
                >
                  Update
                </Button>
              </DialogActions>
            </Dialog>
            
          
        </div>
    

      );
    }
  }
