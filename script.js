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

  painel.style.display = 'block';
  barra.style.width = `${Math.max(pontosRisco, 15)}%`;

  if (pontosRisco >= 60) {
    barra.style.backgroundColor = '#f87171';
    texto.style.color = '#fca5a5';
    texto.textContent = `🚨 RISCO CRÍTICO (${pontosRisco}%): Altíssima chance de pirâmide financeira ou plataforma falsa! Nunca transfira dinheiro nem pague taxas para sacar.`;
  } else if (pontosRisco >= 30) {
    barra.style.backgroundColor = '#fbbf24';
    texto.style.color = '#fde68a';
    texto.textContent = `⚠️ RISCO MODERADO (${pontosRisco}%): Sinais de alerta detectados. Consulte se a empresa tem autorização da CVM antes de investir.`;
  } else {
    barra.style.backgroundColor = '#34d399';
    texto.style.color = '#a7f3d0';
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
  if (checks === 3) {
    status.textContent = '✅ 3 de 3 etapas concluídas! Posto de trabalho seguro.';
    status.style.color = '#34d399';
  } else {
    status.textContent = `${checks} de 3 etapas concluídas.`;
    status.style.color = '#c084fc';
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

  // Limpa marcações anteriores
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
  resBox.style.display = 'block';
  resBox.style.background = acertos >= 4 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(251, 191, 36, 0.2)';
  resBox.style.border = acertos >= 4 ? '1px solid #34d399' : '1px solid #fbbf24';
  resBox.style.color = '#faf5ff';
  resBox.innerHTML = `Resultado: Você acertou <strong>${acertos} de 5</strong> perguntas! Confira acima as respostas marcadas em verde.`;
}

function refazerQuiz() {
  document.getElementById('form-quiz').reset();
  document.querySelectorAll('#form-quiz label').forEach(lbl => {
    lbl.classList.remove('opcao-correta', 'opcao-errada');
  });
  document.getElementById('resultado-quiz').style.display = 'none';
}