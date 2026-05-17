/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  BookOpen, 
  Keyboard, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  RefreshCcw,
  Hammer,
  HardHat,
  ChevronRight,
  Flame,
  Award,
  Truck,
  Construction,
  Cone,
  Drill,
  Wrench
} from 'lucide-react';
import { FIELD_TERMS, QUIZ_QUESTIONS, Term, QuizQuestion } from './constants.ts';

type AppState = 'HOME' | 'TYPING' | 'QUIZ' | 'RESULT';

export default function App() {
  const [view, setView] = useState<AppState>('HOME');
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);

  useEffect(() => {
    const savedXp = localStorage.getItem('site-mastery-xp');
    if (savedXp) {
      const currentXp = parseInt(savedXp);
      setXp(currentXp);
      setLevel(Math.floor(currentXp / 500) + 1);
    }
  }, []);

  const addXp = (amount: number) => {
    const newXp = xp + amount;
    setXp(newXp);
    localStorage.setItem('site-mastery-xp', newXp.toString());
    const newLevel = Math.floor(newXp / 500) + 1;
    if (newLevel > level) {
      // Level up!
      setLevel(newLevel);
    }
  };

  const handleStartTyping = () => {
    setView('TYPING');
  };

  const handleStartQuiz = () => {
    setView('QUIZ');
  };

  const handleBackToHome = () => {
    setView('HOME');
  };

  const nextLevelXp = level * 500;
  const progress = ((xp % 500) / 500) * 100;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-yellow-400 bg-site-grid">
      {/* Header with Hazard Tape */}
      <div className="h-2 bg-warning-stripes w-full sticky top-0 z-[60]" />
      <header className="bg-white border-b-4 border-black sticky top-2 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={handleBackToHome}
            className="flex items-center gap-3 font-black text-2xl tracking-tighter text-black transition-transform hover:scale-105 active:scale-95"
          >
            <div className="bg-black p-1.5 rounded-sm shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
              <HardHat className="w-7 h-7 text-yellow-400" />
            </div>
            <span>現場のミカタ <span className="text-sm font-mono bg-yellow-400 px-1 ml-1">V1.0</span></span>
          </button>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <div className="text-[10px] font-black uppercase text-slate-400">Current LVL</div>
               <div className="font-black text-xl leading-none flex items-center gap-1">
                 <Truck className="w-4 h-4 text-slate-300" /> Lvl.{level}
               </div>
             </div>
             <div className="h-10 w-1 bg-slate-200 hidden sm:block" />
             <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
               <span className="hidden lg:inline-block border-l-2 border-slate-200 pl-4 py-1">BUILDING THE FUTURE</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 right-0 opacity-[0.03] pointer-events-none -z-10 overflow-hidden">
          <Hammer className="w-96 h-96 rotate-12" />
        </div>
        <div className="absolute bottom-40 left-0 opacity-[0.02] pointer-events-none -z-10 overflow-hidden">
          <Construction className="w-80 h-80 -rotate-12" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-[0.015] pointer-events-none -z-10 overflow-hidden">
          <Truck className="w-64 h-64 rotate-45" />
        </div>

        <AnimatePresence mode="wait">
          {view === 'HOME' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12 py-8"
            >
              <section className="text-left space-y-6 border-l-8 border-yellow-400 pl-6 py-4">
                <div className="inline-block bg-black text-white px-3 py-1 font-mono text-sm mb-2 rounded-tr-xl">
                  GOAL: SITE MASTERY
                </div>
                <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-black uppercase leading-[0.9]">
                   現場を<br />駆け上がれ。
                </h1>
                <p className="text-xl text-slate-600 max-w-xl font-medium leading-relaxed">
                  君の技術が日本の明日を作る。現場特有の「お作法」と「専門用語」を武器に変えて、プロの階段を登ろう。
                </p>
              </section>

              {/* Status Board */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white divide-y-4 sm:divide-y-0 sm:divide-x-4 divide-black">
                <div className="p-6 relative overflow-hidden">
                  <div className="absolute -right-2 -bottom-2 opacity-10">
                    <HardHat className="w-16 h-16" />
                  </div>
                  <div className="text-xs font-black uppercase text-slate-400 mb-1">Worker Status</div>
                  <div className="text-3xl font-black tracking-tighter">
                    {level < 3 ? '見習い' : level < 7 ? '技術員' : '現場監督'}
                  </div>
                </div>
                <div className="p-6 col-span-2 bg-slate-50 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-10">
                      <Wrench className="w-6 h-6 rotate-45" />
                   </div>
                   <div className="flex justify-between items-end mb-2">
                     <div className="text-xs font-black uppercase text-slate-400">Experience Points (XP)</div>
                     <div className="text-sm font-black font-mono">{xp % 500} / 500 to Next Level</div>
                   </div>
                   <div className="h-6 bg-white border-2 border-black relative">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${progress}%` }}
                       className="h-full bg-yellow-400 border-r-2 border-black shadow-[2px_0px_0px_0px_rgba(0,0,0,0.1)]"
                     />
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MenuCard 
                  title="用語タイピング" 
                  description="現場の「共通言語」を体に叩き込む。ミスなしで素早く打ち込め！"
                  icon={<Keyboard className="w-10 h-10" />}
                  onClick={handleStartTyping}
                  color="bg-black"
                  badge="OPERATION: TYPE"
                />
                <MenuCard 
                  title="現場知識クイズ" 
                  description="1級土木施工管理技士への第一歩。現場の『なぜ？』を解き明かす。"
                  icon={<BookOpen className="w-10 h-10" />}
                  onClick={handleStartQuiz}
                  color="bg-yellow-400 text-black"
                  badge="OPERATION: QUIZ"
                />
              </div>

              {/* Relaxation Space / Motivation Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-2 bg-black" />
                  <h3 className="font-black text-xl uppercase tracking-tighter">現場休憩所 🍵</h3>
                </div>
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 opacity-10 p-4">
                     <Construction className="w-24 h-24" />
                  </div>
                  <div className="absolute bottom-0 left-0 opacity-5 p-2">
                     <Truck className="w-16 h-16" />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <p className="text-xl font-bold italic leading-relaxed text-slate-800">
                      「地図に残る仕事をしているんだ。」<br />
                      その誇りを胸に。
                    </p>
                    <div className="space-y-4 text-slate-600 font-medium">
                      <MotivationMessage />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="bg-white border-2 border-black p-6 rounded-none relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rotate-12 shadow-sm uppercase">
                  Important Notice
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
                    <Cone className="w-4 h-4 text-yellow-500 absolute -bottom-1 -right-1" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg uppercase tracking-tight">後輩応援モード起動中</h4>
                    <p className="text-slate-500 text-sm">毎日トレーニングして、経験値を貯めよう。君の成長が現場を熱くする！</p>
                  </div>
                </div>
              </div>

              <footer className="pt-20 text-center">
                <div className="h-1 bg-slate-200 w-full mb-6" />
                <p className="text-slate-400 font-mono text-xs tracking-widest uppercase">
                  Safety First / Knowledge First / Success First
                </p>
              </footer>
            </motion.div>
          )}

          {view === 'TYPING' && (
            <TypingModule key="typing" onBack={handleBackToHome} addXp={addXp} />
          )}

          {view === 'QUIZ' && (
            <QuizModule key="quiz" onBack={handleBackToHome} addXp={addXp} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function MotivationMessage() {
  const messages = [
    {
      title: "現場監督の醍醐味",
      content: "何もない更地に巨大な構造物が立ち上がっていく。完成した瞬間、通り過ぎる人々がそれを利用し始める。その日常を支えているのは、間違いなく君の努力です。"
    },
    {
      title: "新人の君へ",
      content: "今は分からない専門用語ばかりで戸惑うかもしれない。でも、毎日泥にまみれて図面を追いかけるその時間は、一生の財産になる。焦らず、一歩ずつ技術を盗もう。"
    },
    {
      title: "地図を書き換える誇り",
      content: "私たちが作るのは、単なるモノじゃない。何十年もそこに残り続け、人々の生活のインフラとなるもの。君の仕事は、未来の地図を書き換えているんだ。"
    },
    {
      title: "「安全第一」の本質",
      content: "安全は誰かのために守るもの。自分、仲間、そして待っている家族。無事に家に帰るまでが仕事。安全を守れる監督こそが、真のプロフェッショナルです。"
    },
    {
      title: "1%の積み重ね",
      content: "昨日の自分より、一つだけ新しい用語を覚えた。一つだけ図面が読めるようになった。その1%の成長が、1年後には誰も追いつけない大きな差になる。"
    },
    {
      title: "職人さんとの絆",
      content: "最初は厳しいことを言われるかもしれない。でも、一生懸命に向き合えば、彼らは最高の味方になってくれる。現場は、人と人の信頼でできているんだ。"
    },
    {
      title: "失敗は「データ」だ",
      content: "ミスをして落ち込むこともあるだろう。でも、それは君が挑戦している証拠だ。失敗を次に活かせば、それはただのミスではなく、価値ある「経験データ」に変わる。"
    },
    {
      title: "君の代わりはいない",
      content: "どんなにAIが進歩しても、土埃の舞う現場で状況を判断し、人の心を動かすのは人間にしかできない。君はこの現場にとって、唯一無二の存在なんだ。"
    },
    {
      title: "未来の風景",
      content: "数年後、自分が関わった橋や道路を車で通るとき、隣にいる誰かに「これ、俺が（私が）作ったんだ」と胸を張って言える日が必ず来る。その日は、最高の気分だぞ。"
    }
  ];

  const [index, setIndex] = useState(() => Math.floor(Math.random() * messages.length));

  const nextMessage = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * messages.length);
    } while (newIndex === index && messages.length > 1);
    setIndex(newIndex);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="border-l-4 border-yellow-400 pl-4"
        >
          <h4 className="font-black text-black uppercase text-sm mb-1">{messages[index].title}</h4>
          <p className="text-slate-600 leading-relaxed text-sm">
            {messages[index].content}
          </p>
        </motion.div>
      </AnimatePresence>
      <button 
        onClick={nextMessage}
        className="text-[10px] font-black uppercase text-slate-400 hover:text-black flex items-center gap-1 transition-colors"
      >
        <RefreshCcw className="w-3 h-3" /> 次のメッセージを引く
      </button>
    </div>
  );
}

function MenuCard({ title, description, icon, onClick, color, badge }: { 
  title: string, description: string, icon: React.ReactNode, onClick: () => void, color: string, badge: string 
}) {
  return (
    <motion.button
      whileHover={{ translateZ: 20, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group relative flex flex-col items-start text-left p-8 bg-white border-4 border-black hover:bg-slate-50 transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(251,191,36,1)] overflow-hidden"
    >
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
        {title.includes('タイピング') ? <Keyboard className="w-32 h-32" /> : <Construction className="w-32 h-32" />}
      </div>
      <div className={`p-4 rounded-none ${color} border-2 border-black mb-8 group-hover:rotate-12 transition-transform`}>
        {icon}
      </div>
      <div className="absolute top-8 right-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-100 px-2 py-1">
        {badge}
      </div>
      <h3 className="text-3xl font-black text-black mb-3 uppercase tracking-tighter">{title}</h3>
      <p className="text-slate-600 font-medium leading-relaxed mb-8 border-l-2 border-slate-100 pl-4">
        {description}
      </p>
      <div className="mt-auto flex items-center text-sm font-black text-black uppercase border-b-2 border-yellow-400 group-hover:border-black transition-colors">
        MISSION START <ChevronRight className="w-5 h-5 ml-1" />
      </div>
    </motion.button>
  );
}

function TypingModule({ onBack, addXp }: { onBack: () => void, addXp: (amount: number) => void }) {
  const [phase, setPhase] = useState<'SETUP' | 'PLAYING'>('SETUP');
  const [difficulty, setDifficulty] = useState<'NORMAL' | 'HARD' | 'MASTER'>('NORMAL');
  const [timeLimit, setTimeLimit] = useState<number | null>(null);

  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [completed, setCompleted] = useState(false);
  const [missed, setMissed] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter terms based on difficulty
  const termsCount = difficulty === 'NORMAL' ? 10 : 20;
  const gameTerms = useRef<Term[]>([]);

  const startSession = () => {
    // Shuffle and pick terms
    const shuffled = [...FIELD_TERMS].sort(() => 0.5 - Math.random());
    gameTerms.current = shuffled.slice(0, termsCount);
    setPhase('PLAYING');
    if (timeLimit) setTimer(timeLimit);
    else setTimer(0);
  };

  const term = gameTerms.current[index];

  useEffect(() => {
    if (completed) {
      const bonus = difficulty === 'MASTER' ? 200 : difficulty === 'HARD' ? 150 : 100;
      addXp(gameTerms.current.length * 10 + bonus);
    }
  }, [completed]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && !completed && !isTimeUp) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (timeLimit) {
            if (prev <= 1) {
              setIsTimeUp(true);
              return 0;
            }
            return prev - 1;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, completed, isTimeUp, timeLimit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isActive) setIsActive(true);
    if (isTimeUp || completed) return;

    const val = e.target.value.toLowerCase();
    
    // Check if the input is a valid prefix for ANY of the romaji variations
    const isValidPrefix = term.romaji.some(variant => variant.startsWith(val));
    
    if (isValidPrefix) {
      setUserInput(val);
      setMissed(false);
      
      // Check if the input fully matches ANY of the romaji variations
      const isFullMatch = term.romaji.some(variant => variant === val);
      
      if (isFullMatch) {
        if (index < gameTerms.current.length - 1) {
          setTimeout(() => {
            setIndex(index + 1);
            setUserInput('');
          }, 200);
        } else {
          setCompleted(true);
          setIsActive(false);
        }
      }
    } else {
      setMissed(true);
    }
  };

  const restart = () => {
    setPhase('SETUP');
    setIndex(0);
    setUserInput('');
    setCompleted(false);
    setIsActive(false);
    setIsTimeUp(false);
    setTimer(0);
  };

  if (phase === 'SETUP') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <button onClick={onBack} className="flex items-center gap-2 font-black uppercase text-sm bg-black text-white px-4 py-2 hover:bg-yellow-400 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" /> CANCEL
          </button>
          <div className="font-black text-lg uppercase tracking-widest">Training Configuration</div>
        </div>

        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-10">
          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" /> DIFFICULTY LEVEL
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(['NORMAL', 'HARD', 'MASTER'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`
                    p-4 border-4 font-black transition-all
                    ${difficulty === d ? 'border-black bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}
                  `}
                >
                  {d}
                  <div className="text-[10px] font-medium">
                    {d === 'NORMAL' ? '10 Terms / Hints ON' : d === 'HARD' ? '20 Terms / Hints ON' : '20 Terms / NO Hints'}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-blue-500" /> TIME LIMIT
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {([null, 30, 60, 120] as const).map((t) => (
                <button
                  key={t === null ? 'none' : t}
                  onClick={() => setTimeLimit(t)}
                  className={`
                    p-4 border-4 font-black transition-all
                    ${timeLimit === t ? 'border-black bg-black text-white shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}
                  `}
                >
                  {t === null ? 'INFINITE' : `${t}s`}
                </button>
              ))}
            </div>
          </section>

          <button 
            onClick={startSession}
            className="w-full bg-yellow-400 border-4 border-black p-6 font-black text-2xl uppercase tracking-tighter hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            ENGAGE START
          </button>
        </div>
      </motion.div>
    );
  }

  // Display guide (prefer current input prefix if it matches multiple)
  const displayGuide = term.romaji.find(r => r.startsWith(userInput)) || term.romaji[0];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between border-b-2 border-black pb-4">
        <button onClick={restart} className="flex items-center gap-2 font-black uppercase text-xs bg-black text-white px-3 py-2 hover:bg-yellow-400 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" /> QUIT SESSION
        </button>
        <div className="flex items-center gap-6 font-mono font-black text-lg">
          <div className="text-slate-400">PROGRESS: <span className="text-black">{index + 1}/{gameTerms.current.length}</span></div>
          <div className={`${timeLimit && timer < 10 ? 'bg-red-600 text-white animate-pulse' : 'bg-yellow-400 text-black'} px-4 py-1 shadow-sm`}>
            {timeLimit ? `REMAINING: ${timer}s` : `TIME: ${timer}s`}
          </div>
        </div>
      </div>

      <div className="bg-white border-4 border-black p-6 sm:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden min-h-[400px] flex items-center justify-center">
        <div className="absolute bottom-0 left-0 h-4 bg-warning-stripes w-full opacity-20" />
        
        {completed || isTimeUp ? (
          <div className="text-center py-8 space-y-8 relative z-10">
            <motion.div 
              initial={{ scale: 0, rotate: -45 }} 
              animate={{ scale: 1, rotate: 0 }}
              className={`inline-block p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${completed ? 'bg-yellow-400' : 'bg-red-600 text-white'}`}
            >
              {completed ? <Trophy className="w-20 h-20 text-black" /> : <AlertCircle className="w-20 h-20 text-white" />}
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-5xl font-black uppercase tracking-tighter">
                {completed ? 'Mission Accomplished' : 'System Overload'}
              </h2>
              <p className="text-xl font-medium text-slate-600 bg-slate-100 p-2 border-x-4 border-slate-300">
                {completed 
                  ? `記録: ${timeLimit ? timeLimit - timer : timer}秒 / ${gameTerms.current.length}単語 完遂。`
                  : `時間切れ！ ${index}単語で終了。次はもっと速く！`}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button onClick={restart} className="bg-black text-white px-10 py-5 font-black text-xl flex items-center justify-center gap-3 hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
                <RefreshCcw className="w-6 h-6" /> NEW SESSION
              </button>
              <button onClick={onBack} className="bg-white border-4 border-black px-10 py-5 font-black text-xl hover:bg-slate-50 transition-colors">
                RETURN TO HQ
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-16 relative z-10">
            <div className="text-center space-y-6">
              <div className="text-6xl sm:text-8xl font-black text-black tracking-tighter uppercase break-all">
                {term.word}
              </div>
              <div className="inline-block bg-slate-100 px-6 py-2 border-2 border-slate-200 text-2xl text-slate-500 font-mono lowercase tracking-widest">
                {term.reading}
              </div>
            </div>

            <div className="relative max-w-2xl mx-auto">
              <div className="flex justify-center flex-wrap gap-x-2 gap-y-4 font-mono text-5xl font-black h-24 content-center">
                {difficulty === 'MASTER' ? (
                  <div className="text-slate-300 uppercase opacity-30 select-none">????????</div>
                ) : (
                  displayGuide.split('').map((char, i) => (
                    <span 
                      key={i} 
                      className={`
                        ${i < userInput.length ? 'text-black border-b-6 border-yellow-400' : 'text-slate-200 border-b-6 border-slate-100'}
                        transition-all duration-75 uppercase
                      `}
                    >
                      {char}
                    </span>
                  ))
                )}
              </div>
              
              <input 
                autoFocus
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                className="absolute inset-0 opacity-0 cursor-default"
                onBlur={() => inputRef.current?.focus()}
              />
              
              <div className={`mt-8 text-center font-black uppercase tracking-widest text-lg transition-all ${missed ? 'text-red-600 scale-110 animate-shake' : 'text-slate-400'}`}>
                {missed ? 'ERROR: STRIKE MISMATCH' : 'INPUT DETECTED: READY'}
              </div>
            </div>

            <div className="bg-yellow-50 border-4 border-yellow-400 p-8 flex items-start gap-6 border-dashed">
              <div className="bg-yellow-400 p-3 shadow-sm border-2 border-black">
                <AlertCircle className="w-8 h-8 text-black" />
              </div>
              <div>
                <h4 className="font-black text-xl uppercase mb-2">Technical Briefing</h4>
                <p className="text-slate-700 text-lg font-medium leading-relaxed underline decoration-yellow-400 decoration-2">{term.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function QuizModule({ onBack, addXp }: { onBack: () => void, addXp: (amount: number) => void }) {
  const [index, setIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const question = QUIZ_QUESTIONS[index];
  const selectedOption = userAnswers[index];
  const isAnswered = selectedOption !== null;

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    const newAnswers = [...userAnswers];
    newAnswers[index] = idx;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (index < QUIZ_QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      const correctCount = userAnswers.reduce((acc, ans, i) => 
        ans === QUIZ_QUESTIONS[i].answerIndex ? acc! + 1 : acc!, 0
      ) || 0;
      addXp(correctCount * 50 + 100);
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const restart = () => {
    setIndex(0);
    setUserAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
    setShowResult(false);
  };

  const correctCount = userAnswers.reduce((acc, ans, i) => 
    ans === QUIZ_QUESTIONS[i].answerIndex ? acc! + 1 : acc!, 0
  ) || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between border-b-2 border-black pb-4">
        <div className="flex gap-2">
          <button onClick={onBack} className="flex items-center gap-2 font-black uppercase text-xs bg-black text-white px-3 py-2 hover:bg-red-600 transition-colors">
            <ArrowLeft className="w-3 h-3" /> ABORT
          </button>
          {!showResult && index > 0 && (
            <button onClick={prevQuestion} className="flex items-center gap-2 font-black uppercase text-xs bg-slate-200 text-black px-3 py-2 hover:bg-slate-300 transition-colors border-2 border-black">
              BACK
            </button>
          )}
        </div>
        {!showResult && (
          <div className="text-xl font-black font-mono">
            QUESTION: <span className="bg-black text-white px-2">{index + 1}</span> / {QUIZ_QUESTIONS.length}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center space-y-10"
          >
            <div className="relative inline-block">
              <div className="bg-yellow-400 p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
                <Award className="w-24 h-24 text-black mx-auto" />
              </div>
              <div className="absolute -top-4 -left-4 opacity-20">
                <Drill className="w-12 h-12 rotate-[30deg]" />
              </div>
              <div className="absolute inset-0 border-4 border-dashed border-black rounded-none -m-4 -z-10" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl font-black uppercase tracking-tighter">Debriefing Complete</h2>
              <div className="text-7xl font-black text-black">
                {correctCount} <span className="text-3xl text-slate-400">/ {QUIZ_QUESTIONS.length} CORRECT</span>
              </div>
              <div className="h-4 bg-slate-100 border-2 border-black overflow-hidden max-w-sm mx-auto">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(correctCount / QUIZ_QUESTIONS.length) * 100}%` }}
                  className="h-full bg-yellow-400"
                />
              </div>
            </div>

            <p className="text-xl font-bold text-slate-600 max-w-md mx-auto italic">
              {correctCount === QUIZ_QUESTIONS.length 
                ? "「パーフェクトだ。明日からの現場は君が主役だぞ。」" 
                : "「現場は学びの宝庫だ。分からないことは恥じゃない、聞かないことが罪だぞ。」"}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <button onClick={restart} className="bg-black text-white px-10 py-5 font-black text-xl flex items-center justify-center gap-3 hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
                <RefreshCcw className="w-6 h-6" /> RETRY MISSION
              </button>
              <button onClick={onBack} className="bg-white border-4 border-black px-10 py-5 font-black text-xl hover:bg-slate-50 transition-colors">
                RETURN TO HQ
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="space-y-8"
          >
            <div className="bg-white border-4 border-black p-8 sm:p-14 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-warning-stripes opacity-10 -rotate-45 translate-x-16 -translate-y-16" />
              
              <div className="inline-block px-4 py-1 bg-black text-white text-xs font-black uppercase tracking-[0.2em] mb-8">
                SECTOR: {question.category}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-black leading-none mb-12 tracking-tight group">
                {question.question}
                <div className="h-2 w-24 bg-yellow-400 mt-4 group-hover:w-full transition-all" />
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {question.options.map((option, idx) => {
                  const isCorrect = idx === question.answerIndex;
                  const isSelected = idx === selectedOption;
                  
                  let stateClass = "border-black bg-white hover:bg-yellow-50 hover:translate-x-2";
                  if (isAnswered) {
                    if (isCorrect) stateClass = "border-black bg-yellow-400 text-black translate-x-4";
                    else if (isSelected) stateClass = "border-black bg-red-100 text-red-900 line-through opacity-60";
                    else stateClass = "border-slate-100 text-slate-300 pointer-events-none opacity-30";
                  }

                  return (
                    <button 
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleOptionClick(idx)}
                      className={`
                        w-full p-6 sm:p-8 border-4 text-left font-black text-xl uppercase tracking-tight transition-all duration-200 flex items-center justify-between
                        ${stateClass}
                      `}
                    >
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-2xl opacity-20">0{idx + 1}</span>
                        {option}
                      </span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-8 h-8 text-black" />}
                      {isAnswered && isSelected && !isCorrect && <AlertCircle className="w-8 h-8 text-red-600" />}
                    </button>
                   );
                })}
              </div>
            </div>

            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black text-white p-8 sm:p-12 shadow-[12px_12px_0px_0px_rgba(251,191,36,1)]"
              >
                <div className="flex flex-col sm:flex-row items-start gap-8">
                  <div className={`p-4 border-2 border-white shrink-0 ${selectedOption === question.answerIndex ? 'bg-yellow-400' : 'bg-red-600'}`}>
                    {selectedOption === question.answerIndex ? <CheckCircle2 className="w-10 h-10 text-black" /> : <AlertCircle className="w-10 h-10 text-white" />}
                  </div>
                  <div className="space-y-6 flex-1">
                    <div>
                      <h3 className="font-black text-3xl uppercase tracking-tighter mb-4 border-b-2 border-white/20 pb-2">
                        {selectedOption === question.answerIndex ? 'AUTHENTICATED' : 'DATA CORRUPTED'} 
                      </h3>
                      <p className="text-slate-300 text-xl font-bold leading-relaxed selection:bg-white selection:text-black">
                        {question.explanation}
                      </p>
                    </div>
                    <button 
                      onClick={nextQuestion}
                      className="w-full sm:w-auto bg-yellow-400 text-black px-12 py-5 font-black text-xl flex items-center justify-center gap-3 hover:bg-white transition-colors uppercase italic tracking-tighter"
                    >
                      {index < QUIZ_QUESTIONS.length - 1 ? 'PROCEED TO NEXT' : 'VIEW FINAL REPORT'} <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
