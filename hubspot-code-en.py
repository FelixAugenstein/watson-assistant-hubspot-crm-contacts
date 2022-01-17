import requests


def main(dict):
    
    apikey = "YOUR API KEY HERE"
    url = "https://api.hubapi.com/crm/v3/objects/contacts"
    
    param = {"hapikey": apikey}
    head = {"Content-Type": "application/json"}
    
    prop = {
        "company": dict["crmCompany"],
        "email": dict["crmEmail"],
        "firstname": dict["crmFirstname"],
        "lastname": dict["crmLastname"],
        "phone": dict["crmPhone"],
        "website": dict["crmWebsite"]
    }
    body = {"properties": prop}

    try:
        r = requests.post(url, params=param, headers=head, json=body)
    except Exception as err:
        print(err)
        return {"message": "an error occured while trying to call the Hubspot API."}
    
    
    
    if  r.status_code == 201:
        return {"message": "New Contact was created successfully"}
    
    #else: return errormessage
    return {"message": r.json()["message"]}



