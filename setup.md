# Crypto Application Deployment and Testing Guide
## IMPORTANT NOTICE!!!
To run this application locally after clonning from GitHub, instull dependencies by running the following code in the terminal:
```npm install```

One of the dependencies used in this application is [CORS Anywhere](https://github.com/Rob--W/cors-anywhere), a a NodeJS proxy that adds CORS headers to the proxied request. This dependency helps avoid CORS error. 

Once dependencies are installed, spin up the Cors Anywhere server by running the following code in your terminal:
```node proxy```

Follow the steps below to deploy and test the crypto application.

## Step 1: Build the React Application

Run the following command in the project directory to build the application:

```npm run build```


This will create a `build` folder containing optimized and minified static assets.

## Step 2: Deploy the Application

1. Choose a hosting platform or server for deployment, such as Netlify, Vercel, Heroku, AWS, or your own server.
2. Set up the hosting platform according to their documentation.
3. Upload the contents of the `build` folder to the hosting platform or server.

## Step 3: Configure Environment Variables

Configure your API KEY in the production environment of your hosting platform. You can get your API KEY from [Coinmarketcap](https://pro.coinmarketcap.com/signup/)

## Step 4: Access the Deployed Application

Once the deployment is complete, you can access the deployed application using the provided URL or domain.

## Step 5: Run the Unit Test

To run the unit test for the crypto application, follow these steps:

1. Open the terminal or command prompt.
2. Navigate to the project directory.
3. Run the following command to execute the unit test:

```npm test```
4. The test runner will execute the test and provide the test results, including any failures or errors encountered.

Remember to customize the deployment process based on your chosen hosting platform and specific requirements. The above steps provide a general guideline for deploying and testing a React application, but the exact process may vary depending on your deployment method and platform.



