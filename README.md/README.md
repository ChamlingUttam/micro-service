### ═══════════════════════════════════════
### STEP 1 — Register User (if not done)
### ═══════════════════════════════════════
POST http://localhost:3000/user/api/auth/register
Content-Type: application/json

{
  "username": "ram",
  "email": "ram@gmail.com",
  "password": "123456"
}

### ═══════════════════════════════════════
### STEP 2 — Register Captain (if not done)
### ═══════════════════════════════════════
POST http://localhost:3000/uber/api/auth/register
Content-Type: application/json

{
  "username": "captain1",
  "email": "captain@gmail.com",
  "password": "123456"
}

### ═══════════════════════════════════════
### STEP 3 — Login User → copy token
### ═══════════════════════════════════════
POST http://localhost:3000/user/api/auth/login
Content-Type: application/json

{
  "email": "ram@gmail.com",
  "password": "123456"
}

### ═══════════════════════════════════════
### STEP 4 — Login Captain → copy token
### ═══════════════════════════════════════
POST http://localhost:3000/uber/api/auth/login
Content-Type: application/json

{
  "email": "captain@gmail.com",
  "password": "123456"
}

### ═══════════════════════════════════════
### STEP 5 — Captain starts waiting for ride
### Send this and LEAVE IT PENDING
### ═══════════════════════════════════════
GET http://localhost:3000/uber/api/auth/new-ride
Authorization: Bearer PASTE_CAPTAIN_TOKEN_HERE

### ═══════════════════════════════════════
### STEP 6 — User creates ride
### Send this RIGHT AFTER step 5
### Copy _id from response
### ═══════════════════════════════════════
POST http://localhost:3000/ride/create-ride
Content-Type: application/json
Authorization: Bearer PASTE_USER_TOKEN_HERE

{
  "pickup": "Kathmandu",
  "destination": "Butwal"
}

### ═══════════════════════════════════════
### STEP 7 — Captain accepts the ride
### Paste _id from step 6 response
### ═══════════════════════════════════════
PUT http://localhost:3000/ride/accept-ride?rideId=PASTE_RIDE_ID_HERE
Authorization: Bearer PASTE_CAPTAIN_TOKEN_HERE