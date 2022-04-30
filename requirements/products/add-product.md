# Add product ✅ ❌

> ## Success case

01. ❌ Receives a request of type **POST** in route **/api/product**
00. ❌ Validates required data **name**, **description**, **price** and **available**
00. ❌ Validates mimeType and maxSizeInMb from **picture**
00. ❌ Validates if an product already exists with the **name** provided
00. ❌ Validates if an category exists with the **categoryId** provided if it is provided
00. ❌ Save the **picture** received, in a FileStorage keeping the original format
00. ❌ Send a unique key to FileStorage to avoid overwriting an **picture** that already exists
00. ❌ Create an product with the **data** provided
00. ❌ Returns **201** with the data created

> ## Exceptions

01. ❌ Returns error **400** if **name**, **description**, **price** or **available** is not provided by the client
00. ❌ Returns error **400** if the **picture** field has an invalid mimeType
00. ❌ Returns error **400** if the **picture** size is larger than the accepted size
00. ❌ Returns error **400** if the provided **name** is already in use
00. ❌ Returns error **400** if no have category with **categoryId** provided
00. ❌ Returns error **500** if there is an **error** on the server and delete image in FileStorage if error is when saving to database
