# Update product ✅ ❌

> ## Success case

01. ❌ Receives a request of type **PUT** in route **/api/product/:id**
00. ❌ Validates mimeType and maxSizeInMb from **picture** if if it is provided
00. ❌ Validates if an product exists with the **id** provided
00. ❌ Validates if an product already exists with the **name** provided if it is provided
00. ❌ Validates if an category exists with the **categoryId** provided if it is provided
00. ❌ Delete the old **picture** and save the new if provided
00. ❌ Change the **fields** provided in the database
00. ❌ Returns **204** on success

> ## Exceptions

01. ❌ Returns error **400** if the **picture** field has an invalid mimeType
00. ❌ Returns error **400** if the **picture** size is larger than the accepted size
00. ❌ Returns error **400** if no have product with **id** provided
00. ❌ Returns error **400** if the provided **name** is already in use
00. ❌ Returns error **400** if no have category with **categoryId** provided
00. ❌ Returns error **500** if there is an **error** on the server
