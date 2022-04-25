# Add address ✅ ❌

> ## Success case

01. ✅ Receives a request of type **POST** in route **/api/address**
00. ✅ Validates required data **surname**, **zipCode**, **district**, **address** and **number**
00. ✅ Validates that the **zipCode** field is a valid zip code
00. ✅ Create an address with the **data** provided
00. ✅ Returns **201** on success

> ## Exceptions

01. ✅ Returns error **400** if **surname**, **zipCode**, **district**, **address** or **number** is not provided by the client
00. ✅ Returns error **400** if the **zipCode** field is an invalid zip code
00. ✅ Returns error **500** if there is an **error** on the server
