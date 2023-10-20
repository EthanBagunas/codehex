var express  = require('express');
var app = express();
const path = require ('path')
var bodyParser = require('body-parser');
const cors = require('cors')
const multer = require('multer');
const storage = multer.memoryStorage(); 
const upload =multer({ storage:multer.memoryStorage()});


/*const users= require('./users');
app.use('/users', users);*/

var con = require('./connection');


app.use(cors());


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/SurrenderedPets', (req, res) => {
  res.render('pets');
});

app.get('/LandingPage', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/LandingPage/LandingPage.html'));
});
app.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/HomePage/homepage.html'));
});
app.get('/surrender', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/surrender/index.html'));
});

app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/DevInfo/Developer.html'));
});

app.get('/donate', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/DonationPage/DonationPage.html'));
});

app.get('/display', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/DisplayRegister/display.html'));
});

app.post('/display', (req, res) => {
  const searchData = req.body;
  console.log('Received Search Data:', searchData);
  
  const species = req.body.species;
  const gender = req.body.gender;
  const size = req.body.size;
  const breed = req.body.breed;
  
  const sql = 'SELECT * FROM checking WHERE species = ? AND gender = ? AND size = ? AND breed = ?';
  con.query(sql, [species, gender, size, breed], (error, result) => {
  if (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ pet: result});
    }
  });

});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/user/Signup.html'));
});

app.post('/login', (req, res) => {
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

app.post('/register', function (req, res) {
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

app.post('/insert', upload.single('petpic'), function (req, res) {
  const date = req.body.date;
  const name = req.body.name;
  const address = req.body.address;
  const age = req.body.age;
  const species = req.body.species;
  const petname = req.body.petname;
  const breed = req.body.breed;
  const gender = req.body.gender;
  const size = req.body.size;
  const email = req.body.email;
  const mno = req.body.mno;
  const petpic = req.file.buffer.toString('base64'); // Use req.file.buffer to access the file data

  con.connect(function (err) {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ error: 'Database connection error' });
      return;
    }

    console.log("Connected!!!")
    var sql = "INSERT INTO checking(date, name, address, age, species, petname, breed, gender, size, email, mno, petpic) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    con.query(sql, [date, name, address, age, species, petname, breed, gender, size, email, mno, petpic], function (err, result) {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Database query error' });
        return;
      }

      console.log("1 record inserted");
      res.status(200).json({ message: 'Record inserted successfully' });
    });
  });
});

const port = 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





