# Delete category ✅ ❌

> ## Success case

01. ✅ Receives a request of type **DELETE** in route **/api/category/:id**
00. ✅ Validates if an category already exists with the **id** provided
00. ✅ Remove **category**
00. ✅ Returns **200** on success

> ## Exceptions

01. ✅ Returns error **400** if no have category with **id** provided
00. ✅ Returns error **500** if there is an **error** on the server
