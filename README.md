## Searching for Physicians on a Map (Client-side)

This entire repository is dedicated to the frontend portion of the web app. It is a React.js application, with one primary component (App.js), which includes most of the code for the single page app.

### Design Choices
- First of all, decided to separate the frontend and backend, as that is the trend these days. Also, integrating the React app with Node.js application is less efficient as you may want different origins accessing the API such as a mobile app in the future. In addition, if you want to change infrastructure, it is easier to focus on each one without affecting the other. 
- I have selected a package for the Google Maps API to abstract that component within React.
- My frontend focuses on simplicity so that the REST API can handle manipulation of the string, conversions, etc. 
- Another API is the Geocoding API from Google in order to convert the given address of a physician into lattitude and longitude. This is then used fed into the Maps API to accurately pinpoint the location of the physician.

### Note
- I decided to not make this application extremely modular with many components as there would be wasted efficiency making API calls in different components for such as small application.
- Please refer to the backend server-side documentation for information about the backend and database.


### Deployment: http://physiciansearch.com.s3-website-us-west-1.amazonaws.com/ (as posted above)
- Runs on AWS S3 instance through static website hosting.
- Can install s3cwd to smoothly deploy from a repository to s3 bucket (i.e. integrate with CI).


### `npm start` (local environment)

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
