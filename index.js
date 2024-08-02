const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item) && typeof item === 'string');

  const highestAlphabet = alphabets.length ? [alphabets.sort().reverse()[0]] : [];

  res.status(200).json({
    is_success: true,
    user_id: 'Parashar_Vemuri_07032004',
    email: 'parashar_vemuri@srmap.edu.in',
    roll_number: 'AP21110010545',
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
