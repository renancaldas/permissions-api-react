# Permissions Api
Permissions Api - Renan Caldas

### Summary
1. Folder structure
2. Running the application
3. The back-end config file
4. API methods documentation

### 1. Folder structure
---
**permissionsApi (root folder)**
- **back-end**
- **front-end**
- package.json
- README.md
- scaling.txt

### 2. Running the application
---

1. clone this repo
2. open your terminal and cd into the **root folder**
3. run these commands:

```
To install the NPM packages (only in the first time):
    $ npm install

To run the server API and the front-end at the same time:
    $ npm start

To test the server API: (open in a new terminal, the server should be running)
    $ npm test
```

### 3. The back-end config file
---

There is a config file inside the `config` folder, called `development.json`. This file is designed to run into development environment with `npm start` command. It contains:

- Server port (`3000` by default)
- Database connection string ([mlab](https://mlab.com/) mongo database)

### 4. API methods documentation
---
The base url for the server running the `development.json` config file should be: `http://localhost:3000`

OBS.: in the **root folder**, there is a file called `api.postman_collection` with the api call collection for postman.


#### [Permission] Get permission list

`GET` /api/v1/permissions

**Return example:**
```
Status 200
{
  "success": true,
  "data": [
    {
      "_id": "58af38bc079f33252df0e619",
      "code": "view"
    },
    {
      "_id": "58af38c9079f33252df0e61a",
      "code": "modify"
    }
  ]
}
```

#### [Object] Get object list

`GET` /api/v1/objects

**Return example:**
```
Status 200
{
  "success": true,
  "data": [
    {
      "_id": "58af37e9079f33252df0e617",
      "name": "message of the day"
    }
  ]
}
```

#### [Group] Get group list

`GET` /api/v1/groups

**Return example:**
```
Status 200
{
  "success": true,
  "data": [
    {
      "_id": "58af3789079f33252df0e614",
      "name": "administrators",
      "__v": 24,
      "permissions": [
        {
          "permissionCode": "modify",
          "object": {
            "_id": "58af37e9079f33252df0e617",
            "name": "message of the day"
          },
          "_id": "58b0a84ffc9e061e63e6c311"
        }
      ],
      "users": [
        "58af375d079f33252df0e612",
        "58af3770079f33252df0e613"
      ]
    }
  ]
}
```

#### [Group] Add user to a group

`PUT` /api/v1/group/:groupId/user/:userId

| Parameter | Type     | Example                  |
|-----------|----------|--------------------------|
| groupId    | ObjectId | 58af3789079f33252df0e614 |
| userId    | ObjectId | 58af375d079f33252df0e612 |

**Return example:**
```
Status 200
{
  "success": true,
  "data": "User \"Bob\" has been inserted successfully into the group \"administrators\"."
}

Status 500
{
  "success": false,
  "error": "User with id 58af375d079f33252df0e61 not found!"
}
```


#### [Group] Remove all users from a group

`DELETE` /api/v1/group/:groupId/clear

| Parameter | Type     | Example                  |
|-----------|----------|--------------------------|
| groupId   | ObjectId | 58af3789079f33252df0e614 |

**Return example:**
```
Status 200
{
  "success": true,
  "data": "Group \"administrators\" has been cleared successfully."
}

Status 500
{
  "success": false,
  "error": "Group with id 58af3789079f33252df0e615 not found!"
}
```

#### [Group] Add permission to a group on a specific object

`PUT` /api/v1/group/:groupId/permission/:permissionCode/object/:objectId

| Parameter | Type     | Example                  |
|-----------|----------|--------------------------|
| groupId   | ObjectId | 58af3789079f33252df0e614 |
| permissionCode   | String | "view" or "modify" |
| groupId   | ObjectId | 58af37e9079f33252df0e617 |

**Return example:**
```
Status 200
{
  "success": true,
  "data": "Permission \"view\" for object \"message of the day\" has been inserted successfully into the group \"administrators\"."
}

Status 500
{
  "success": false,
  "error": "Object with id 58af37e9079f33252df0e616 not found!"
}
```

#### [Group] Clear group permissions

`DELETE` /api/v1/group/:groupId/permissions

| Parameter | Type     | Example                  |
|-----------|----------|--------------------------|
| groupId   | ObjectId | 58af3789079f33252df0e614 |

**Return example:**
```
Status 200
{
  "success": true,
  "data": "All permisions from group \"administrators\" have been cleared."
}

Status 500
{
  "success": false,
  "error": "Group with id 58af3789079f33252df0e634 not found!"
}
```


#### [User] Get user list

`GET` /api/v1/users

**Return example:**
```
Status 200
{
  "success": true,
  "data": [
    {
      "_id": "58af375d079f33252df0e612",
      "name": "Bob",
      "__v": 8,
      "permissions": [
        {
          "permissionCode": "view",
          "object": {
            "_id": "58af37e9079f33252df0e617",
            "name": "message of the day"
          },
          "_id": "58b0a52fea62d21af216e2cd"
        }
      ]
    },
    {
      "_id": "58af379b079f33252df0e615",
      "name": "Dan",
      "__v": 7,
      "permissions": [
        {
          "permissionCode": "view",
          "object": {
            "_id": "58af37e9079f33252df0e617",
            "name": "message of the day"
          },
          "_id": "58b0a84ffc9e061e63e6c310"
        }
      ]
    },
    {
      "_id": "58af3770079f33252df0e613",
      "name": "Alice",
      "__v": 3,
      "permissions": []
    }
  ]
}
```

#### [User] Add permission to an user on a specific object

`PUT` /api/v1/user/:userId/permission/:permissionCode/object/:objectId

| Parameter | Type     | Example                  |
|-----------|----------|--------------------------|
| userId   | ObjectId | 58af375d079f33252df0e612 |
| permissionCode   | String | “view” or “modify” |
| objectId   | ObjectId | 58af37e9079f33252df0e617 |

**Return example:**
```
Status 200
{
  "success": true,
  "data": "Permission \"view\" for object \"message of the day\" has been inserted successfully into the user \"Bob\"."
}

Status 500
{
  "success": false,
  "error": "User with id 58af375d079f33252df0e611 not found!"
}
```



#### [User] Clear user permissions

`DELETE` /api/v1/user/:userId/permissions

| Parameter | Type     | Example                  |
|-----------|----------|--------------------------|
| userId   | ObjectId | 58af3770079f33252df0e613 |

**Return example:**
```
Status 200
{
  "success": true,
  "data": "All permisions from user \"Alice\" have been cleared."
}

Status 500
{
  "success": false,
  "error": "User with id 58af3770079f33252df0e612 not found!"
}
```





#### [User] Check if user has a specific permission on an object

`GET` /api/v1/user/:userId/permission/:permissionCode/object/:objectId

| Parameter | Type     | Example                  |
|-----------|----------|--------------------------|
| userId   | ObjectId | 58af379b079f33252df0e615 |
| permissionCode   | String | “view” or “modify” |
| objectId   | ObjectId | 58af37e9079f33252df0e617 |


**Return example:**
```
Status 200
{
  "success": true,
  "data": false
}

Status 500
{
  "success": false,
  "error": "Object with id 58af37e9079f33252df0e616 not found!"
}
```




#### [User] Get user's permissions on a specific object

`GET` /api/v1/user/:userId/object/:objectId

| Parameter | Type     | Example                  |
|-----------|----------|--------------------------|
| userId   | ObjectId | 58af375d079f33252df0e612 |
| objectId   | ObjectId | 58af37e9079f33252df0e617 |


**Return example:**
```
Status 200
{
  "success": true,
  "data": [
    "view"
  ]
}

Status 500
{
  "success": false,
  "error": "Object with id 58af37e9079f33252df0e616 not found!"
}
```
