import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

const CATEGORIES = [
  { name: 'Продукты', icon: 'ShoppingCart', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Одежда', icon: 'Shirt', color: 'bg-sky-100 text-sky-700' },
  { name: 'Техника', icon: 'Smartphone', color: 'bg-violet-100 text-violet-700' },
  { name: 'Дом', icon: 'Home', color: 'bg-amber-100 text-amber-700' },
  { name: 'Аптека', icon: 'Pill', color: 'bg-rose-100 text-rose-700' },
];

const RECENT = [
  { title: 'Пятёрочка', cat: 'Продукты', amount: 1240, date: 'Сегодня', icon: 'ShoppingCart' },
  { title: 'Аптека «Будь здоров»', cat: 'Аптека', amount: 680, date: 'Вчера', icon: 'Pill' },
  { title: 'DNS', cat: 'Техника', amount: 4990, date: '23 июня', icon: 'Smartphone' },
  { title: 'Леруа Мерлен', cat: 'Дом', amount: 2150, date: '22 июня', icon: 'Home' },
  { title: 'Магнит', cat: 'Продукты', amount: 870, date: '21 июня', icon: 'ShoppingCart' },
];

const INITIAL_LIST = [
  { id: 1, title: 'Молоко 3.2%', qty: 2, price: 89, cat: 'Продукты', done: false },
  { id: 2, title: 'Хлеб бородинский', qty: 1, price: 55, cat: 'Продукты', done: true },
  { id: 3, title: 'Корм для кота', qty: 1, price: 450, cat: 'Дом', done: false },
  { id: 4, title: 'Витамин D', qty: 1, price: 320, cat: 'Аптека', done: false },
];

const SPENDING = [
  { cat: 'Продукты', value: 42, color: '#10b981' },
  { cat: 'Техника', value: 28, color: '#8b5cf6' },
  { cat: 'Дом', value: 15, color: '#f59e0b' },
  { cat: 'Аптека', value: 9, color: '#f43f5e' },
  { cat: 'Одежда', value: 6, color: '#0ea5e9' },
];

const BUDGET = 45000;
const SPENT = 28930;

const Index = () => {
  const [list, setList] = useState(INITIAL_LIST);
  const [tab, setTab] = useState<'home' | 'list' | 'stats'>('home');

  const remaining = BUDGET - SPENT;
  const percent = Math.round((SPENT / BUDGET) * 100);

  const toggle = (id: number) =>
    setList((l) => l.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  const clearDone = () => setList((l) => l.filter((i) => !i.done));

  const fmt = (n: number) => n.toLocaleString('ru-RU');

  // donut chart
  let acc = 0;
  const gradient = SPENDING.map((s) => {
    const seg = `${s.color} ${acc}% ${acc + s.value}%`;
    acc += s.value;
    return seg;
  }).join(', ');

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-emerald-500 to-emerald-600 px-5 pb-20 pt-7 text-white">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto flex max-w-md items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Icon name="PiggyBank" size={22} />
            </div>
            <span className="font-display text-xl font-extrabold tracking-tight">Копилка</span>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur transition hover:bg-white/30">
            <Icon name="Bell" size={18} />
          </button>
        </div>

        <div className="relative mx-auto mt-6 max-w-md animate-fade-in">
          <p className="text-sm text-white/80">Привет, Анна! 👋</p>
          <p className="font-display text-2xl font-bold">Июнь 2026</p>
        </div>
      </header>

      <main className="mx-auto -mt-12 max-w-md px-4 pb-28">
        {tab === 'home' && <HomeView />}
        {tab === 'list' && <ListView />}
        {tab === 'stats' && <StatsView />}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 px-6 py-2 backdrop-blur">
        <div className="flex items-center justify-around">
          {[
            { id: 'home', icon: 'House', label: 'Главная' },
            { id: 'list', icon: 'ListChecks', label: 'Список' },
            { id: 'stats', icon: 'ChartPie', label: 'Статистика' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`flex flex-col items-center gap-1 rounded-xl px-4 py-1.5 text-xs font-medium transition ${
                tab === t.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={t.icon} size={22} />
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );

  function HomeView() {
    return (
      <div className="space-y-4">
        {/* Budget card */}
        <div className="animate-scale-in rounded-3xl bg-card p-5 shadow-lg shadow-emerald-900/5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Потрачено за месяц</p>
              <p className="font-display text-3xl font-extrabold">{fmt(SPENT)} ₽</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Остаток</p>
              <p className="font-display text-2xl font-bold text-primary">{fmt(remaining)} ₽</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={percent} className="h-3" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>{percent}% бюджета</span>
              <span>Бюджет {fmt(BUDGET)} ₽</span>
            </div>
          </div>
        </div>

        {/* Big actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setTab('list')}
            className="col-span-2 h-16 rounded-3xl bg-gradient-to-r from-primary to-emerald-600 text-base font-bold shadow-lg shadow-emerald-600/20"
          >
            <Icon name="ListChecks" size={24} className="mr-2" /> Мой список покупок
          </Button>
          <Button variant="secondary" className="h-20 flex-col gap-1.5 rounded-3xl text-sm font-semibold">
            <Icon name="Plus" size={26} className="text-primary" /> Добавить покупку
          </Button>
          <Button variant="secondary" className="h-20 flex-col gap-1.5 rounded-3xl text-sm font-semibold">
            <Icon name="ScanLine" size={26} className="text-primary" /> Сканировать чек
          </Button>
        </div>

        {/* Anti-impulse banner */}
        <div className="flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-4">
          <Icon name="TimerReset" size={22} className="mt-0.5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Анти-импульс включён</p>
            <p className="text-xs text-amber-700">Покупки вне списка будем откладывать на 10 минут — чтобы не тратить лишнее.</p>
          </div>
        </div>

        {/* Recent */}
        <div className="rounded-3xl bg-card p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-display font-bold">Последние покупки</p>
            <button onClick={() => setTab('stats')} className="text-sm font-medium text-primary">Все</button>
          </div>
          <div className="divide-y divide-border">
            {RECENT.map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary">
                  <Icon name={r.icon} size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.cat} · {r.date}</p>
                </div>
                <p className="font-display font-bold">−{fmt(r.amount)} ₽</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function ListView() {
    const total = list.filter((i) => i.done).reduce((s, i) => s + i.price * i.qty, 0);
    const catInfo = (c: string) => CATEGORIES.find((x) => x.name === c) ?? CATEGORIES[0];
    return (
      <div className="space-y-4">
        <div className="animate-scale-in rounded-3xl bg-gradient-to-br from-primary to-emerald-600 p-5 text-white shadow-lg">
          <p className="text-sm text-white/80">Список покупок</p>
          <p className="font-display text-2xl font-bold">{list.filter((i) => !i.done).length} осталось купить</p>
          <p className="mt-1 text-sm text-white/80">Отмечено на {fmt(total)} ₽</p>
        </div>

        <div className="space-y-2">
          {list.map((i) => {
            const ci = catInfo(i.cat);
            return (
              <div
                key={i.id}
                className={`flex items-center gap-3 rounded-2xl bg-card p-3 shadow-sm transition ${i.done ? 'opacity-50' : ''}`}
              >
                <Checkbox checked={i.done} onCheckedChange={() => toggle(i.id)} className="h-6 w-6 rounded-lg" />
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${ci.color}`}>
                  <Icon name={ci.icon} size={16} />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${i.done ? 'line-through' : ''}`}>{i.title}</p>
                  <p className="text-xs text-muted-foreground">{i.qty} шт · ~{fmt(i.price)} ₽</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={clearDone} className="h-12 rounded-2xl font-semibold">
            <Icon name="Trash2" size={18} className="mr-1.5" /> Очистить
          </Button>
          <Button className="h-12 rounded-2xl bg-gradient-to-r from-primary to-emerald-600 font-semibold">
            <Icon name="Plus" size={18} className="mr-1.5" /> Добавить товар
          </Button>
        </div>
        <Button variant="secondary" className="h-12 w-full rounded-2xl font-semibold">
          <Icon name="Share2" size={18} className="mr-1.5" /> Поделиться списком
        </Button>
      </div>
    );
  }

  function StatsView() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Средний чек', val: '1 940 ₽', icon: 'Receipt' },
            { label: 'Самая дорогая', val: '4 990 ₽', icon: 'TrendingUp' },
            { label: 'Покупок за месяц', val: '23', icon: 'ShoppingBag' },
            { label: 'Прогноз', val: '41 200 ₽', icon: 'Target' },
          ].map((s, i) => (
            <div key={i} className="animate-scale-in rounded-3xl bg-card p-4 shadow-sm">
              <Icon name={s.icon} size={20} className="text-primary" />
              <p className="mt-2 font-display text-xl font-extrabold">{s.val}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Donut */}
        <div className="rounded-3xl bg-card p-5 shadow-sm">
          <p className="mb-4 font-display font-bold">Траты по категориям</p>
          <div className="flex items-center gap-5">
            <div
              className="relative h-32 w-32 shrink-0 rounded-full"
              style={{ background: `conic-gradient(${gradient})` }}
            >
              <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-card">
                <span className="font-display text-lg font-extrabold">{fmt(SPENT)}</span>
                <span className="text-[10px] text-muted-foreground">₽ всего</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {SPENDING.map((s) => (
                <div key={s.cat} className="flex items-center gap-2 text-sm">
                  <span className="h-3 w-3 rounded-full" style={{ background: s.color }} />
                  <span className="flex-1">{s.cat}</span>
                  <span className="font-semibold">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="rounded-3xl bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display font-bold">Расходы по неделям</p>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">−12% к маю</span>
          </div>
          <div className="flex h-36 items-end justify-between gap-3">
            {[
              { w: 'Нед 1', v: 65 },
              { w: 'Нед 2', v: 90 },
              { w: 'Нед 3', v: 48 },
              { w: 'Нед 4', v: 72 },
            ].map((b) => (
              <div key={b.w} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-primary to-emerald-400 transition-all"
                  style={{ height: `${b.v}%` }}
                />
                <span className="text-xs text-muted-foreground">{b.w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Index;
