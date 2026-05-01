'use strict';

// ─── Food database (per 100g) ───────────────────────────────────────────────
const FOOD_DB = [
  { name: 'Куриная грудка (варёная)', cal: 165, p: 31, f: 3.6, c: 0 },
  { name: 'Куриное бедро (варёное)', cal: 215, p: 26, f: 12, c: 0 },
  { name: 'Говядина (варёная)', cal: 218, p: 26, f: 12, c: 0 },
  { name: 'Свинина (варёная)', cal: 294, p: 25, f: 21, c: 0 },
  { name: 'Рыба (треска, варёная)', cal: 78, p: 18, f: 0.6, c: 0 },
  { name: 'Лосось (запечённый)', cal: 206, p: 20, f: 13, c: 0 },
  { name: 'Яйцо куриное', cal: 155, p: 13, f: 11, c: 1.1 },
  { name: 'Молоко 2,5%', cal: 52, p: 2.8, f: 2.5, c: 4.7 },
  { name: 'Творог 5%', cal: 121, p: 17, f: 5, c: 1.8 },
  { name: 'Сметана 20%', cal: 206, p: 2.8, f: 20, c: 3.2 },
  { name: 'Сыр российский', cal: 364, p: 23, f: 30, c: 0 },
  { name: 'Кефир 2,5%', cal: 50, p: 3.4, f: 2.5, c: 3.6 },
  { name: 'Йогурт натуральный', cal: 68, p: 5, f: 3.2, c: 3.5 },
  { name: 'Рис варёный', cal: 130, p: 2.7, f: 0.3, c: 28 },
  { name: 'Гречка варёная', cal: 110, p: 4.2, f: 1.1, c: 21 },
  { name: 'Овсянка варёная', cal: 68, p: 2.4, f: 1.4, c: 12 },
  { name: 'Макароны варёные', cal: 158, p: 5.5, f: 0.9, c: 31 },
  { name: 'Картофель варёный', cal: 82, p: 1.8, f: 0.1, c: 19 },
  { name: 'Батон', cal: 262, p: 7.7, f: 2.9, c: 50 },
  { name: 'Хлеб ржаной', cal: 210, p: 8, f: 3.3, c: 40 },
  { name: 'Яблоко', cal: 52, p: 0.3, f: 0.2, c: 14 },
  { name: 'Банан', cal: 89, p: 1.1, f: 0.3, c: 23 },
  { name: 'Апельсин', cal: 47, p: 0.9, f: 0.1, c: 12 },
  { name: 'Виноград', cal: 67, p: 0.6, f: 0.2, c: 17 },
  { name: 'Арбуз', cal: 30, p: 0.6, f: 0.1, c: 7.6 },
  { name: 'Клубника', cal: 32, p: 0.7, f: 0.3, c: 7.7 },
  { name: 'Морковь', cal: 41, p: 0.9, f: 0.2, c: 10 },
  { name: 'Огурец', cal: 15, p: 0.7, f: 0.1, c: 3.6 },
  { name: 'Помидор', cal: 18, p: 0.9, f: 0.2, c: 3.9 },
  { name: 'Капуста белокочанная', cal: 27, p: 1.8, f: 0.1, c: 5.8 },
  { name: 'Брокколи варёная', cal: 35, p: 2.4, f: 0.4, c: 7.2 },
  { name: 'Лук репчатый', cal: 40, p: 1.1, f: 0.1, c: 9.3 },
  { name: 'Масло подсолнечное', cal: 884, p: 0, f: 100, c: 0 },
  { name: 'Масло сливочное', cal: 717, p: 0.5, f: 81, c: 0.1 },
  { name: 'Сахар', cal: 387, p: 0, f: 0, c: 100 },
  { name: 'Мёд', cal: 304, p: 0.3, f: 0, c: 82 },
  { name: 'Арахис', cal: 567, p: 26, f: 49, c: 16 },
  { name: 'Миндаль', cal: 579, p: 21, f: 50, c: 22 },
  { name: 'Грецкий орех', cal: 654, p: 15, f: 65, c: 14 },
  { name: 'Шоколад тёмный', cal: 546, p: 5, f: 31, c: 60 },
  { name: 'Чипсы', cal: 536, p: 7, f: 35, c: 53 },
  { name: 'Coca-Cola (на 100 мл)', cal: 42, p: 0, f: 0, c: 11 },
  { name: 'Апельсиновый сок', cal: 45, p: 0.7, f: 0.2, c: 10 },
  { name: 'Пиво светлое (100 мл)', cal: 43, p: 0.5, f: 0, c: 3.6 },
  { name: 'Кофе чёрный (100 мл)', cal: 2, p: 0.3, f: 0, c: 0 },
  { name: 'Кефир 1%', cal: 40, p: 3.2, f: 1, c: 4 },
  { name: 'Пельмени варёные', cal: 250, p: 12, f: 10, c: 28 },
  { name: 'Пицца маргарита', cal: 266, p: 11, f: 10, c: 33 },
  { name: 'Гамбургер', cal: 295, p: 17, f: 14, c: 24 },
];

// ─── State ───────────────────────────────────────────────────────────────────
const todayKey = () => new Date().toISOString().slice(0, 10);

function loadState() {
  try {
    const raw = localStorage.getItem('calorie_log');
    const allData = raw ? JSON.parse(raw) : {};
    const goal = parseInt(localStorage.getItem('calorie_goal') || '2000', 10);
    return { entries: allData[todayKey()] || [], goal };
  } catch { return { entries: [], goal: 2000 }; }
}

function saveEntries(entries) {
  try {
    const raw = localStorage.getItem('calorie_log');
    const allData = raw ? JSON.parse(raw) : {};
    allData[todayKey()] = entries;
    localStorage.setItem('calorie_log', JSON.stringify(allData));
  } catch {}
}

function saveGoal(goal) {
  localStorage.setItem('calorie_goal', String(goal));
}

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const dateDisplay    = document.getElementById('dateDisplay');
const goalInput      = document.getElementById('goalInput');
const progressFill   = document.getElementById('progressFill');
const consumedLabel  = document.getElementById('consumedLabel');
const remainingLabel = document.getElementById('remainingLabel');
const totalProtein   = document.getElementById('totalProtein');
const totalFat       = document.getElementById('totalFat');
const totalCarbs     = document.getElementById('totalCarbs');
const foodSearch     = document.getElementById('foodSearch');
const weightInput    = document.getElementById('weightInput');
const caloriesInput  = document.getElementById('caloriesInput');
const proteinInput   = document.getElementById('proteinInput');
const fatInput       = document.getElementById('fatInput');
const carbsInput     = document.getElementById('carbsInput');
const suggestionsEl  = document.getElementById('suggestions');
const mealGroupsEl   = document.getElementById('mealGroups');
const emptyState     = document.getElementById('emptyState');
const btnClear       = document.getElementById('btnClear');
const foodForm       = document.getElementById('foodForm');
const mealButtons    = document.querySelectorAll('.meal-btn');

// ─── App state ───────────────────────────────────────────────────────────────
let { entries, goal } = loadState();
let selectedMeal = 'breakfast';
let activeSuggestionIdx = -1;

// ─── Init ─────────────────────────────────────────────────────────────────────
goalInput.value = goal;
displayDate();
render();

// ─── Date display ─────────────────────────────────────────────────────────────
function displayDate() {
  const d = new Date();
  dateDisplay.textContent = d.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
}

// ─── Goal ─────────────────────────────────────────────────────────────────────
goalInput.addEventListener('change', () => {
  const v = parseInt(goalInput.value, 10);
  if (!isNaN(v) && v > 0) { goal = v; saveGoal(goal); render(); }
});

// ─── Meal selector ───────────────────────────────────────────────────────────
mealButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    mealButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedMeal = btn.dataset.meal;
  });
});

// ─── Autocomplete ─────────────────────────────────────────────────────────────
foodSearch.addEventListener('input', () => {
  const q = foodSearch.value.trim().toLowerCase();
  if (q.length < 1) { hideSuggestions(); return; }
  const matches = FOOD_DB.filter(f => f.name.toLowerCase().includes(q)).slice(0, 8);
  if (!matches.length) { hideSuggestions(); return; }
  suggestionsEl.innerHTML = matches.map((f, i) =>
    `<li data-idx="${i}" data-name="${f.name}" data-cal="${f.cal}" data-p="${f.p}" data-f="${f.f}" data-c="${f.c}">
       <span>${highlight(f.name, q)}</span>
       <span class="sug-cal">${f.cal} ккал</span>
     </li>`
  ).join('');
  suggestionsEl.classList.add('visible');
  activeSuggestionIdx = -1;
});

function highlight(text, q) {
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text;
  return text.slice(0, idx) + `<mark>${text.slice(idx, idx + q.length)}</mark>` + text.slice(idx + q.length);
}

foodSearch.addEventListener('keydown', e => {
  const items = suggestionsEl.querySelectorAll('li');
  if (!items.length) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activeSuggestionIdx = Math.min(activeSuggestionIdx + 1, items.length - 1);
    updateActiveSuggestion(items);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    activeSuggestionIdx = Math.max(activeSuggestionIdx - 1, 0);
    updateActiveSuggestion(items);
  } else if (e.key === 'Enter' && activeSuggestionIdx >= 0) {
    e.preventDefault();
    fillFromSuggestion(items[activeSuggestionIdx]);
  } else if (e.key === 'Escape') {
    hideSuggestions();
  }
});

function updateActiveSuggestion(items) {
  items.forEach((li, i) => li.classList.toggle('active', i === activeSuggestionIdx));
}

suggestionsEl.addEventListener('click', e => {
  const li = e.target.closest('li');
  if (li) fillFromSuggestion(li);
});

function fillFromSuggestion(li) {
  foodSearch.value  = li.dataset.name;
  caloriesInput.value = li.dataset.cal;
  proteinInput.value  = li.dataset.p;
  fatInput.value      = li.dataset.f;
  carbsInput.value    = li.dataset.c;
  hideSuggestions();
  weightInput.focus();
}

document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) hideSuggestions();
});

function hideSuggestions() {
  suggestionsEl.classList.remove('visible');
  suggestionsEl.innerHTML = '';
  activeSuggestionIdx = -1;
}

// ─── Form submit ──────────────────────────────────────────────────────────────
foodForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = foodSearch.value.trim();
  const weight = parseFloat(weightInput.value);
  const cal100 = parseFloat(caloriesInput.value);
  if (!name) { shake(foodSearch); return; }
  if (!weight || weight <= 0) { shake(weightInput); return; }
  if (isNaN(cal100) || cal100 < 0) { shake(caloriesInput); return; }

  const ratio = weight / 100;
  const entry = {
    id: Date.now(),
    name,
    weight,
    meal: selectedMeal,
    cal: Math.round(cal100 * ratio * 10) / 10,
    p: Math.round((parseFloat(proteinInput.value) || 0) * ratio * 10) / 10,
    f: Math.round((parseFloat(fatInput.value) || 0) * ratio * 10) / 10,
    c: Math.round((parseFloat(carbsInput.value) || 0) * ratio * 10) / 10,
  };

  entries.push(entry);
  saveEntries(entries);
  render();
  resetForm();
});

function resetForm() {
  foodSearch.value = '';
  caloriesInput.value = '';
  proteinInput.value = '';
  fatInput.value = '';
  carbsInput.value = '';
  weightInput.value = '100';
}

function shake(el) {
  el.style.borderColor = 'var(--danger)';
  el.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)' },
    { transform: 'translateX(0)' },
  ], { duration: 300 });
  setTimeout(() => { el.style.borderColor = ''; }, 1200);
}

// ─── Clear ────────────────────────────────────────────────────────────────────
btnClear.addEventListener('click', () => {
  if (!entries.length) return;
  if (confirm('Очистить весь дневник за сегодня?')) {
    entries = [];
    saveEntries(entries);
    render();
  }
});

// ─── Render ───────────────────────────────────────────────────────────────────
const MEAL_LABELS = { breakfast: 'Завтрак', lunch: 'Обед', dinner: 'Ужин', snack: 'Перекус' };
const MEAL_ORDER  = ['breakfast', 'lunch', 'dinner', 'snack'];

function render() {
  const totalCal  = entries.reduce((s, e) => s + e.cal, 0);
  const totalProt = entries.reduce((s, e) => s + e.p, 0);
  const totalFatV = entries.reduce((s, e) => s + e.f, 0);
  const totalCarbV= entries.reduce((s, e) => s + e.c, 0);

  // Progress
  const pct = Math.min((totalCal / goal) * 100, 100);
  progressFill.style.width = pct + '%';
  progressFill.classList.toggle('over', totalCal > goal);
  consumedLabel.textContent = `${Math.round(totalCal)} ккал съедено`;
  const rem = goal - totalCal;
  remainingLabel.textContent = rem >= 0
    ? `${Math.round(rem)} ккал осталось`
    : `${Math.round(-rem)} ккал сверх нормы`;
  remainingLabel.style.color = rem < 0 ? 'var(--danger)' : '';

  // Macros
  totalProtein.textContent = Math.round(totalProt);
  totalFat.textContent     = Math.round(totalFatV);
  totalCarbs.textContent   = Math.round(totalCarbV);

  // Log
  const hasEntries = entries.length > 0;
  emptyState.classList.toggle('hidden', hasEntries);
  mealGroupsEl.innerHTML = '';

  MEAL_ORDER.forEach(meal => {
    const group = entries.filter(e => e.meal === meal);
    if (!group.length) return;
    const groupCal = group.reduce((s, e) => s + e.cal, 0);

    const section = document.createElement('div');
    section.className = 'meal-group';
    section.innerHTML = `
      <div class="meal-group-header">
        <span class="meal-group-title">
          <span class="dot dot-${meal}"></span>${MEAL_LABELS[meal]}
        </span>
        <span class="meal-group-kcal">${Math.round(groupCal)} ккал</span>
      </div>
    `;
    group.forEach(entry => {
      const item = document.createElement('div');
      item.className = 'food-item';
      item.innerHTML = `
        <div class="food-item-name">${escHtml(entry.name)}</div>
        <div class="food-item-weight">${entry.weight} г</div>
        <div class="food-item-kcal">${Math.round(entry.cal)} ккал</div>
        <button class="food-item-delete" data-id="${entry.id}" title="Удалить">✕</button>
      `;
      section.appendChild(item);
    });
    mealGroupsEl.appendChild(section);
  });

  // Delete handlers
  mealGroupsEl.querySelectorAll('.food-item-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      entries = entries.filter(e => e.id !== Number(btn.dataset.id));
      saveEntries(entries);
      render();
    });
  });
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
