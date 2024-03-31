
## __File Hoster__

### Requirements

- FileHoster has users
- Users can create an account and login to their account
- Users can update email, premium level of their account
- There are 3 premium level "free, basic, pro"
- Each premium level has there own propeties of name, max_size
- FileHoster has subscription which enables users to update their premium level
- Subscription can be bought monthly, annually or quarterly
- User can create directories and upload file
- Every file and directory has owner
- Every file and directory's access can be shared with other fileHoster's users
- Every file and directory can be public or private
- Only owener and shared owner will have write access to files and directory
- Every file is stored in ecrypted form

### Tech Stack

- #### Backend and Database

    - Node.js
    - MongoDB

- #### Frameworks and Algorithms

    - Express
    - Mongoose
    - Bcrypt
    - Openssl

- #### Third-party Integrations

    - Hashicorp


### Database schema
![Database schema](/Images/FileHoster-ER.png)