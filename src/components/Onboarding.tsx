import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const SLIDES = [
  {
    icon: 'ListChecks',
    emoji: '📝',
    title: 'Список покупок',
    text: 'Составьте список перед выходом из дома — и покупайте только нужное. Никаких импульсивных трат.',
  },
  {
    icon: 'ScanLine',
    emoji: '🤖',
    title: 'Сканируйте чеки',
    text: 'Сфотографируйте чек — приложение само распознает сумму, дату и магазин. Покупка сохранится автоматически.',
  },
  {
    icon: 'ChartPie',
    emoji: '📊',
    title: 'Контроль бюджета',
    text: 'Видите, сколько потратили и сколько осталось. Графики, категории и прогноз помогут экономить.',
  },
];

interface Props {
  onFinish: () => void;
}

const Onboarding = ({ onFinish }: Props) => {
  const [step, setStep] = useState(0);
  const last = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary via-emerald-500 to-emerald-600 px-6 py-10 font-sans text-white">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Icon name="PiggyBank" size={20} />
          </div>
          <span className="font-display text-lg font-extrabold">Копилка</span>
        </div>
        {!last && (
          <button onClick={onFinish} className="text-sm font-medium text-white/80">
            Пропустить
          </button>
        )}
      </div>

      <div key={step} className="flex flex-1 animate-scale-in flex-col items-center justify-center text-center">
        <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-white/15 backdrop-blur">
          <span className="text-7xl">{slide.emoji}</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold">{slide.title}</h1>
        <p className="mt-3 max-w-xs text-base text-white/85">{slide.text}</p>
      </div>

      <div className="mb-8 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all ${i === step ? 'w-7 bg-white' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>

      <Button
        onClick={() => (last ? onFinish() : setStep((s) => s + 1))}
        className="h-14 rounded-2xl bg-white text-base font-bold text-primary hover:bg-white/90"
      >
        {last ? 'Начать' : 'Далее'}
        <Icon name="ArrowRight" size={20} className="ml-1.5" />
      </Button>
    </div>
  );
};

export default Onboarding;
