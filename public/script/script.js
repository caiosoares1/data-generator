///////////////////////////////////////////////////////////////////////////////////////// CLIPBOARDS /////////////////////////////////////////////////////////////////////////////////////////////
const clipboard = document.getElementById('clipboard');
const clipboard2 = document.getElementById('clipboard2');
const clipboard3 = document.getElementById('clipboard3');
const clipboard4 = document.getElementById('clipboard4');


////////////////////////////////////////////////////////////////////////////////////////// RESULTS ///////////////////////////////////////////////////////////////////////////////////////////////
const resultPass = document.getElementById('result-pass');
const resultEmail = document.getElementById('result-email');
const resultCPF = document.getElementById('result-cpf');
const resultCNPJ = document.getElementById('result-cnpj');


/////////////////////////////////////////////////////////////////////////////////////////// FORMS ////////////////////////////////////////////////////////////////////////////////////////////////
const form = document.getElementById('caracs');
const form2 = document.getElementById('names');
const form3 = document.getElementById('cpf');
const form4 = document.getElementById('cnpj');
//const form5 = document.getElementById('cadastro');


/////////////////////////////////////////////////////////////////////////////////////// CREATE FORMS /////////////////////////////////////////////////////////////////////////////////////////////
form.onsubmit = (event) => {
  event.preventDefault();
  const pass = Object.fromEntries(new FormData(form));
  createPass(pass);
  form.reset();
};

form2.onsubmit = (event) => {
  event.preventDefault();
  const email = Object.fromEntries(new FormData(form2));
  createEmail(email);
  form2.reset();
};

form3.onsubmit = (event) => {
  event.preventDefault();
  const cpf = Object.fromEntries(new FormData(form3));
  createCPF(cpf);
  form3.reset();
};

form4.onsubmit = (event) => {
  event.preventDefault();
  const cnpj = Object.fromEntries(new FormData(form4));
  createCNPJ(cnpj);
  form4.reset();
};

/*form5.onsubmit = (event) => {
  event.preventDefault();
  const dados = Object.fromEntries(new FormData(form5));
  signup(dados);
  form5.reset();
};*/


//////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////////////////////////////////////////
async function createPass(pass) {
  const url = '/pass';

  const config = {
    method: 'post',
    body: JSON.stringify(pass),
    headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  const newPass = await (await fetch(url, config)).json();
  
  resultPass.innerText = newPass;
};

async function createEmail(email) {
  const url = '/email';

  const config = {
    method: 'post',
    body: JSON.stringify(email),
    headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  if(email.tipo == "--Selecione--"){
    resultEmail.innerText = "Apenas domínio válido!"
  }else{
    const newEmail = await (await fetch(url, config)).json();
    resultEmail.innerText = newEmail;
  };
};

async function loadDomain() {
  const select = document.querySelector('#tipo');

  const url = '/domains';

  const domains = await (await fetch(url)).json();

  for (const domain of domains) {
    const option = `<option value="${domain.domain}">${domain.domain}</option>`;

    select.insertAdjacentHTML('afterbegin', option);
  };
};

async function createCPF(cpf) {
  const url = '/cpf';

  const config = {
    method: 'post',
    body: JSON.stringify(cpf),
    headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  const newCPF = await (await fetch(url, config)).json();
  
  resultCPF.innerText = newCPF.cpf;
};

async function createCNPJ(cnpj) {
  const url = '/cnpj';

  const config = {
    method: 'post',
    body: JSON.stringify(cnpj),
    headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  const newCNPJ = await (await fetch(url, config)).json();
  
  resultCNPJ.innerText = newCNPJ.cnpj;
};

/*async function signup(dados) {
  const url = '/signup';

  const config = {
    method: 'post',
    body: JSON.stringify(dados),
    headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  await fetch(url, config).json();
};*/

loadDomain();


////////////////////////////////////////////////////////////////////////////////////////// CREATE CLIPBOARD ///////////////////////////////////////////////////////////////////////////////////////
clipboard.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultPass.innerText;

  if(!password) { return; }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Senha copiada para a área de transferência!');
});

clipboard2.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const email = resultEmail.innerText;

  if(!email) { return; }  
  textarea.value = email;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Email copiado para a área de transferência!');
});

clipboard3.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const cpf = resultCPF.innerText;

  if(!cpf) { return; }  
  textarea.value = cpf;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('CPF copiado para a área de transferência!');
});

clipboard4.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const cnpj = resultCNPJ.innerText;

  if(!cnpj) { return; }  
  textarea.value = cnpj;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('CNPJ copiado para a área de transferência!');
});
