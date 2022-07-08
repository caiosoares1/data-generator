import { Router } from "express";
import Pass from "../models/Pass.js";
import Email from "../models/Email.js";
import Cpf from "../models/Cpf.js";
import Cnpj from "../models/Cnpj.js";
import Domain from "../models/Domain.js"
import User from "../models/User.js"

const router = Router();

//////////////////////////////////////////////////////////////////////////////////////// ROUTES ///////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/', (req, res) => res.redirect('/Login.html'));

router.get('/Generator.html', (req, res) => res.redirect('/'));

router.post('/pass', async (req, res) => {
  const pass = Number(req.body.carac);
  const newPass = await Pass.generatePass(pass);
  res.json(newPass);
});

router.post('/email', async (req, res) => {
  const email = req.body;
  const newEmail = await Email.create(email);
  res.json(newEmail);
});

router.get('/domains', async (req, res) => {
  const domains = await Domain.readAll();
  res.json(domains);
});

router.post('/cpf', async (req, res) => {
  const cpf = req.body.mascara;
  const newCPF = await Cpf.create(cpf);
  res.json(newCPF);
});

router.post('/cnpj', async (req, res) => {
  const cnpj = req.body.mascara;
  const newCNPJ = await Cnpj.create(cnpj);
  res.json(newCNPJ);
});

router.post('/signup', async (req, res) => {
  const data = req.body;
  res.json(await User.signup(data));
});

router.get('/tokenverify', async (req, res) => {
  await User.statusAccess(req,res);
});

router.get('/logout', async (req, res) => {
  await User.exitAccess(req,res);
});

export default router;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////