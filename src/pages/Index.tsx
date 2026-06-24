import { useState } from 'react';
import Onboarding from '@/components/Onboarding';
import AuthScreen from '@/components/AuthScreen';
import BudgetSurvey from '@/components/BudgetSurvey';
import MainApp from '@/components/MainApp';

type Stage = 'onboarding' | 'auth' | 'budget' | 'app';

const Index = () => {
  const [stage, setStage] = useState<Stage>('onboarding');
  const [userName, setUserName] = useState('друг');
  const [budget, setBudget] = useState(50000);

  if (stage === 'onboarding') {
    return <Onboarding onFinish={() => setStage('auth')} />;
  }

  if (stage === 'auth') {
    return (
      <AuthScreen
        onAuth={(name) => {
          setUserName(name);
          setStage('budget');
        }}
      />
    );
  }

  if (stage === 'budget') {
    return (
      <BudgetSurvey
        userName={userName}
        onFinish={(b) => {
          setBudget(b);
          setStage('app');
        }}
      />
    );
  }

  return <MainApp userName={userName} budget={budget} />;
};

export default Index;
