
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  const isMobile = window.innerWidth < 768;
  if (isMobile) return <>{children}</>;

  return (
    <div
      className="flex min-h-screen items-center justify-center font-sans"
      style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />
      </div>

      {/* Left label */}
      <div className="relative z-10 mr-10 hidden max-w-xs xl:block">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
            <span className="text-xl">🐷</span>
          </div>
          <span className="font-display text-xl font-extrabold text-white">Копилка</span>
        </div>
        <p className="font-display text-3xl font-extrabold leading-snug text-white">
          Контроль бюджета в кармане
        </p>
        <p className="mt-3 text-sm text-white/70">
          Ведите список покупок, сканируйте чеки и экономьте деньги каждый месяц.
        </p>
        <div className="mt-6 space-y-3">
          {['Список покупок перед выходом из дома', 'Сканирование чеков через камеру', 'Графики расходов и прогноз бюджета'].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-white/80">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Phone frame */}
      <div className="relative z-10 flex-shrink-0">
        {/* Outer shell */}
        <div
          className="relative rounded-[3rem] p-[3px]"
          style={{
            background: 'linear-gradient(145deg, #6ee7b7, #064e3b)',
            boxShadow: '0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          {/* Phone body */}
          <div
            className="relative overflow-hidden rounded-[2.8rem] bg-[#0a0a0a]"
            style={{ width: '390px', height: '780px' }}
          >
            {/* Dynamic island */}
            <div className="absolute left-1/2 top-3 z-50 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />

            {/* Screen content */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </div>
        </div>

        {/* Side button */}
        <div className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r-sm bg-gradient-to-b from-[#6ee7b7] to-[#064e3b]" />
        <div className="absolute -left-[3px] top-20 h-10 w-[3px] rounded-l-sm bg-gradient-to-b from-[#6ee7b7] to-[#064e3b]" />
        <div className="absolute -left-[3px] top-36 h-10 w-[3px] rounded-l-sm bg-gradient-to-b from-[#6ee7b7] to-[#064e3b]" />
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhoneFrame><Index /></PhoneFrame>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;