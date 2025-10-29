// ====== Konfigurasi ======
const WA_NUMBER = '6281234567890'; // ganti dengan nomor tujuanmu (tanpa + atau 0 didepan)

// ====== Element refs ======
const orderRow = document.getElementById('orderRow');
const orderBtn = document.getElementById('orderBtn');
const summaryText = document.getElementById('summaryText');

function updateSummary() {
  const cards = Array.from(orderRow.querySelectorAll('.card'));
  const selected = [];

  cards.forEach(card => {
    const name = card.dataset.name || '';
    const price = card.dataset.price || '';
    const qtyInput = card.querySelector('.qty-input');
    const qty = Number(qtyInput.value) || 0;
    if (qty > 0) {
      selected.push({ name, qty, price });
      const cb = card.querySelector('.choose-checkbox');
      if (cb) cb.checked = true;
    } else {
      const cb = card.querySelector('.choose-checkbox');
      if (cb) cb.checked = false;
    }
  });

  if (selected.length === 0) {
    summaryText.textContent = 'Belum ada pesanan terpilih.';
    orderBtn.disabled = true;
  } else {
    const totalItems = selected.reduce((acc, cur) => acc + cur.qty, 0);
    summaryText.textContent = `Terpilih ${totalItems} item • ${selected.length} varian`;
    orderBtn.disabled = false;
  }
}

// Qty button + / - (event delegation)
orderRow.addEventListener('click', function(e){
  const dec = e.target.closest('.qty-decrease');
  const inc = e.target.closest('.qty-increase');

  if (dec || inc) {
    const card = e.target.closest('.card');
    if (!card) return;
    const input = card.querySelector('.qty-input');
    let val = Number(input.value) || 0;
    if (dec) val = Math.max(0, val - 1);
    if (inc) val = Math.min(99, val + 1);
    input.value = val;
    updateSummary();
  }
});

// manual input change
orderRow.addEventListener('input', function(e){
  if (e.target.matches('.qty-input')) updateSummary();
});

// checkbox toggles qty between 0 and 1
orderRow.addEventListener('change', function(e){
  if (e.target.matches('.choose-checkbox')) {
    const card = e.target.closest('.card');
    const input = card.querySelector('.qty-input');
    if (e.target.checked && Number(input.value) === 0) input.value = 1;
    if (!e.target.checked) input.value = 0;
    updateSummary();
  }
});

// Build WA message and open
orderBtn.addEventListener('click', function(){
  const cards = Array.from(orderRow.querySelectorAll('.card'));
  const selected = [];

  cards.forEach(card => {
    const name = card.dataset.name || '';
    const price = card.dataset.price || '';
    const qty = Number(card.querySelector('.qty-input').value) || 0;
    if (qty > 0) selected.push({ name, qty, price });
  });

  if (selected.length === 0) {
    alert('Pilih minimal 1 produk (set qty lebih dari 0).');
    return;
  }

  // format message (encode newline with %0A)
  let message = 'Halo, saya ingin memesan:%0A';
  selected.forEach(s => {
    message += `- ${s.name} (qty: ${s.qty})%0A`;
  });
  message += '%0ATerima kasih!';

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${message}`;
  window.open(waUrl, '_blank');
});

// init
updateSummary();
