import Database from '../db/database.js';
import jsonwebtoken from "jsonwebtoken";

async function signup(data) {
  const db = await Database.connect();

  const { name, email, senha } = data;

  const sql = `
    SELECT
      *
    FROM
      user
    WHERE
      email = ? 
  `;

  const result = await db.get(sql, [email]);

  try {
    if (email === result.email) {
      return false
    };
  } catch (error) {
    db.run(`
    INSERT INTO 
      user (name, email, senha)
    VALUES
      (?, ?, ?)
    `, [ name, email, senha ]);
    return true
  };
};

async function signin(req){
  
  const { email, senha } = req.body;

  if (!email || !senha){
    console.log('dados')
    return { error: 2, mensage: 'Dados incompletos!' };
  }
  
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      user
    WHERE
      email = ? and senha = ?
  `;

  const result = await db.get(sql, [email, senha]);
  
  if(!result){
    return { error: 1, mensage: 'E-mail ou senha incorreto(s)!' };
  } else {
    return { error: 0, name: result.name, email: result.email};
  }

};

async function createToken(name, email){
  const code = jsonwebtoken.sign({ name: name, email: email }, "Token");
  return code;
};

async function statusAccess(req, res){

  if(req.cookies.access_token){
    try{
      const result = jsonwebtoken.verify(req.cookies.access_token, 'Token');
      if(result){
        res.status(200).send({status: 0, info: result}); // Autorizado
      }
    } catch {
      res.status(400).send({status: 1}); // Não Autorizado
    }
  }else{
    res.status(401).send({status: 2}); // Sem Autorização
  }
};

async function exitAccess(req,res){
  res.clearCookie('access_token').redirect("Login.html");
};

export default { signup, signin, createToken, statusAccess, exitAccess }