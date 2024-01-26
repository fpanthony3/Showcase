// new-sg-server-api.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const db = require('./connect'); // Import the database connection and db.query

const app = express();
const port = 3000; // Replace with your desired port

//IMPLEMENTING PASSWORD SECURITY MEASURES
//(1)'npm install bcrypt'in server directory
//Ensure that when you later compare passwords (e.g., during login), you use bcrypt.compare:
//const isPasswordMatch = await bcrypt.compare(enteredPassword, storedHashedPassword); unhash and place in code

// Enable CORS middleware
app.use(cors());

// Use bodyParser for parsing JSON requests
app.use(bodyParser.json());

// Express route to handle createProfile request
app.post('/createProfile', async (req, res) => {
  try {
    const { userData } = req.body;

    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(userData.password, 10); // 10 is the number of salt rounds

    // Query the database to find the last user_id used and increment by one
    const lastUserIdQuery = 'SELECT MAX(user_id) FROM users';
    const { rows } = await db.query(lastUserIdQuery);
    const lastUserId = rows[0].max || 0; // Assuming user_id is an integer

    // Increment user_id by one
    const newUser_id = lastUserId + 1;

    // Create a row in the 'users' table
    const insertQueryUsers = `
      INSERT INTO users (user_id, username, first_name, last_name, email, mobile_no, address_line_1, address_line_2, locality, state, postal_code, country, member_since)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    await db.query(insertQueryUsers, [
      newUser_id,
      userData.username,
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.mobile_no,
      userData.address_line_1,
      userData.address_line_2,
      userData.locality,
      userData.state,
      userData.postal_code,
      userData.country,
      userData.member_since,
    ]);

    // Create a row in the 'user_settings' table
    const insertQuerySettings = `
      INSERT INTO user_settings (user_id, subscription_level, language, theme, email_notifications, sms_notifications, buy_notifications, sell_notifications, dump_notifications, default_exchange)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;
    await db.query(insertQuerySettings, [
      newUser_id,
      userData.subscription_level,
      userData.language,
      userData.theme,
      userData.email_notifications,
      userData.sms_notifications,
      userData.buy_notifications,
      userData.sell_notifications,
      userData.dump_notifications,
      userData.default_exchange,
    ]);

    // Create a row in the 'user_security' table with hashed password
    const insertQuerySecurity = `
      INSERT INTO user_security (user_id, password, email_verified, phone_verified, two_fa, question_1, answer_1, question_2, answer_2, question_3, answer_3, exchange_key, exchange_secret_key)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    await db.query(insertQuerySecurity, [
      newUser_id,
      hashedPassword,
      userData.email_verified,
      userData.phone_verified,
      userData.two_fa,
      userData.question_1,
      userData.answer_1,
      userData.question_2,
      userData.answer_2,
      userData.question_3,
      userData.answer_3,
      userData.exchange_key,
      userData.exchange_secret_key,
    ]);

    // Send the response back to the app with the new user_id
    res.json({ user_id: newUser_id });
  } catch (error) {
    console.error('Error creating profile on the server:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Express route to handle addAccount request
app.post('/addAccount', async (req, res) => {
  try {
    // Extract userData from the request body
    const { userData } = req.body;

    // Step 1: Update the 'users' table
    const updateQueryUsers = `
      UPDATE users
      SET username = $1, first_name = $2, last_name = $3, email = $4, mobile_no = $5, address_line_1 = $6, address_line_2 = $7, locality = $8, state = $9, postal_code = $10, country = $11, member_since = $12
      WHERE user_id = $13
    `;
    await db.query(updateQueryUsers, [
      userData.username,
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.mobile_no,
      userData.address_line_1,
      userData.address_line_2,
      userData.locality,
      userData.state,
      userData.postal_code,
      userData.country,
      userData.member_since,
      userData.user_id,
    ]);

    // Step 2: Update the 'user_settings' table (assuming user_id is a foreign key)
    const updateQuerySettings = `
      UPDATE user_settings
      SET subscription_level = $1, language = $2, theme = $3
      WHERE user_id = $4
    `;
    await db.query(updateQuerySettings, [
      userData.subscription_level,
      userData.language,
      userData.theme,
      userData.user_id,
    ]);

    // Step 3: Update the 'user_security' table (assuming user_id is a foreign key)
    const updateQuerySecurity = `
      UPDATE user_security
      SET 
        ${userData.password ? 'password = $1,' : ''} 
        email_verified = $2, 
        phone_verified = $3, 
        two_fa = $4, 
        question_1 = $5, 
        answer_1 = $6, 
        question_2 = $7, 
        answer_2 = $8, 
        question_3 = $9, 
        answer_3 = $10, 
        exchange_key = $11, 
        exchange_secret_key = $12
      WHERE user_id = $13
    `;

    // Adjust parameters based on whether password is provided
    const queryParamsSecurity = [
      userData.email_verified,
      userData.phone_verified,
      userData.two_fa,
      userData.question_1,
      userData.answer_1,
      userData.question_2,
      userData.answer_2,
      userData.question_3,
      userData.answer_3,
      userData.exchange_key,
      userData.exchange_secret_key,
      userData.user_id,
    ];

    // Add password to parameters if provided
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      queryParamsSecurity.unshift(hashedPassword);
    }

    await db.query(updateQuerySecurity, queryParamsSecurity);

    // Step 4: Send the response back to the app with the updated user_id
    res.json({ user_id: userData.user_id });
  } catch (error) {
    console.error('Error updating account on the server:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/// Express route to handle updateAccount request
app.post('/updateAccount', async (req, res) => {
  try {
    // Extract userData from the request body
    const { userData } = req.body;

    // Step 1: Update the 'users' table
    const updateQueryUsers = `
      UPDATE users
      SET username = $1, first_name = $2, last_name = $3, email = $4, mobile_no = $5, address_line_1 = $6, address_line_2 = $7, locality = $8, state = $9, postal_code = $10, country = $11, member_since = $12
      WHERE user_id = $13
    `;
    await db.query(updateQueryUsers, [
      userData.username,
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.mobile_no,
      userData.address_line_1,
      userData.address_line_2,
      userData.locality,
      userData.state,
      userData.postal_code,
      userData.country,
      userData.member_since,
      userData.user_id,
    ]);

    // Step 2: Update the 'user_settings' table (assuming user_id is a foreign key)
    const updateQuerySettings = `
      UPDATE user_settings
      SET subscription_level = $1, language = $2, theme = $3
      WHERE user_id = $4
    `;
    await db.query(updateQuerySettings, [
      userData.subscription_level,
      userData.language,
      userData.theme,
      userData.user_id,
    ]);

    // Step 3: Update the 'user_security' table (assuming user_id is a foreign key)
    const updateQuerySecurity = `
      UPDATE user_security
      SET 
        ${userData.password ? 'password = $1,' : ''} 
        email_verified = $2, 
        phone_verified = $3, 
        two_fa = $4, 
        question_1 = $5, 
        answer_1 = $6, 
        question_2 = $7, 
        answer_2 = $8, 
        question_3 = $9, 
        answer_3 = $10, 
        exchange_key = $11, 
        exchange_secret_key = $12
      WHERE user_id = $13
    `;

    // Adjust parameters based on whether password is provided
    const queryParamsSecurity = [
      userData.email_verified,
      userData.phone_verified,
      userData.two_fa,
      userData.question_1,
      userData.answer_1,
      userData.question_2,
      userData.answer_2,
      userData.question_3,
      userData.answer_3,
      userData.exchange_key,
      userData.exchange_secret_key,
      userData.user_id,
    ];

    // Add password to parameters if provided
    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      queryParamsSecurity.unshift(hashedPassword);
    }

    await db.query(updateQuerySecurity, queryParamsSecurity);

    // Step 4: Send the response back to the app with the updated user_id and subscription_level
    res.json({ user_id: userData.user_id, subscription_level: userData.subscription_level });
  } catch (error) {
    console.error('Error updating account on the server:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Express route to handle deactivateAccount request
app.post('/deactivateAccount', async (req, res) => {
  try {
    // Extract user_id from the request body
    const { user_id } = req.body;

    // Step 1: Move user to 'inactive_users' table
    const moveQuery = `
      INSERT INTO inactive_users
      SELECT * FROM users WHERE user_id = $1
    `;
    await db.query(moveQuery, [user_id]);

    // Step 2: Delete data from 'users' table
    const deleteQueryUsers = `
      DELETE FROM users
      WHERE user_id = $1
    `;
    await db.query(deleteQueryUsers, [user_id]);

    // Step 3: Delete data from 'user_settings' table
    const deleteQuerySettings = `
      DELETE FROM user_settings
      WHERE user_id = $1
    `;
    await db.query(deleteQuerySettings, [user_id]);

    // Step 4: Delete data from 'user_security' table
    const deleteQuerySecurity = `
      DELETE FROM user_security
      WHERE user_id = $1
    `;
    await db.query(deleteQuerySecurity, [user_id]);

    // Send success response
    res.json({ success: true });
  } catch (error) {
    console.error('Error deactivating account on the server:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
