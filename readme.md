<h2>REST API used for working with a collection of contacts.</h2>

<h2>Commands:</h2>
<li>npm start — server run in production mode;</li>
<li>npm run start:dev — server run in development mode;</li>
<li>npm run lint — run code check execution with the help of eslint; it should be done before each PR and fix all linter errors;</li>
<li>npm lint:fix — the same linter check, but with automatic error-fixing;</li>
<li>npm test — test launch in test environment;</li>
<li>npm test:coverage — test report generation.</li>

<h2>Routes:</h2>
<h3>1. Contacts</h3>
<li><a href="http://localhost:3000/api/contacts" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts</a> - (GET request): get all contacts;</li>
<li><a href="http://localhost:3000/api/contacts/id" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts/id</a> - (GET request): get a contact by Id;</li>
<li><a href="http://localhost:3000/api/contacts" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts</a> - (POST request): add a new contact (required fields: name, email, phone, optional field: favorite);</li>
<li><a href="http://localhost:3000/api/contacts/id" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts/id</a> - (PUT request): update an existing contact (at least 1 field should be updated);</li>
<li><a href="http://localhost:3000/api/contacts/id" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts/id</a> - (DELETE request): remove a contact;</li>
<li><a href="http://localhost:3000/api/contacts/id/favorite" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts/id/favorite</a> - (PATCH request): update 'favorite' field for a contact;</li>

<h3>2. Users</h3>
<li><a href="http://localhost:3000/api/users/signup" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/signup</a> - (POST request): user registration;</li>
<li><a href="http://localhost:3000/api/users/login" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/login</a> - (POST request): user login;</li>
<li><a href="http://localhost:3000/api/users/logout" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/logout</a> - (POST request): user logout;</li>
<li><a href="http://localhost:3000/api/users/current" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/current</a> - (GET request): get user data by token;</li>
<li><a href="http://localhost:3000/api/users/subscription" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/subscription</a> - (PATCH request): update user subscription;</li>
<li><a href="http://localhost:3000/api/users/starter" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/starter</a> - (GET request): access by "starter" subscription;</li>
<li><a href="http://localhost:3000/api/users/pro" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/pro</a> - (GET request): access by "pro" subscription;</li>
<li><a href="http://localhost:3000/api/users/business" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/business</a> - (GET request): access by "business" subscription;</li>
<li><a href="http://localhost:3000/api/users/avatars" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/avatars</a> - (PATCH request): upload user avatar;</li>

