const inputs = document.querySelectorAll('input, select');
const totalSpan = document.getElementById('total');
const whatsappNumber = "5532987109337";

inputs.forEach(input => {
  input.addEventListener('change', calcularTotal);
});

function calcularTotal() {
  let total = 0;

  // tamanho
  const size = document.querySelector('input[name="size"]:checked');
  if (size) total += parseFloat(size.value);

  // adicionais
  document.querySelectorAll('input[type="checkbox"]:checked')
    .forEach(item => {
      total += parseFloat(item.value);
    });

  totalSpan.innerText = total.toFixed(2);
}

function calcularTotal() {
  let total = 0;

  const size = document.querySelector('input[name="size"]:checked');
  if (size) total += parseFloat(size.value);

  document.querySelectorAll('input[type="checkbox"]:checked')
    .forEach(item => total += parseFloat(item.value));

  const entrega = document.querySelector('input[name="entrega"]:checked');
  if (entrega) total += parseFloat(entrega.value);

  totalSpan.innerText = total.toFixed(2);
}

document.querySelectorAll('input').forEach(el => {
  el.addEventListener('change', calcularTotal);
});

function finalizar() {
  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();

  const size = document.querySelector('input[name="size"]:checked');
  if (!size) {
    alert("Escolha um tamanho!");
    return;
  }

  if (!nome) {
    alert("Digite seu nome!");
    return;
  }

  const entrega = document.querySelector('input[name="entrega"]:checked');
  const entregaTexto = entrega.parentElement.innerText;

  if (entrega.value > 0 && !endereco) {
    alert("Informe o endereço para entrega!");
    return;
  }

  let adicionais = [];
  document.querySelectorAll('input[type="checkbox"]:checked')
    .forEach(item => adicionais.push(item.parentElement.innerText));

  const caldaSelect = document.getElementById("syrup");
  const caldaTexto = caldaSelect.options[caldaSelect.selectedIndex].text;

  const total = document.getElementById("total").innerText;

  let mensagem = `
🍧 *PEDIDO – AÇAÍ DO MATHEUS*

👤 Cliente: ${nome}
📦 ${entregaTexto}
${endereco ? `📍 Endereço: ${endereco}` : ""}

🥣 Tamanho:
${size.parentElement.innerText}

➕ Adicionais:
${adicionais.length ? adicionais.join(", ") : "Nenhum"}

🍫 Calda:
${caldaTexto}

💰 *Total: R$ ${total}*

Obrigado pela preferência 💜
`;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}