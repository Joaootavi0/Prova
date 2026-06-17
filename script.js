const loginPage = "index.html";
const cadastroPage = "cadastro.html";

const $ = (id) => document.getElementById(id);

const erro = (inputId, msg = "") => {
  const errorEl = $(inputId + "Error");
  const inputEl = $(inputId);
  
  if (errorEl) {
    errorEl.textContent = msg;
  }
  if (inputEl) {
    if (msg) {
      inputEl.classList.add("invalid");
    } else {
      inputEl.classList.remove("invalid");
    }
  }
};

const validarEmail = (email) => email.includes("@") && email.trim().length >= 5;
const validarSenha = (senha) => senha.trim().length >= 6;

function login() {
  const email = $("loginEmail").value.trim();
  const senha = $("loginSenha").value;

  let ok = true;

  if (!validarEmail(email)) {
    erro("loginEmail", "Informe um e-mail válido.");
    ok = false;
  } else {
    erro("loginEmail");
  }

  if (!validarSenha(senha)) {
    erro("loginSenha", "Senha inválida (mínimo 6 caracteres).");
    ok = false;
  } else {
    erro("loginSenha");
  }

  if (!ok) return;

  const usuario = JSON.parse(localStorage.getItem("enemCadastro"));

  if (usuario && usuario.email === email && usuario.senha === senha) {
    alert("Login realizado com sucesso.");
  } else {
    alert("Usuário não encontrado ou senha incorreta.");
  }
}

function cadastro() {
  let ok = true;

  const nomeCompleto = $("nomeCompleto").value.trim();
  const email = $("email").value.trim();
  const telefone = $("telefone").value.trim();
  const nomeMae = $("nomeMae").value.trim();
  const nomePai = $("nomePai").value.trim(); 
  const endereco = $("endereco").value.trim();
  const numero = $("numero").value.trim();
  const cidade = $("cidade").value.trim();
  const estado = $("estado").value;
  const pais = $("pais").value.trim();
  const situacaoEnsino = $("situacaoEnsino").value;
  const tipoEscola = $("tipoEscola").value;
  const senha = $("senhaCadastro").value;
  const confirmarSenha = $("confirmarSenha").value;

  const validarObrigatorio = (id, valor, msg = "Campo obrigatório.") => {
    if (!valor) {
      erro(id, msg);
      ok = false;
    } else {
      erro(id);
    }
  };

  validarObrigatorio("nomeCompleto", nomeCompleto);
  
  if (!validarEmail(email)) {
    erro("email", "Informe um e-mail válido.");
    ok = false;
  } else {
    erro("email");
  }

  validarObrigatorio("telefone", telefone);
  validarObrigatorio("nomeMae", nomeMae);
  validarObrigatorio("endereco", endereco);
  validarObrigatorio("numero", numero);
  validarObrigatorio("cidade", city = cidade);
  validarObrigatorio("estado", estado, "Selecione o estado.");
  validarObrigatorio("situacaoEnsino", situacaoEnsino, "Selecione a situação.");
  validarObrigatorio("tipoEscola", tipoEscola, "Selecione o tipo de escola.");

  if (!validarSenha(senha)) {
    erro("senhaCadastro", "A senha deve ter pelo menos 6 caracteres.");
    ok = false;
  } else {
    erro("senhaCadastro");
  }

  if (senha !== confirmarSenha) {
    erro("confirmarSenha", "As senhas não conferem.");
    ok = false;
  } else {
    erro("confirmarSenha");
  }

  if (!ok) return;

  const dados = {
    nomeCompleto,
    email,
    telefone,
    nomeMae,
    nomePai,
    endereco,
    numero,
    cidade,
    estado,
    pais,
    situacaoEnsino,
    tipoEscola,
    senha
  };

  localStorage.setItem("enemCadastro", JSON.stringify(dados));
  alert("Inscrição salva com sucesso!");
  location.href = loginPage;
}

document.addEventListener("DOMContentLoaded", () => {
  $("btnCadastro") && ($("btnCadastro").onclick = () => location.href = cadastroPage);
  $("btnVoltar") && ($("btnVoltar").onclick = () => location.href = loginPage);

  $("loginForm") && ($("loginForm").onsubmit = (e) => {
    e.preventDefault();
    login();
  });

  $("signupForm") && ($("signupForm").onsubmit = (e) => {
    e.preventDefault();
    cadastro();
  });
});