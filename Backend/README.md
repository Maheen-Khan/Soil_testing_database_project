How we are going to structure the samples

User makes a request in Request Sample : (Backend calls Request schema creates a new request with array of strings reperenting desired test)
User cna veiw status of request which gets changed to result when it is added. (use an if statment to check status then it should show result if request status is complete)
Admin veiws and creates a form of the request test parameters sends to backend: (Backend creates a result with the paramaters of the tests)

IT DOES NOT MATTER WHAT THE TESTS ARE AFTER THEY ARE SENT TO THE REQUEST THE RESULT DOES NOT NEED TO KNOW THAT

The veiwer can veiw the Result in the mySamples. 

THINGS TO DO
-Create a Request Schema
UserID
Tests[] string
createdAt date
updatedAt date

(optional)
shippingSlip string
payment object

-Create a Result Schema
RequestID
Lead (ppm)
pH
Soluble Salts(ppm)
Soil Texture
Organic Content(%)
Pb
Zn
Cu
As


What we are going to do today 11/16/2024

Make it so that the computer remebers the user whenever you sign in also saying hello "user"

work on the admin portion (acccessing all samples)

design admin portion (css)

work on the editing results and allow for samples to be edited

create update/submit button.

work on roles and acess to different pages based on it(may need maheen for this)

Result{
    requestID: objID
    Tests : [{testID , value }]
    status : string
    createdAt
    updatedAt

}




Test
{
    test_id : objID
    name : string
    discription : string
    unit : String
    price : number
    defaultValue : 0
    createdAt
    updatedAt

}

Explanation to Donavin

user - request (one to many)
requests has a list of results used to find tests and give parameters