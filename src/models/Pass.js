import Database from '../db/database.js';

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%&*"

function getLowUpLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
};

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
};

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      pass
    WHERE
      id = ?
  `;

  const passid = await db.get(sql, [id]);

  const pass = passid.pass

  return pass;
}

async function generatePass(pass) {
  const db = await Database.connect();
  
  const PassLen = pass;

  let passwordgen = '';

  passwordgen += getLowUpLetter()

  passwordgen += getNumber()

  passwordgen += getSymbol()

  for(let i = passwordgen.length; i < PassLen; i++){
    const x = genetareX();
  
    passwordgen += x;
  };

  const psd = passwordgen;  

  const Pass = psd;
  
  const sql = `
  INSERT INTO 
    pass (Pass)
  VALUES
    (?)
  `;

  const {lastID} = await db.run(sql, [Pass]);
  
  return read(lastID);
};

function genetareX() {
  const xs = [];

  xs.push(getLowUpLetter());

  xs.push(getNumber());

  xs.push(getSymbol());

  if(xs.length === 0) return "";

  return xs[Math.floor(Math.random() * xs.length)]
};

export default {generatePass, read};