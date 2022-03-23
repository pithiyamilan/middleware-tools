//added by sanjay
import { catchAsyncErrors } from '../middlewares/index';
import path from 'path';
import fs from 'fs';
import https from 'https';
// import fetch from 'node-fetch';

export const makeRequest = catchAsyncErrors(async (req: any, res: any, next: any) => {
    let raw = "";
    // let raw =  JSON.stringify({
    //     serviceCode: "CN1CAS0001",
    //     monitoringDate: "09302020",
    //     consumerInputSubject: {
    //       tuefHeader: {
    //         headerType: "TUEF",
    //         version: "12",
    //         memberRefNo: "11",
    //         gstStateCode: "01",
    //         enquiryMemberUserId: "NB88528888_UATC2CNPE",
    //         enquiryPassword: "dtbtr7ketqysyncry+Tqeaswr",
    //         enquiryPurpose: "01",
    //         enquiryAmount: "008000000",
    //         responseSize: "1",
    //         scoreType: "08",
    //         outputFormat: "03",
    //         ioMedia: "CC",
    //         authenticationMethod: "X"
    //       },
    //       names: [
    //         {
    //           index: "N01",
    //           firstName: "asdad",
    //           middleName: "",
    //           lastName: "",
    //           birthDate: "30101979",
    //           gender: "2"
    //         }
    //       ],
    //       ids: [
    //         {
    //           index: "I01",
    //           idNumber: "BWWPS2936L",
    //           idType: "01"
    //         }
    //       ],
    //       telephones: [
    //         {
    //           index: "T01",
    //           telephoneNumber: "308080811",
    //           telephoneType: "01"
    //         }
    //       ],
    //       emails: [
    //         {
    //           index: "",
    //           emailID: ""
    //         }
    //       ],
    //       addresses: [
    //         {
    //           index: "A01",
    //           line1: "SARVODAY RESIDENCY FLAT 704 B-WING BLDG",
    //           line2: "NO 1 NR PATRI POOL OPP. RAHEJA COMPLEX",
    //           line3: "",
    //           line4: "",
    //           line5: "",
    //           stateCode: "27",
    //           pinCode: "421301",
    //           addressCategory: "01",
    //           residenceCode: "01"
    //         }
    //       ],
    //       enquiryAccounts: [
    //         {
    //           index: "I01",
    //           accountNumber: ""
    //         }
    //       ]
    //     }
    //   });
    // you can also pass a ca or a pfx cert and much more! https.Agent uses the same options as tls.createSecureContext:
    // https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
    const options = {
      // when using this code in production, for high throughput you should not read
      //   from the filesystem for every call, it can be quite expensive. Instead
      //   consider storing these in memory
      pfx: fs.readFileSync(
        path.resolve('./', 'uatcibil.aiplservices.com.p12'),
        `utf-8`,
      ),
      passphrase:
        'test',
  
      // in test, if you're working with self-signed certificates
      rejectUnauthorized: false,
      // ^ if you intend to use this in production, please implement your own
      //  `checkServerIdentity` function to check that the certificate is actually
      //  issued by the host you're connecting to.
      //
      //  eg implementation here:
      //  https://nodejs.org/api/https.html#https_https_request_url_options_callback
  
      keepAlive: false, // switch to true if you're making a lot of calls from this client
    };
  
    // we're creating a new Agent that will now use the certs we have configured
    const sslConfiguredAgent = new https.Agent(options);
  
    const headers = {
        Accept: 'application/json',
        // add what you need like you would normally
    };
    // try {
    //   // make the request just as you would normally ...
    //   let reqUrl = "https://apiuat.cibilhawk.com/acquire/credit-assessment/v1/consumer-cir-cv";
    //   const response = await fetch(reqUrl, {
    //     method: 'POST',
    //     body: raw,
    //     headers: headers, // ... pass everything just as you usually would
    //     // agent: sslConfiguredAgent, // ... but add the agent we initialised
    //   });
  
    //   const responseBody = await response.json();
  
    //   // handle the response as you would see fit
    //   console.log(responseBody);
    // } catch (error) {
    //   console.log(error);
    // }
  });