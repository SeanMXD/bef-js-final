<h2>Setup</h2>
<ol>
<li>
<p>Open up your terminal/command prompt.</p>
</li>
<li>
<p>Navigate to your desktop in your terminal:</p>
<pre class="language-text"><code class="language-text">cd Desktop
</code></pre>
</li>
<li>
<p>Then, navigate to the <code>Express-Course</code> directory in your terminal:</p>
<pre class="language-text"><code class="language-text">cd Express-Course
</code></pre>
</li>
</ol>
<hr>
<h2>Requirements</h2>
<h3>Step 1</h3>
<p>Create an Express application with the Express generator</p>
<ul>
<li>This application should be named <code>L10HandsOn</code> and should live within your <code>Express-Course</code> directory</li>
<li>Install all needed dependencies
<ul>
<li>This application should use Sequelize as its ORM</li>
</ul>
</li>
</ul>
<hr>
<h3>Step 2</h3>
<p>Create a new MySQL database called <code>bulletinboard</code></p>
<hr>
<h3>Step 3</h3>
<p>Run migrations to create two new tables: <code>users</code> and <code>posts</code></p>
<ul>
<li>These tables should have the following structure:
<ul>
<li><strong>users:</strong>
<ul>
<li><code>UserId</code>: integer, autoincrement, primary key, not null</li>
<li><code>FirstName</code>: string</li>
<li><code>LastName</code>: string</li>
<li><code>Username</code>: string, unique</li>
<li><code>Password</code>: string</li>
<li><code>Email</code>: string, unique</li>
<li><code>Admin</code>: boolean, default value is false, not null</li>
<li><code>createdAt</code>: date, not null</li>
<li><code>updatedAt</code>: date, not null</li>
</ul>
</li>
<li><strong>posts:</strong>
<ul>
<li><code>PostId</code>: integer, autoincrement, primary key, not null</li>
<li><code>PostTitle</code>: string</li>
<li><code>PostBody</code>: string</li>
<li><code>UserId</code>: integer, foreign key to UserId in users table</li>
<li><code>createdAt</code>: date, not null</li>
<li><code>updatedAt</code>: date, not null</li>
</ul>
</li>
</ul>
</li>
</ul>
<hr>
<h3>Step 4</h3>
<p>Update models to reflect the create table migrations</p>
<ul>
<li>Don't forget the associations</li>
</ul>
<hr>
<h3>Step 5</h3>
<p>Users should be able to Signup/Login/Logout</p>
<ul>
<li>Use JWT for secure login (hashing and salting passwords)</li>
</ul>
<hr>
<h3>Step 6</h3>
<p>Users should be able to create, edit, and delete</p>
<ul>
<li>Be able to click on a post to update or delete it
<ul>
<li>Run a migration to add a <code>Deleted</code> column</li>
<li>After the post has been deleted, redirect the user to their profile page</li>
</ul>
</li>
</ul>
<hr>
<h3>Step 7</h3>
<p>Users should be able to view their profile page. Their profile page should render the following:</p>
<ul>
<li>Their full name</li>
<li>Their username</li>
<li>The posts they have written</li>
</ul>
<hr>
<h3>Step 8</h3>
<p>Admin users should be able to see a list of all users that have not been deleted by the user's first and last name</p>
<ul>
<li>Run another migration to add a <code>Deleted</code> column</li>
<li>Render a different hbs file for the Admin profile page, which should list all users</li>
<li>Every Admin should see the same page. Use the route <code>/users/admin</code></li>
</ul>
<hr>
<h3>Step 9</h3>
<p>Admin users should be able to click on a user and view their information, but not edit their information</p>
<ul>
<li>Use the route <code>/users/admin/editUser/:id</code></li>
</ul>
<hr>
<h3>Step 10</h3>
<p>Admin users should be able to Delete users and their posts, but not edit them</p>
<hr>
<h3>Step 11</h3>
<p>Add some styling to your application so it is unique to your taste</p>