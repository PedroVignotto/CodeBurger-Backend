# Update address ✅ ❌

> ## Success case

01. ✅ Receives a request of type **PUT** in route **/api/address/:id**
00. ✅ Validates if an address exists with the **id** provided
00. ✅ Change **active** to false from other addresses, if **active** is provided
00. ✅ Change the **fields** provided in the database
00. ✅ Returns **204** on success

> ## Exceptions

01. ✅ Returns error **400** if no have address with **id** provided
00. ✅ Returns error **500** if there is an **error** on the server
