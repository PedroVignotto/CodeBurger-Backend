# Add category ✅ ❌

> ## Success case

01. ✅ Receives a request of type **POST** in route **/api/category**
00. ✅ Validates required data **name**
00. ✅ Validates if an category already exists with the **name** provided
00. ✅ Create an category with the **data** provided
00. ✅ Returns **201** on success

> ## Exceptions

01. ✅ Returns error **400** if **name** is not provided by the client
00. ✅ Returns error **400** if the provided **name** is already in use
00. ✅ Returns error **500** if there is an **error** on the server
