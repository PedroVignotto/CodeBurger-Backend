# Update order ✅ ❌

> ## Success case

01. ✅ Receives a request of type **PUT** in route **/api/order/:id**
00. ✅ Validates if an order exists with the **id** provided
00. ✅ Change the **status** provided in the database
00. ✅ Returns **204** on success

> ## Exceptions

01. ✅ Returns error **400** if no have order with **id** provided
00. ✅ Returns error **500** if there is an **error** on the server
