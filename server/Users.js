const express= require ('express')
const user =express();
const path = require ('path')
var con = require('./connection');

user.use(express.static(path.join(__dirname, '../public')));

user.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user/Signup.html'));
});

user.post('/login', (req, res) => {
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

user.post('user/register', function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const plainPassword = req.body.password;
    const account = req.body.account;
  
    // Hash the password using bcrypt
    /* bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        
    });*/
    con.connect(function (error) {
        if (error) throw error;
        const sql = "INSERT INTO users (username, email, password, account) VALUES (?, ?, ?, ?)";
        con.query(sql, [username, email, plainPassword, account], function (error, result) {
            if (error) throw error;
            console.log("Registered Successfully");
        });
    });
});

module.exports = user;