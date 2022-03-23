const errorHandler = require("../utils/errorHandler");
const fs = require('fs');
const request = require('request');
import { response } from 'express';
import { catchAsyncErrors } from '../middlewares/index';
// import oracledb from 'oracledb';
// import { dbConnection, database } from '../config/index';
import { sendToken } from '../utils/index';

//test
//login user
export const fetchCibilData = catchAsyncErrors(async (req: any, res: any, next: any) => {
    const { requestData: { userID, password } } = req.body;
    console.log("request arrived");
    //check if email and password is entered by user
    if (!userID) {
        return next(new errorHandler("Please enter UserID.", "99", "-99", "Data Validation Failed.", "Please enter UserID.", 400));
    }
    if (!password) {
        return next(new errorHandler("Please enter Password.", "99", "-99", "Data Validation Failed.", "Please enter Password.", 400));
    }
    let user:any = { userID, password };
    const abcd = await getData(user);
    // console.log("abcd",abcd);
    // res.send(user);
    console.log("__dirname",__dirname);
    return res.status(200).json({status:"0",responseData:{message:"success"}});    
});

const getData = async function(user:any){
    
    let reqbody ={
        serviceCode: "CN1CAS0001",
        monitoringDate: "09302020",
        consumerInputSubject: {
          tuefHeader: {
            headerType: "TUEF",
            version: "12",
            memberRefNo: "11",
            gstStateCode: "01",
            enquiryMemberUserId: "NB88528888_UATC2CNPE",
            enquiryPassword: "dtbtr7ketqysyncry+Tqeaswr",
            enquiryPurpose: "01",
            enquiryAmount: "008000000",
            responseSize: "1",
            scoreType: "08",
            outputFormat: "03",
            ioMedia: "CC",
            authenticationMethod: "X"
          },
          names: [
            {
              index: "N01",
              firstName: "asdad",
              middleName: "",
              lastName: "",
              birthDate: "30101979",
              gender: "2"
            }
          ],
          ids: [
            {
              index: "I01",
              idNumber: "BWWPS2936L",
              idType: "01"
            }
          ],
          telephones: [
            {
              index: "T01",
              telephoneNumber: "308080811",
              telephoneType: "01"
            }
          ],
          emails: [
            {
              index: "",
              emailID: ""
            }
          ],
          addresses: [
            {
              index: "A01",
              line1: "SARVODAY RESIDENCY FLAT 704 B-WING BLDG",
              line2: "NO 1 NR PATRI POOL OPP. RAHEJA COMPLEX",
              line3: "",
              line4: "",
              line5: "",
              stateCode: "27",
              pinCode: "421301",
              addressCategory: "01",
              residenceCode: "01"
            }
          ],
          enquiryAccounts: [
            {
              index: "I01",
              accountNumber: ""
            }
          ]
        }
      };
      console.log("1");
      let options:any;
    // var options = {
    //     method:"POST",
    //     url: 'https://apiuat.cibilhawk.com/acquire/credit-assessment/v1/consumer-cir-cv',
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     body: reqbody,
    //     agentOptions: {
    //         pfx: fs.readFileSync(__dirname + 'uatcibil.aiplservices.com.p12'),
    //         passphrase: 'test'
    //     }
    // };

    console.log("2");
    request(options, (error:any, response:any, body:any) => {
        console.log(error);
        console.log(response);
        console.log(body);
    });
    
}


