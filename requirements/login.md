# Login ✅ ❌

> ## Success case

01. ✅ Receives a request of type **POST** in route **/api/login**
00. ✅ Validates required data **email** and **password**
00. ✅ Validates that the **email** field is a valid email
00. ✅ **Search** the account with the **email** and **password** provided
00. ✅ **Verifies** if **password** provided is correct
00. ✅ Generate an **access token** from the **account ID**
00. ✅ Returns **200** with the **access token** and **username**

> ## Exceptions

01. ✅ Returns error **400** if **email** or **password** is not provided by the client
00. ✅ Returns error **400** if the **email** field is an invalid email
00. ✅ Returns error **401** if does not find an account with the given data
00. ✅ Returns error **401** if the given **password** is incorrectly
00. ✅ Returns error **500** if there is an **error** on the server
