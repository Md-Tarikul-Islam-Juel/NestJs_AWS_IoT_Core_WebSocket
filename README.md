# NestJS AWS IoT Core WebSocket Boilerplate

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


![Version](https://img.shields.io/github/v/tag/Md-Tarikul-Islam-Juel/nestJS_Websocket?label=version&color=blue)
![Release](https://img.shields.io/github/v/release/Md-Tarikul-Islam-Juel/nestJS_Websocket?label=release&color=blue)
![Issues](https://img.shields.io/github/issues/Md-Tarikul-Islam-Juel/nestJS_Websocket?color=red)


The **NestJS_AWS_IoT_Core_WebSocket_Boilerplate** provides a solid foundation for enabling real-time communication between client applications (such as mobile apps) and IoT devices (such as ESP32) using NestJS servers.

**Enhanced Communication Flow:**
This boilerplate facilitates bidirectional communication between the client-side mobile app and IoT devices through the NestJS server. The modified communication flow enables the mobile app to send data to the NestJS server using WebSocket connections. Subsequently, the NestJS server forwards this data to IoT devices (e.g., ESP32) using AWS IoT Core. Conversely, data from the IoT devices can be relayed back to the mobile app via the NestJS server, completing the communication loop seamlessly.


🌟 **Bi-Directional Communication Flow:**

Mobile App  ◀─── WebSocket ───▶ NestJS ◀───AWS IoT Core ──▶ IoT Device 




## 🚀 Key Features: Boost your project speed

| Feature                    | Description                                                                                     |
|----------------------------|-------------------------------------------------------------------------------------------------|
| **Sign-Up & Login APIs**   | Streamline user onboarding with a smooth and intuitive registration and login experience.       |
| **Email Verification API** | Boost security and prevent unauthorized access through email OTP verification.                  |
| **OTP Resend API**         | Never let users get stuck! Offer convenient OTP resend options for seamless account activation. |
| **Forget Password API**    | Forget passwords? No problem! Our secure recovery process helps users regain access quickly.    |
| **Change Password API**    | Take control of your account security with effortless password changes.                         |


## 📖 Swagger Documents:

<img src="https://github.com/Md-Tarikul-Islam-Juel/NestJs_AWS_IoT_Core_WebSocket/blob/main/documents/photos/swagger.png" alt="swagger" style="display: block; margin: auto;">

## 📁 Project contents:

- **Code**: Contains the source code for your project, including all necessary files and modules.
- **Postman Collection**: Provides pre-configured requests for testing and interacting with your API endpoints in
  the documents folder.
- **Swagger Documentation (API Documentation)**:
  Generates interactive documentation describing your API endpoints, request parameters, response formats, and
  authentication methods.
  Accessible at **http://localhost:3000/api**

## 🚴🏿 Setup Instructions:

1. **Clone the Repository:**
   - Download or clone the repository to your local machine.

2. **Create Environment File:**
   - Navigate to the root directory.
   - Create a `.env` file based on `.env.example`.
   - Modify the variables in `.env` according to your configuration.

3. **Install Dependencies:**
   - Open your terminal.
   - Run `yarn install` or `npm install` to install project dependencies.

4. **Setup Docker:**
   - Ensure Docker is installed on your machine.
   - Run docker-compose up -d to start the PostgreSQL DB container.
   
5. **Import Postman Collection:**
   - Locate `NestJS_AWS_IoT_Core_WebSocket_collection.json` in `documents/postman/`.
   - For web socket, you will find the socket configuration process in `documents/postman/websocket`.
   - Import the collection into Postman.

6. **Run the Project:**
   - Start the project with `npm start` or `yarn start` in the terminal.

7. **Access Swagger Documentation:**
   - Open `http://localhost:3000/api` in your web browser to view the Swagger documentation.



## 📖 Example:

1. **postman ─▶ server ─▶ aws iot core**
<img src="https://github.com/Md-Tarikul-Islam-Juel/NestJs_AWS_IoT_Core_WebSocket/blob/main/documents/photos/21.png" alt="aws" style="display: block; margin: auto;">
<img src="https://github.com/Md-Tarikul-Islam-Juel/NestJs_AWS_IoT_Core_WebSocket/blob/main/documents/photos/22.png" alt="aws" style="display: block; margin: auto;">
<img src="https://github.com/Md-Tarikul-Islam-Juel/NestJs_AWS_IoT_Core_WebSocket/blob/main/documents/photos/23.png" alt="aws" style="display: block; margin: auto;">
<img src="https://github.com/Md-Tarikul-Islam-Juel/NestJs_AWS_IoT_Core_WebSocket/blob/main/documents/photos/24.png" alt="aws" style="display: block; margin: auto;">

2. **postman ◀─ server ◀─ aws iot core**
<img src="https://github.com/Md-Tarikul-Islam-Juel/NestJs_AWS_IoT_Core_WebSocket/blob/main/documents/photos/11.png" alt="aws" style="display: block; margin: auto;">
<img src="https://github.com/Md-Tarikul-Islam-Juel/NestJs_AWS_IoT_Core_WebSocket/blob/main/documents/photos/12.png" alt="aws" style="display: block; margin: auto;">
<img src="https://github.com/Md-Tarikul-Islam-Juel/NestJs_AWS_IoT_Core_WebSocket/blob/main/documents/photos/13.png" alt="aws" style="display: block; margin: auto;">


## ℹ️ Important Note:

⚠️ Please note that you need to sign up and then sign in to obtain a JSON Web Token (JWT) for authentication.

