# Delete product ✅ ❌

> ## Success case

01. ❌ Receives a request of type **DELETE** in route **/api/product/:id**
00. ❌ Validates if an product exists with the **id** provided
00. ❌ If the product has an **picture**, delete it from fileStorage
00. ❌ Remove **product**
00. ❌ Returns **200** on success

> ## Exceptions

01. ❌ Returns error **400** if no have product with **id** provided
00. ❌ Returns error **500** if there is an **error** on the server
