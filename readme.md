<h1>REST API used for working with a collection of contacts.</h1>

<h2>Commands:</h2>
npm start — server run in production mode;
npm run start:dev — server run in development mode;
npm run lint — run code check execution with the help of eslint, it should be done before each PR and fix all linter errors;
npm lint:fix — the same linter check, but with automatic error-fixing;
npm test — test launch in test environment;
npm test:coverage — test report generation.

<h2>Routes:</h2>
<h3>1.Contacts</h3>
http://localhost:3000/api/contacts - (GET request): get all contacts;
http://localhost:3000/api/contacts/id - (GET request): get a contact by Id;
http://localhost:3000/api/contacts - (POST request): add a new contact (required fields: name, email, phone, optional field: favorite);
http://localhost:3000/api/contacts/id - (PUT request): update an existing contact (at least 1 field should be updated);
http://localhost:3000/api/contacts/id - (DELETE request): remove a contact;
http://localhost:3000/api/contacts/id/favorite - (PATCH request): update 'favorite' field for a contact;

<h3>2.Users</h3>
http://localhost:3000/api/users/signup - (POST request): user registration;
http://localhost:3000/api/users/login - (POST request): user login;
http://localhost:3000/api/users/logout - (POST request): user logout;
http://localhost:3000/api/users/current - (GET request): get user data by token;
http://localhost:3000/api/users/subscription - (PATCH request): update user subscription;
http://localhost:3000/api/users/starter - (GET request): access by "starter" subscription;
http://localhost:3000/api/users/pro - (GET request): access by "pro" subscription;
http://localhost:3000/api/users/business - (GET request): access by "business" subscription;
http://localhost:3000/api/users/avatars - (PATCH request): upload user avatar;

