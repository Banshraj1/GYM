# GYM-MyProject

This is a sample README file for GYM Project. It provides an overview of the project, installation instructions, usage guidelines, and contribution information.

## routers

main path http://localhost:4000/

## To register

go on http://localhost:4000/api/v1/register
inputs to proceed with registration:
compulsary {fullName, email, phone_number, age, username, password,}
optional fields { height, weight, avatar}

username must be unique

#FOR Developers
In this section, We take data from postman using "POST" method
if any field is missing it will through error
length of password should be greater than 6 else it will through error
if username is already taken it will through error to check this we have to check in database using User.findOne({username})

now check if it has avatar or not if it has avatar then we will upload it to cloudinary using cloudinary.uploader.upload(avatar, options)
options is an object which contains folder name, width, crop type
then we will get the url of the uploaded image and store it in avatarUrl variable
finally we will create a new user using User.create({fullName, email, phone_number, age, username, password, height, weight, avatar: avatarUrl})
Now, we will send the response to the user with status 201 and message "User registered successfully" along with user data except password
to remove password from user data we will use 'User.findById(newUser.\_id).select("-password")'

## To login

go on http://localhost:4000/api/v1/login

In this section, We take data from postman using "POST" method

inputs to proceed with login: {username, password}
both fields are compulsary
#FOR Developers
we will check if both fields are present else it will through error
then we will find the user using User.findOne({username})
if user is not found it will through error "Invalid username or password"
then we will compare the password using User.isPasswordCorrect(password)
(isPasswordCorrect is a method defined in user model to compare the password)

if password is incorrect it will through error "Invalid username or password"

if both username and password are correct then we will generate a token using accessAndRefreshTokensGenerator({userId: user.\_id}) function (in this function we are generating access token and refresh token using methods defined in user model after generatin tokens we will save refresh token in database)

then we will send the response to the user with status 200 and message "Login successful" along with tokens set in cookie and user data except password

## Logout

go on http://localhost:4000/api/v1/logout
for developers
here to we get access of user from req.user
In this section, we will clear the cookies "accessToken" and "refreshToken" using res.clearCookie() method
then we will send the response to the user with status 200 and message "Logout successful"

## update Details

go on http://localhost:4000/api/v1/updateDetails
inputs to proceed with updateDetails:
optional fields {fullName, email, phone_number, age, username, height, weight}
#FOR Developers
just get data from req.body and get user form req.user and update the fields which are present in req.body and then save using user.save({validateBeforeSave: false})
then send response with status 200 and message "User details updated successfully" along with updated user data except password and refreshToken

## Change Password

go on http://localhost:4000/api/v1/changePassword
inputs to proceed with changePassword: {username, oldPassword, newPassword}
both fields are compulsary
#FOR Developers
we will compare oldPassword with user password using User.isPasswordCorrect(oldPassword) and also check length of newPassword should be greater than 6 else it will through error
if oldPassword is incorrect it will through error "Old password is incorrect"
if oldPassword is correct then we will update the password with newPassword and save using user.save()
then we will send response with status 200 and message "Password changed successfully"

## delete user

go on http://localhost:4000/api/v1/deleteUser
#FOR Developers
here we will get user from req.user and then we will delete the user using user.remove()
then we will send response with status 200 and message "User deleted successfully"
