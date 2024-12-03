# Link to Firebase-hosted site: https://property-pocket.web.app/

# Directory Structure and Overview

The directory in which our "real" work and code lies is in the src file. The functions folder technically has an Express backend that returns secret values needed for our Angular app, but the main part of our project is everything in src. The environments.ts file in the environments folder is actually where this secret information will be added.

The app folder in the src folder is where Angular logic takes place.

The components folder in app has all of our components, which include bookmarked listings, nav-bar, ngx infinite scroll, property card cover, and property card. Each of these components has an associated HTML file, scss file, and ts file. The HTML and scss is used to render content to the screen and style it while the ts (typescript) file contains all the logic that is used to render our data to the screen. The nav-bar appears on every page as a component. The ngx infinite scroll component corresponds to our home page, which contains an infinite scroll of properties once a user searches by zipcode. Zipcode search is actually a part of the nav-bar component. This infinite scroll component itself contains the property card component and the property card cover component. The property card cover component is just the main photo that is displayed for the front of the property card while the property card component is the back of the card and has our like, bookmark, comment, and view more images functionality. The bookmarked listings component is a copy and paste of our ngx infinite scroll component for the most part, but the data that is displayed will only be bookmarked properties for a user. The landing component is pretty much an empty component that didn't get used.

We have another folder for services, which is our backend logic for our Angular app. These files handle how we get data from our API in addition to providing other needed functionality, such as how we retrieve and store data in Firebase. The apiservice file is where we get our data from Zillow for the properties to be displayed in the cards. The backendservice file is where our Firebase logic goes and is what we use to control our comment, like, and bookmark functionality. The pagination dummy service allows us to do infinite scrolling. The savesretrieval and zipretrieval services make it so that we can access bookmarks and liked information as well as access the zipcode entered in, when different components need them. If more than 1 component needs this info, the data needs to be made available to these multiple components and in a way act as "global variables." The secrets service file is solely to retrieve our secret values from our backend Express.

Our app routing module handles routing and displaying the right components for our home page and bookmarked listings page. Our app component html page has our navbar available for our two routes/pages. The app component scss file has more minor styling. Our app component.ts file links to our app component html file to render that. App module .ts is a boiler plate Angular file that has all our components and imports. The other files are authentication-related files for users. Some files and logic may not be needed in the authentication files, but removing them threw errors.


# References
Some references/citations of our code are made in-line as comments. In addition to these citations, AI tools like Chat-GPT, V0 by Vercel,
Gemini, and other AI tools were heavily used for front end HTML and styling as well as for other code logic and debugging. Firebase docs were also used at one point.

Automatically generated documentation when setting up an Angular app can be found below:

# Propertypocket

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.3.

## Development server

Run `npm install` then `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
Switch to "UnitTesting" branch to run the unit tests. Do this by running `git checkout UnitTests`.
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
