import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  onAuth: (name: string) => void;
}

const AuthScreen = ({ onAuth }: Props) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(name.trim() || 'друг');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-emerald-500 to-emerald-600 px-6 pb-12 pt-12 text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 backdrop-blur">
            <Icon name="PiggyBank" size={32} />
          </div>
          <h1 className="font-display text-2xl font-extrabold">
            {mode === 'register' ? 'Создать аккаунт' : 'С возвращением!'}
          </h1>
          <p className="mt-1 text-sm text-white/85">Контролируйте покупки и копите деньги</p>
        </div>
      </div>

      <div className="mx-auto -mt-6 w-full max-w-md flex-1 rounded-t-[2rem] bg-background px-6 pt-7">
        <div className="mb-6 flex rounded-2xl bg-secondary p-1">
          {(['register', 'login'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
                mode === m ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground'
              }`}
            >
              {m === 'register' ? 'Регистрация' : 'Вход'}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как вас зовут?"
                className="h-12 rounded-2xl"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@mail.ru"
              className="h-12 rounded-2xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 rounded-2xl"
            />
          </div>

          <Button
            type="submit"
            className="h-13 w-full rounded-2xl bg-gradient-to-r from-primary to-emerald-600 py-3.5 text-base font-bold"
          >
            {mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> или <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          variant="outline"
          onClick={() => onAuth(name.trim() || 'друг')}
          className="h-12 w-full gap-2 rounded-2xl font-semibold"
        >
          <Icon name="Chrome" size={20} className="text-primary" /> Продолжить с Google
        </Button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Продолжая, вы соглашаетесь с условиями использования
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
