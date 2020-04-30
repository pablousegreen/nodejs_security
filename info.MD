npm start

GET
http://localhost:3001/api/posts/ 
auth-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFhMzJiY2I2ODYyZTBkMTg1MTg4OWIiLCJpYXQiOjE1ODgyMTI0NzcsImV4cCI6MTU4ODIxMjY1N30.qV2U6oPGxx2m2vcUcyClLioxDLSATKpFJrLRpfSUibM

POST
http://localhost:3001/api/user/login
{
	"email": "dev_user001@mail.com",
	"password": "eltoro001"
}

POST
http://localhost:3001/api/posts/refresh 
auth-token   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFhMzJiY2I2ODYyZTBkMTg1MTg4OWIiLCJpYXQiOjE1ODgyMTI0NzcsImV4cCI6MTU4ODIxMjY1N30.qV2U6oPGxx2m2vcUcyClLioxDLSATKpFJrLRpfSUibM
{
	"email": "dev_user001@mail.com"
} 

POST
http://localhost:3001/api/posts/register 
{
	"name": "Dev User001",
	"email": "dev_user001@mail.com",
	"password": "eltoro001"
} 