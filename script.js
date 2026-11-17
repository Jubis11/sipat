// 1. Simulador com Termômetro de Risco
function analisarProposta() {
  const retorno = parseFloat(document.getElementById('retorno').value);
  const garantia = document.getElementById('garantia').value;
  const grupo = document.getElementById('grupo').value;
  const taxa = document.getElementById('taxa').value;

  if (isNaN(retorno) || retorno < 0) {
    alert('Por favor, informe uma porcentagem válida de lucro mensal prometido.');
    return;
  }

  let pontosRisco = 0;
  if (retorno >= 5) pontosRisco += 35;
  else if (retorno >= 2) pontosRisco += 15;

  if (garantia === 'sim') pontosRisco += 25;
  if (grupo === 'sim') pontosRisco += 15;
  if (taxa === 'sim') pontosRisco += 25;

  if (pontosRisco > 100) pontosRisco = 100;

  const painel = document.getElementById('painel-risco');
  const barra = document.getElementById('barra-progresso');
  const texto = document.getElementById('texto-risco');
  const modoClaro = document.body.classList.contains('tema-claro');

  painel.style.display = 'block';
  barra.style.width = `${Math.max(pontosRisco, 15)}%`;

  if (pontosRisco >= 60) {
    barra.style.backgroundColor = '#dc2626';
    texto.style.color = modoClaro ? '#991b1b' : '#fca5a5';
    texto.textContent = `🚨 RISCO CRÍTICO (${pontosRisco}%): Altíssima chance de pirâmide financeira ou plataforma falsa! Nunca transfira dinheiro nem pague taxas para sacar.`;
  } else if (pontosRisco >= 30) {
    barra.style.backgroundColor = '#d97706';
    texto.style.color = modoClaro ? '#92400e' : '#fde68a';
    texto.textContent = `⚠️ RISCO MODERADO (${pontosRisco}%): Sinais de alerta detectados. Consulte se a empresa tem autorização da CVM antes de investir.`;
  } else {
    barra.style.backgroundColor = '#059669';
    texto.style.color = modoClaro ? '#065f46' : '#a7f3d0';
    texto.textContent = `✅ RISCO BAIXO (${pontosRisco}%): Sem sinais típicos de pirâmide, mas lembre-se de operar apenas em corretoras oficiais e ativar o 2FA.`;
  }
}

// 2. Abas da seção Computadores Compartilhados
function abrirAba(idAba, botaoClicado) {
  document.querySelectorAll('.tab-content').forEach(aba => aba.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(idAba).classList.add('active');
  botaoClicado.classList.add('active');
}

// 3. Checklist Interativo
function atualizarChecklist() {
  const checks = document.querySelectorAll('.chk-posto:checked').length;
  const status = document.getElementById('status-checklist');
  const modoClaro = document.body.classList.contains('tema-claro');

  if (checks === 3) {
    status.textContent = '✅ 3 de 3 etapas concluídas! Posto de trabalho seguro.';
    status.style.color = modoClaro ? '#059669' : '#34d399';
  } else {
    status.textContent = `${checks} de 3 etapas concluídas.`;
    status.style.color = modoClaro ? '#0f4c81' : '#c084fc';
  }
}

// 4. Quiz Interativo com Destaque Visual por Pergunta
function corrigirQuiz() {
  const gabarito = {
    q1: 'b',
    q2: 'c',
    q3: 'a',
    q4: 'b',
    q5: 'b'
  };

  let acertos = 0;

  document.querySelectorAll('#form-quiz label').forEach(lbl => {
    lbl.classList.remove('opcao-correta', 'opcao-errada');
  });

  for (let questao in gabarito) {
    const correta = gabarito[questao];
    const inputCorreto = document.querySelector(`input[name="${questao}"][value="${correta}"]`);
    if (inputCorreto) {
      inputCorreto.parentElement.classList.add('opcao-correta');
    }

    const marcada = document.querySelector(`input[name="${questao}"]:checked`);
    if (marcada) {
      if (marcada.value === correta) {
        acertos++;
      } else {
        marcada.parentElement.classList.add('opcao-errada');
      }
    }
  }

  const resBox = document.getElementById('resultado-quiz');
  const modoClaro = document.body.classList.contains('tema-claro');

  resBox.style.display = 'block';
  resBox.style.background = acertos >= 4
    ? (modoClaro ? '#dcfce7' : 'rgba(52, 211, 153, 0.2)')
    : (modoClaro ? '#fef3c7' : 'rgba(251, 191, 36, 0.2)');
  resBox.style.border = acertos >= 4 ? '1px solid #16a34a' : '1px solid #d97706';
  resBox.style.color = modoClaro ? '#0f172a' : '#faf5ff';
  resBox.innerHTML = `Resultado: Você acertou <strong>${acertos} de 5</strong> perguntas! Confira acima as respostas marcadas em verde.`;
}

function refazerQuiz() {
  document.getElementById('form-quiz').reset();
  document.querySelectorAll('#form-quiz label').forEach(lbl => {
    lbl.classList.remove('opcao-correta', 'opcao-errada');
  });
  document.getElementById('resultado-quiz').style.display = 'none';
}

// 5. Alternar entre Modo Escuro e Modo Claro
function alternarTema() {
  document.body.classList.toggle('tema-claro');
  const botao = document.getElementById('btn-tema');

  if (document.body.classList.contains('tema-claro')) {
    botao.textContent = '🌙 Modo Escuro';
  } else {
    botao.textContent = '☀️ Modo Claro';
  }

  // Atualiza cores caso os resultados já estejam visíveis na tela
  if (document.getElementById('resultado-quiz').style.display === 'block') {
    corrigirQuiz();
  }
  if (document.getElementById('painel-risco').style.display === 'block') {
    analisarProposta();
  }
  atualizarChecklist();
}