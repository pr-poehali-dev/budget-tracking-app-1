import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PRESETS = [20000, 35000, 50000, 75000, 100000];

interface Props {
  userName: string;
  onFinish: (budget: number) => void;
}

const BudgetSurvey = ({ userName, onFinish }: Props) => {
  const [value, setValue] = useState(50000);
  const [custom, setCustom] = useState('');

  const fmt = (n: number) => n.toLocaleString('ru-RU');
  const final = custom ? parseInt(custom.replace(/\D/g, ''), 10) || 0 : value;

  return (
    <div className="flex min-h-screen flex-col bg-background px-6 py-10 font-sans text-foreground">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-white">
          <Icon name="Wallet" size={20} />
        </div>
        <span className="font-display text-lg font-extrabold">Настройка бюджета</span>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="animate-fade-in">
          <span className="text-5xl">💰</span>
          <h1 className="mt-4 font-display text-2xl font-extrabold">
            {userName}, какой у вас бюджет на месяц?
          </h1>
          <p className="mt-2 text-muted-foreground">
            Мы будем отслеживать траты и подсказывать, когда стоит притормозить.
          </p>
        </div>

        <div className="my-7 rounded-3xl bg-gradient-to-br from-primary to-emerald-600 p-6 text-center text-white shadow-lg">
          <p className="text-sm text-white/80">Ваш месячный бюджет</p>
          <p className="font-display text-4xl font-extrabold">{fmt(final)} ₽</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setValue(p);
                setCustom('');
              }}
              className={`rounded-2xl border-2 py-3 text-sm font-semibold transition ${
                !custom && value === p
                  ? 'border-primary bg-accent text-primary'
                  : 'border-border bg-card text-foreground'
              }`}
            >
              {fmt(p)}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <Input
            inputMode="numeric"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Своя сумма, ₽"
            className="h-12 rounded-2xl text-center font-semibold"
          />
        </div>
      </div>

      <Button
        onClick={() => onFinish(final > 0 ? final : 50000)}
        className="h-14 rounded-2xl bg-gradient-to-r from-primary to-emerald-600 text-base font-bold"
      >
        Перейти в приложение
        <Icon name="ArrowRight" size={20} className="ml-1.5" />
      </Button>
    </div>
  );
};

export default BudgetSurvey;
