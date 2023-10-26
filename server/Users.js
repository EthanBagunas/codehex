var express  = require('express');
var router = express.Router();

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Perform authentication logic by querying the database
  con.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      return res.send('Database error');
    }

    // Check if any rows were returned (authentication successful)
    if (results.length > 0) {
      res.send('<script>alert("Logging In"); window.location.href = "http://localhost:7000/homepage/";</script>');
    } else {
      res.send('Login failed. Please check your credentials.');
    }
  });
});

router.post('/register', function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const plainPassword = req.body.password;
  const account = req.body.account;

  con.connect(function (error) {
      if (error) throw error;
      const sql = "INSERT INTO users(username, email, password, account) VALUES (?, ?, ?, ?)";
      con.query(sql, [username, email, plainPassword, account], function (error, result) {
          if (error) throw error;
          console.log("Registered Successfully");
      });
  });
});

module.exports = router;

