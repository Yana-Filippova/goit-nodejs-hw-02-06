<h2>REST API used for working with a collection of contacts.</h2>

<h2>Commands:</h2>
<li><b>npm start</b> - server run in production mode;</li>
<li><b>npm run start:dev</b> - server run in development mode;</li>
<li><b>npm run lint</b> - run code check execution with the help of eslint; it should be done before each PR and fix all linter errors;</li>
<li><b>npm lint:fix</b> - the same linter check, but with automatic error-fixing;</li>
<li><b>npm test</b> - test launch in test environment;</li>
<li><b>npm test:coverage</b> - test report generation.</li>

<h2>Routes:</h2>
<h3>1. Contacts</h3>
<li><a href="http://localhost:3000/api/contacts" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts</a> - <b>/GET request/</b> - get all contacts;</li>
<li><a href="http://localhost:3000/api/contacts/id" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts/id</a> - <b>/GET request/</b> - get a contact by Id;</li>
<li><a href="http://localhost:3000/api/contacts" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts</a> - <b>/POST request/</b> - add a new contact (required fields: name, email, phone, optional field: favorite);</li>
<li><a href="http://localhost:3000/api/contacts/id" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts/id</a> - <b>/PUT request/</b> - update an existing contact (at least 1 field should be updated);</li>
<li><a href="http://localhost:3000/api/contacts/id" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts/id</a> - <b>/DELETE request/</b> - remove a contact;</li>
<li><a href="http://localhost:3000/api/contacts/id/favorite" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/contacts/id/favorite</a> - <b>/PATCH request/</b> - update 'favorite' field for a contact;</li>

<h3>2. Users</h3>
<li><a href="http://localhost:3000/api/users/signup" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/signup</a> - <b>/POST request/</b> - user registration;</li>
<li><a href="http://localhost:3000/api/users/login" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/login</a> - <b>/POST request/</b> - user login;</li>
<li><a href="http://localhost:3000/api/users/logout" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/logout</a> - <b>/POST request/</b> - user logout;</li>
<li><a href="http://localhost:3000/api/users/current" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/current</a> - <b>/GET request/</b> - get user data by token;</li>
<li><a href="http://localhost:3000/api/users/subscription" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/subscription</a> - <b>/PATCH request/</b> - update user subscription;</li>
<li><a href="http://localhost:3000/api/users/starter" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/starter</a> - <b>/GET request/</b> - access by "starter" subscription;</li>
<li><a href="http://localhost:3000/api/users/pro" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/pro</a> - <b>/GET request/</b> - access by "pro" subscription;</li>
<li><a href="http://localhost:3000/api/users/business" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/business</a> - <b>/GET request/</b> - access by "business" subscription;</li>
<li><a href="http://localhost:3000/api/users/avatars" rel="noopener noreferrer" target="_blank">http://localhost:3000/api/users/avatars</a> - <b>/PATCH request/</b> - upload user avatar;</li>

