let selectedFunction = null;
let chart = null;

function setFunction(func) {
  selectedFunction = func;

  const buttons = document.querySelectorAll('.func-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  const activeBtn = [...buttons].find(btn => btn.textContent.toLowerCase().includes(getFunctionName(func)));
  if (activeBtn) activeBtn.classList.add('active');
}

function getFunctionName(func) {
  switch (func) {
    case 'quadratic': return 'kuadrat';
    case 'sine': return 'sinus';
    case 'exp': return 'eksponensial';
    case 'polynomial': return 'polinomial';
    case 'log': return 'logaritmik';
    default: return '';
  }
}

function updateSegmentCount(value) {
  document.getElementById('segmentCount').innerText = value;
}

function f(x) {
  switch (selectedFunction) {
    case 'quadratic': return x * x;
    case 'sine': return Math.sin(x);
    case 'exp': return Math.exp(x);
    case 'polynomial': return Math.pow(x, 3) + x;
    case 'log': return x > 0 ? Math.log(x) : 0;
    default: return 0;
  }
}

function trapezoidalRule(a, b, n) {
  const h = (b - a) / n;
  let sum = f(a) + f(b);

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += 2 * f(x);
  }

  return (h / 2) * sum;
}

function calculate() {
  const a = parseFloat(document.getElementById('lower').value);
  const b = parseFloat(document.getElementById('upper').value);
  const n = parseInt(document.getElementById('segments').value);

  if (!selectedFunction) {
    alert("Pilih fungsi terlebih dahulu.");
    return;
  }

  const result = trapezoidalRule(a, b, n);
  document.getElementById('result').innerHTML = `✅ Hasil integral: <strong>${result.toFixed(6)}</strong>`;

  drawChart(a, b, n);
}

function drawChart(a, b, n) {
  const labels = [];
  const data = [];
  const h = (b - a) / n;

  for (let i = 0; i <= n; i++) {
    const x = a + i * h;
    labels.push(x.toFixed(2));
    data.push(f(x));
  }

  const ctx = document.getElementById('chartCanvas').getContext('2d');

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'f(x)',
        data: data,
        fill: 'origin',
        backgroundColor: 'rgba(142, 36, 170, 0.2)',
        borderColor: '#8e24aa',
        tension: 0.3,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'x'
          }
        },
        y: {
          title: {
            display: true,
            text: 'f(x)'
          }
        }
      }
    }
  });
}


