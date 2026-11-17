function analisarProposta() {
  const retorno = parseFloat(document.getElementById('retorno').value);
  const garantia = document.getElementById('garantia').value;
  const taxa = document.getElementById('taxa').value;
  const box = document.getElementById('resultado-simulador');

  if (isNaN(retorno)) {
    alert('Por favor, informe a porcentagem de lucro mensal prometido.');
    return;
  }

  box.style.display = 'block';

  if (taxa === 'sim' || garantia === 'sim' || retorno >= 5) {
    box.style.background = 'rgba(239, 68, 68, 0.2)';
    box.style.border = '1px solid #ef4444';
    box.style.color = '#fca5a5';
    box.innerHTML = '🚨 ALERTA DE GOLPE! Promessas de lucro alto/garantido ou cobrança de taxa para liberar saque são características clássicas de pirâmide financeira e plataformas falsas.';
  } else {
    box.style.background = 'rgba(34, 197, 94, 0.2)';
    box.style.border = '1px solid #22c55e';
    box.style.color = '#86efac';
    box.innerHTML = '⚠️ ATENÇÃO MODERADA: Mesmo sem sinais imediatos de pirâmide, sempre verifique se a corretora tem autorização da CVM antes de transferir qualquer valor.';
  }
}

function atualizarChecklist() {
  const checks = document.querySelectorAll('.chk-posto:checked').length;
  const status = document.getElementById('status-checklist');
  if (checks === 3) {
    status.textContent = '✅ 3 de 3 etapas concluídas! Posto de trabalho seguro.';
    status.style.color = '#22c55e';
  } else {
    status.textContent = `${checks} de 3 etapas concluídas.`;
    status.style.color = '#38bdf8';
  }
}

function corrigirQuiz() {
  const gabarito = {
    q1: 'b',
    q2: 'c',
    q3: 'a',
    q4: 'b',
    q5: 'b'
  };

  let acertos = 0;
  const total = 5;

  for (let questao in gabarito) {
    const marcada = document.querySelector(`input[name="${questao}"]:checked`);
    if (marcada && marcada.value === gabarito[questao]) {
      acertos++;
    }
  }

  const resBox = document.getElementById('resultado-quiz');
  resBox.style.display = 'block';
  resBox.style.background = acertos >= 4 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)';
  resBox.style.border = acertos >= 4 ? '1px solid #22c55e' : '1px solid #f59e0b';
  resBox.style.color = '#f8fafc';

  resBox.innerHTML = `
    Você acertou <strong>${acertos} de ${total}</strong> perguntas!<br><br>
    <strong>Gabarito Oficial:</strong><br>
    1. Passavam por empresas de fachada ("laranjas") e convertiam em criptomoedas.<br>
    2. Promessa de lucro alto garantido e cobrança de taxa para liberar saque.<br>
    3. Bloquear a tela (ex: Win + L).<br>
    4. Fazer logout de todos os sistemas e encerrar a sessão.<br>
    5. Ajustar cadeira e monitor para manter postura confortável e cabos organizados.
  `;
}