const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const middlewares = require("./middleware");

const app = express();
app.use(cors());

// body parser
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App runnung on port ${port}`);
});

function isPrime(number) {
  if (number < 2) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

function isPerfect(number) {
  let sum = 1;
  for (let i = 2; i <= number / 2; i++) {
    if (number % i === 0) sum += i;
  }
  return sum === number;
}

function isArmstrong(num) {
  const digits = String(num).split("").map(Number);
  const power = digits.length;
  return digits.reduce((sum, d) => sum + d ** power, 0) === num;
}

async function getFunFact(number) {
  try {
    const response = await axios.get(`http://numbersapi.com/${number}/math`);
    return response.data;
  } catch {
    return "Fun fact not available.";
  }
}

// Validation middleware
const validateNumber = (req, res, next) => {
  const { number } = req.query;

  if (number === undefined || number === "") {
    return res.status(400).json({ number, error: true });
  }

  if (isNaN(number) || !Number.isInteger(Number(number))) {
    return res.status(400).json({ number, error: true });
  }

  req.number = parseInt(number);
  next();
};

// server.listen
app.get("/api/classify-number", validateNumber, async (req, res) => {
  const { number } = req.query;

  const properties = number % 2 === 0 ? ["even"] : ["odd"];
  if (isArmstrong(number)) properties.push("armstrong");

  res.status(200).json({
    number: number,
    is_prime: isPrime(number),
    is_perfect: isPerfect(number),
    properties,
    digit_sum: [...String(number)].reduce((sum, d) => sum + parseInt(d), 0),
    fun_fact: await getFunFact(number),
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.export = app;
