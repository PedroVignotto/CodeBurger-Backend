# Delete addresses ✅ ❌

> ## Success case

01. ✅ Receives a request of type **DELETE** in route **/api/address/:id**
00. ✅ Validates if an address exists with the **id** provided
00. ✅ Remove user **address**
00. ✅ Returns **204** on success

> ## Exceptions

01. ✅ Returns error **400** if no have address with **id** provided
00. ✅ Returns error **500** if there is an **error** on the server
