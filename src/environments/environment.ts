// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyBWf2y4LDEFndzUIiEUQvyS1BA_EcgPQP8",
    authDomain: "vehicles7439b.firebaseapp.com",
    databaseURL: "https://vehicles7439b-default-rtdb.firebaseio.com",
    projectId: "vehicles7439b",
    storageBucket: "vehicles7439b.appspot.com",
    messagingSenderId: "398631603271",
    appId: "1:398631603271:web:c69ef1b8da49e50da17562"
  }
};

const app = initializeApp(environment.firebase);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
