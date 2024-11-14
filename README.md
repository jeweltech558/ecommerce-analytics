

# Ecommerce Analytics

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)

## Overview

Ecommerce Analytics is a robust application designed to track, record, and analyze visitor activity on an ecommerce website. It helps in tracking page visits, user interactions, and session data to provide insights into user behavior, popular products, and overall site performance. This tool is essential for ecommerce businesses to optimize their websites based on user engagement.

## Features

- **Visitor Tracking**: Records visitor activity such as page visits, session duration, and user type.
- **Page-wise Visitor Count**: Get the count of how many times each visitor has visited a page in a day.
- **Analytics**: View aggregated data on visitor activities to gain insights into user behavior.
- **Real-time Session Logging**: Tracks and logs each visitor's actions in real time.
- **Socket.IO Integration**: Provides real-time updates via WebSockets for visitor activity logs.
- **Error Handling**: Centralized error handler for consistent API error responses.
- **Standardized API Responses**: API responses follow a consistent format for easy consumption.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Date/Time Handling**: Moment.js (timezone support for Asia/Dhaka)
- **Real-Time Communication**: Socket.IO
- **Error Handling**: Centralized middleware for standardized error responses
- **Environment**: MongoDB Atlas (or local database)

## Installation

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (>= 14.x.x)
- **MongoDB** (or a MongoDB Atlas account for cloud storage)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-analytics.git
   cd ecommerce-analytics
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```bash
    ENVIRONMENT=development
    PORT=8010
    SOCKET_PORT=8011
    MONGODB_URL=
   ```

4. Run the application:
   ```bash
   npm start
   ```

   The application will start running on `http://localhost:5000` by default.

## API Endpoints

### 1. **Visitor Activity Tracking API**

#### **POST /api/visitor/activity**

- **Description**: Tracks visitor activity for a specific page and logs session data.
- **Request Body**:
  ```json
  {
    "visitorId": "12345",
    "userName": "John Doe",
    "pageId": "abcd1234",
    "deviceType": "mobile",
    "ipAddress": "192.168.1.1",
    "requestDevice": "iPhone",
    "sourceName": "Google",
    "reqUrl": "/product/xyz",
    "duration": 120,
    "userType": "guest",
    "pageName": "Product XYZ"
  }
  ```

- **Response**:
  ```json
  {
    "status": "new",
    "message": "New visitor log created"
  }
  ```

---

### 2. **Get Page-wise Visitor Count API**

#### **GET /api/visitor/analytics**

- **Description**: Retrieves the count of visitors per page for a specific day.
- **Query Parameters**:
  - `date`: The date in `YYYY-MM-DD` format for which you want to retrieve the data.

- **Example Request**:
  ```
  GET /api/visitor/analytics?date=2024-11-14
  ```

- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "pageName": "Crime & Punishment",
        "visitorCount": 150
      },
      {
        "pageName": "The Alchemist",
        "visitorCount": 1000
      },
      {
        "pageName": "Sesher Kabita",
        "visitorCount": 560
      }
    ]
  }
  ```

---

## Socket.IO Integration

This application also uses **Socket.IO** for real-time visitor activity tracking. Socket.IO allows the server to push updates to connected clients (such as a dashboard) immediately when visitor activity is logged.

### 1. **Real-Time Visitor Activity Log via Socket.IO**

The following log is emitted through **Socket.IO** each time visitor activity is recorded:

#### Socket.IO Log Format:

```json
{
  "Ack": "visitorActivity",
  "data": {
    "visitorId": "096c64e82cd71387cc1235",
    "userType": "login",
    "userName": "John Doe",
    "pageName": "homepage",
    "pageId": "",
    "deviceType": "website",
    "ipAddress": "192.168.1.1",
    "requestDevice": "website",
    "sourceName": "google",
    "reqUrl": "/",
    "pageCount": 1,
    "duration": 30000,
    "statusId": 1
  }
}
```

#### Explanation of Fields:
- `Ack`: Acknowledgment type, indicating the type of activity log (`visitorActivity`).
- `visitorId`: Unique identifier for the visitor session.
- `userType`: Type of the user, such as `guest` or `login`.
- `userName`: Name of the user (if available).
- `pageName`: Name of the page visited.
- `pageId`: ID of the page (optional).
- `deviceType`: Type of device (e.g., `mobile`, `website`).
- `ipAddress`: IP address of the visitor.
- `requestDevice`: The device used to make the request (e.g., `iPhone`, `website`).
- `sourceName`: Source of the visit (e.g., `google`).
- `reqUrl`: The URL visited.
- `pageCount`: The number of pages visited in the session.
- `duration`: Duration of the visit in milliseconds.
- `statusId`: Status identifier for the session (e.g., `1` for active, `2` for inactive).

---

## Error Handling

The application uses a **centralized error handler** to ensure consistent error responses across the API. Errors are returned in the following format:

```json
{
  "status": "error",
  "message": "Error description here",
  "error": "Detailed error information here"
}
```

For unhandled errors, the response will return a **500 Internal Server Error**.

---

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Clone your fork to your local machine:
   ```bash
   git clone https://github.com/your-username/ecommerce-analytics.git
   ```
3. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
4. Make your changes.
5. Commit your changes with a descriptive message:
   ```bash
   git commit -m "add: new feature for visitor tracking"
   ```
6. Push to your fork:
   ```bash
   git push origin feature-name
   ```
7. Open a pull request.

---

## Testing

To ensure the quality of the application, run the tests using:

```bash
npm test
```

Make sure all tests pass before submitting a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Additional Information

For more information on usage, configuration, and extending the application, please check the official documentation or contact the project maintainers.

---

### Notes

1. **Customization**: The application is flexible and can be customized to track additional user activities and analytics by extending the schema and API endpoints.
2. **Deployment**: To deploy the application to production, consider using services like Heroku, AWS, or DigitalOcean with environment variables set up for MongoDB and other configurations.

---

