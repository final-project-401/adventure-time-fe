# Software Requirements

## Vision

The vision of this application is to give it's users planning an adventure like hiking you always need to use multiple apps like a calendar, weather app, and a packing list. We aim to solve that problem by adding all of this things in one app.

## Scope (In/Out)

### IN - What will your product do?

- The application will provide a log in system that uses authentication to create a role based experience.
- The application will display a list of events for a specific area open to the public
- The application will display the current weather as well as the weekly weather for the current week
- The application will give the user the ability to receive notifications about a specific event.

### OUT - What will your product not do?

- This application will not be a iOS or Android application.

## MVP

- What will your MVP functionality be?
  - The application will display a list of events for a specific area, view weather forecast for the week out, find other event using APIs, and provide alerts to event attendees who have provided permissions to do so.

- What are your stretch goals?
  - A stretch goal for this application will be to incorporate additional event APIs such like groupon and eventbrite to provide application users access to other events going on in the area.

## Functional Requirements

- A user can create an account an login
- A user can access their own list of events, weather, packing lists, etc.
- A user can add, edit, remove items that they created
- A user can give permissions to receive notifications for changes to an event
- A user can give permissions to view the weather forecast for their specific location.

### Data Flow

User lands on splash page and either signs up or signs in using their credentials. User is then redirected to the main page where they are able to see all their events list, weather, packing lists, etc. There will be a way for the user to subscribe to receive notifications, provide permissions to provide locations to get the weather forecast for their specific location.

## Non-functional Requirements

- Security: Our application will make use of role-based authentication. This will ensure that users are only allowed to perform tasks based on their specific role.
- Usability: Our application will be built with mobile-first design in mind to allow for usage across multiple devices.
- Testing: Our application will use ThunderClient and Jest to perform unit tests, and ensure that data received from the APIs is what is needed for the application.
