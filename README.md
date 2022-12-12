# Air Quality

Yassir code test project.

Follow these instructions to get started:

# 1- Install the Dependencies
Run the following
```
npm install
```

# 2- Start the API
To start in production (port 80), run the following
```
npm start
```
To start in development (port 3000) (Windows only), run the following
```
npm run dev
```

# 3- Run the Cron Job
To run the Cron job open a new terminal and run the following
```
npm run cron
```

# 4- Run the Tests
Run the following
```
npm run test
```

# 5- Use the API
To use the API you can use port 80 on production and port 3000 on development.<br />
You also need to pass the API key as a GET parameter on all endpoints.<br />
You can find the API key in the .env file of the mode you are running.<br />
PS: you can check postman documentation for examples.

# Database Access
To access the database and check the data, you can get the connection string from .env file under "MONGO_URL" and use MongoDB Compass.

# API Documentation
You can access the API's docs here: https://www.postman.com/altimetry-technologist-62752876/workspace/air-quality/

Thank you.
