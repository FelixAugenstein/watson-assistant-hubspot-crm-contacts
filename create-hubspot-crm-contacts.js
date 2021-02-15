/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */


/* https://www.npmjs.com/package/@hubspot/api-client */

// Load async
const async = require('async');

/* Request */
const request = require("request");

const main = async (params) => {
        
        // define a returnString
        let returnString = '';
        
        // define the params
        crmCompany = params.crmCompany;
        crmEmail = params.crmEmail;
        crmFirstname = params.crmFirstname;
        crmLastname = params.crmLastname;
        crmPhone = params.crmPhone;
        crmWebsite = params.crmWebsite;

        function newCrmContact() {
                let options = {
                        method: 'POST',
                        url: 'https://api.hubapi.com/crm/v3/objects/contacts',
                       /*--------------------------------------------
                        YOUR INPUT REQUIRED HERE: PROVIDE YOUR HAPIKEY
                        --------------------------------------------*/
                        qs: {hapikey: 'YOUR_HAPIKEY_HERE'},
                        headers: {accept: 'application/json', 'content-type': 'application/json'},
                        body: {
                            properties: {
                            company: crmCompany,
                            email: crmEmail,
                            firstname: crmFirstname,
                            lastname: crmLastname,
                            phone: crmPhone,
                            website: crmWebsite
                            }
                    },
                    json: true
                    };
        
                request(options, function (error, response, body) {
                        if (error) throw new Error(error);
                        
                        console.log(body);
                        });

                console.log(options);
                
        }

        newCrmContact();

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve(newCrmContact), 5000)
        });
    
        let result = await promise; // wait until the promise resolves (*)
      
        //alert(result); // "done!"
        console.log(result);
        
        // return message with returnString
        returnString = `Vielen Dank, der Kontakt ${crmFirstname} ${crmLastname}, ${crmCompany}, Email: ${crmEmail}, Tel: ${crmPhone}, Webseite: ${crmWebsite} wurde nun im CRM System erstellt.`;
        return { message: returnString };

}