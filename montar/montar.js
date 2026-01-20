const inputs = document.querySelectorAll('input, select');
const totalSpan = document.getElementById('total');
const whatsappNumber = "5532987109337";

inputs.forEach(input => {
  input.addEventListener('change', calcularTotal);
});

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

function finalizar() {
  const nome = document.getElementById("nome").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const bairro = document.getElementById("bairro").value.trim();
  const referencia = document.getElementById("referencia").value.trim();

  const size = document.querySelector('input[name="size"]:checked');
  if (!size) return alert("Escolha um tamanho!");

  if (!nome) return alert("Digite seu nome!");
  if (!telefone) return alert("Digite seu telefone!");

  const entrega = document.querySelector('input[name="entrega"]:checked');
  const entregaTexto = entrega.parentElement.innerText;

  if (entrega.value > 0 && (!rua || !numero || !bairro)) {
    return alert("Preencha rua, número e bairro para entrega!");
  }

  let adicionais = [];
  document.querySelectorAll('input[type="checkbox"]:checked')
    .forEach(item => adicionais.push(item.parentElement.innerText));

  const calda = document.getElementById("syrup");
  const caldaTexto = calda.options[calda.selectedIndex].text;

  const total = totalSpan.innerText;

  let mensagem = `
🍧 *PEDIDO – AÇAÍ DO MATHEUS*

👤 Nome: ${nome}
📞 Telefone: ${telefone}

📍 Endereço:
Rua ${rua}, Nº ${numero}
Bairro: ${bairro}
${referencia ? `📌 Referência: ${referencia}` : ""}

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
