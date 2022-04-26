# Load address by zipCode ✅ ❌

> ## Success case

01. ✅ Receives a request of type **GET** in route **/api/address/:zipCode**
00. ✅ Get data **district** and **street** from CEP API
00. ✅ Returns **200** with the **district** and **street**

> ## Exceptions

01. ✅ Returns error **400** if **zipCode** field is an invalid zip code
00. ✅ Returns error **500** if there is an **error** on the server
