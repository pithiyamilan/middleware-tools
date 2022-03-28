const errorHandler = require("../utils/errorHandler");
import { catchAsyncErrors } from '../middlewares/index';
import path from 'path';
import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';
import { dbConnection, database } from '../config/index';
import { sendToken } from '../utils/index';

const errorMessage = "Something went wrong please try again.";

export const loginUser = catchAsyncErrors(async (req: any, res: any, next: any) => {
    const { requestData: { userID, password } } = req.body;
    //check if email and password is entered by user
    if (!userID) {
        return next(new errorHandler("Please enter UserID.", "99", "-99", "Data Validation Failed.", "Please enter UserID.", 400));
    }
    if (!password) {
        return next(new errorHandler("Please enter Password.", "99", "-99", "Data Validation Failed.", "Please enter Password.", 400));
    }
    let connection;
    let user: any;
    try {
        connection = await dbConnection(database);

        let query = `select
                    a.user_name as "userID",
                    a.description as "userName",
                    a.user_password as "userPassword",
                    a.user_level as "role",
                    a.def_comp_cd as "baseCompany",
                    a.def_branch_cd as "baseBranch",
                    a.active_flag as "activeFlag",
                    func_branch_nm(a.def_comp_cd,a.def_branch_cd) as "branchNM"
                    from security_users a
                    where lower(a.user_name) = :userid`;
        //@ts-ignore
        const result: any = await connection.execute(query, [userID.toLowerCase()]);
        const rows: any = result.rows;
        if (rows.length === 0) {
            return next(new errorHandler("UserId is not Valid.", "99", "-99", "Data Validation Failed.", "UserId is not Valid.", 400));
        }
        user = rows[0] ?? {};
        if (user?.activeFlag === 'N') {
            return next(new errorHandler("UserId is not Active.", "99", "-99", "Data Validation Failed.", "UserId is not Active.", 400));
        }
    } catch (err) {
        console.log(err);
        return next(new errorHandler("", "", "", "Database Connection Refused.", err, 400));
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                return next(new errorHandler("", "", "", "Database Connection Refused.", err, 400));
            }
        };
    };
    return sendToken(user, 200, res);
});

export const fetchCibilData1 = catchAsyncErrors(async (req: any, res: any, next: any) => {
    // const { requestData: { userID, password } } = req.body;    
    let reqbody = {
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
    
    const options = {
        pfx: fs.readFileSync(path.resolve(__dirname, './uatcibil.aiplservices.com.p12')),
        passphrase: 'test',
    };
    
    const sslConfiguredAgent = new https.Agent(options);
    try {
        let response = await fetch("https://apiuat.cibilhawk.com/acquire/credit-assessment/v1/consumer-cir-cv", {
            method: "POST",
            body: JSON.stringify(reqbody),
            headers: {
              "Content-Type": "application/json",
              "apikey":"l79483f4cd45c64f7cbc0918cd3fec3fe5",
              "member-ref-id":"NB885",
              "cust-ref-id":"12345_6",
              "service-id":"INCS1001003",
            },
            agent: sslConfiguredAgent,
        });
      console.log(response.status);
      let data = await response.json();
      console.log(JSON.stringify(data));
      if (String(response.status) == "200") {
        return res.status(200).json({ status: "0", responseData: { message: "success" } });
      } else {
        return res.status(200).json({ status: "99", error: JSON.stringify(data) });
      }
    } catch (e) {
      console.log("milanerror", e);
      return res.status(500).json({ status: "99", error: e });
    };
        
});
