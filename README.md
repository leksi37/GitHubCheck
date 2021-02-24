# Description

This project was crated to show basic knowledge in the following areas: Angular, rxJs, GitHub API.
It includes a user input where you can enter a github username. By pressing enter or clicking search an Get request is going to be sent through Angular's HttpClient and a list of the user's repositories will be displayed in a table. Each row will contain repository's name and two buttons: one will redirect you to the github repository page and the other one will perform another request for the detailed repository's information, which would then be displayed next to the repository table.
Simple error handling is added to notify the user when a username doesn't exist or when the user doesn't have any public repositories.


## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.2.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

