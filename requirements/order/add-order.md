# Add order ✅ ❌

> ## Success case

01. ✅ Receives a request of type **POST** in route **/api/order**
00. ✅ Validates required data **productsId**
00. ✅ Create an order with the **data** provided
00. ✅ Returns **201** with the data created

> ## Exceptions

01. ✅ Returns error **400** if **productsId** or **total** is not provided by the client
00. ✅ Returns error **500** if there is an **error** on the server
