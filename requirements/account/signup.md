# Signup ✅ ❌

> ## Success case

01. ✅ Receives a request of type **POST** in route **/api/signup**
00. ✅ Validates required data **name**, **email**, **password** and **passwordConfirmation**
00. ✅ Validates that **password** and **passwordConfirmation** are the same
00. ✅ Validates that the **email** field is a valid email
00. ✅ Validates if an account already exists with the **email** provided
00. ✅ Generates a encrypted **password** (this password cannot be decrypted)
00. ✅ Create an account with the **data** provided, replacing the **password** with the encrypted password
00. ✅ Generate an **access token** from the **account ID**
00. ✅ Returns **201** with the **access token** and **username**

> ## Exceptions

01. ✅ Returns error **400** if **name**, **email**, **password** or **passwordConfirmation** are not provided by the client
00. ✅ Returns error **400** if **password** and **passwordConfirmation** are not the same
00. ✅ Returns error **400** if the **email** field is an invalid email
00. ✅ Returns error **403** if the provided **email** is already in use
00. ✅ Returns error **500** if there is an **error** on the server
