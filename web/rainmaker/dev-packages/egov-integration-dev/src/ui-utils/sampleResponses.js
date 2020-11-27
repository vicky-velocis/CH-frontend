export const sampleeofficestat = () => {
  let res = {
    ResponseInfo: {
      apiId: "Rainmaker",
      ver: ".01",
      ts: null,
      resMsgId: "uief87324",
      msgId: "20170310130900|en_IN",
      status: "successful"
    },
   eofficestat:{
    totalFilesPendingCnt:3,
    totalFilesClosed  :23,
    totalReceiptsPending  :4,
    totalReceiptsClosed: 5,  
    totalVIPReceiptsPending :7

   }
  };
  return res;
};
export const samplePaySlip = () => {
  let res = {
    ResponseInfo: {
      apiId: "Rainmaker",
      ver: ".01",
      ts: null,
      resMsgId: "uief87324",
      msgId: "20170310130900|en_IN",
      status: "successful"
    },
    PaySlip:{
      DDOCode:'00003',
      DDOName  :'Ministry of Health',
      EmployeeCode  :'1975010001Z',
      Name: 'Om Parkash',  
      FatherName :'S/o Sri Gajey Singh',
      Designation:'Sanitary Jamadar',
      PayCommission:'5th Pay Commission (State)',
      PayScale:'4900-10680-Grade Pay(1650)',
      Allowances_Deductions:[
        {
          ItemType:'A',
          ItemName:'BASIC PAY',
          Value:16620,
        },
        {
          ItemType:'A',
          ItemName:'Dearness Allowance',
          Value:24257,
        },
        {
          ItemType:'A',
          ItemName:'City Compensatory Allowance',
          Value:120,
        },
        {
          ItemType:'A',
          ItemName:'Washing Allowance',
          Value:60,
        },
        {
          ItemType:'A',
          ItemName:'Conveyance Allowance',
          Value:300,
        },
        {
          ItemType:'A',
          ItemName:'Medical Allowance',
          Value:500,
        },
        {
          ItemType:'A',
          ItemName:'Mobile Allowance',
          Value:250,
        },
        {
          ItemType:'A',
          ItemName:'IR UT PB HP',
          Value:250,
        },
        {
          ItemType:'D',
          ItemName:'Licence Fee/HRR',
          Value:250,
        }

      ]

   }
  };
  return res;
};
