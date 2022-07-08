import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import router from './routes/routes.js';
import User from "./models/User.js";

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(cookieParser());

app.use(router);

app.use((req, res, next) => {
  res.status(404).send('Content not found');
});

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json ({
      message: 'Something broke!'
  });
});

router.post('/signin', async (req, res) => {

  const login = await User.signin(req) 
  console.log(login);

  if (login.error == 1){
      return res.send(login);
  } else if(login.error == 0){
      const code = await User.createToken(login.name, login.email);
      res.cookie("access_token",code).send({error: 0});
  }
});

app.listen(3000, () => console.log('Server is running!'));