import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tv, 
  Play, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trophy, 
  Coffee, 
  Heart,
  Sparkles
} from 'lucide-react';

// --- Data ---
const DIALOGUE = [
  { 
    speaker: 'María', 
    text: '¡Es aquí! La casa está justo enfrente del banco. ¡Ay, Dios mío! ¿Cómo me veo? ¿Estoy bien?', 
    armenian: 'Այստեղ է: Տունը հենց բանկի դիմացն է: Աստվա՜ծ իմ: Ինչպե՞ս եմ երևում: Լա՞վ եմ:',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Ignacio', 
    text: 'Estás divina, María. ¡Toca el timbre ya!', 
    armenian: 'Հիասքանչ ես, Մարիա՛: Զանգը տո՛ւր արդեն:',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Pablo', 
    text: '¿Usted es Francisco Javier?', 
    armenian: 'Դո՞ւք եք Ֆրանսիսկո Խավիերը:',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Francisco', 
    text: 'Sí, soy yo. Pero ahora soy el gerente de esta oficina. ¿Tienen una cita?', 
    armenian: 'Այո, ես եմ: Բայց հիմա ես այս գրասենյակի մենեջերն եմ: Դուք ժամադրություն ունե՞ք:',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'María', 
    text: '¿Francisco? ¿No me recuerdas? ¡Ereván! ¡El té armenio!', 
    armenian: 'Ֆրանսիսկո՞: Ինձ չե՞ս հիշում: Երևա՜ն: Հայկական թեյը՜:',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Francisco', 
    text: '¡¡María!! ¡¡La turista más divertida de Armenia!! ¡¡Che, boluda!! ¡Pasen, pasen!', 
    armenian: 'Մարիա՜: Հայաստանի ամենազվարճալի զբոսաշրջիկը: Է՜յ, ընկերուհի՛, ներս եկեք, ներս եկեք:',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Ignacio', 
    text: 'Mirá, se puso una corbata y ya se cree el modelo de the oficina.', 
    armenian: 'Նայիր, փողկապ է կապել ու արդեն իրեն գրասենյակի մոդելն է կարծում:',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Francisco', 
    text: 'Chicos, no soy solo el gerente. También soy guía de Madrid. ¡Y tengo el mismo té! Pero...', 
    armenian: 'Տղանե՛ր, ես միայն մենեջերը չեմ: Ես նաև Մադրիդի գիդն եմ: Եվ ես ունեմ նույն թեյից: Բայց...',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=600'
  },
  { 
    speaker: 'Francisco', 
    text: 'María... yo hablo español, hablo armenio... pero hay algo que solo quiero decirte a ti...', 
    armenian: 'Մարիա... ես խոսում եմ իսպաներեն, խոսում եմ հայերեն... բայց կա մի բան, որ ուզում եմ ասել միայն քեզ...',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600&h=600'
  },
];

const QUIZ = [
  { question: "Ֆրանսիսկոն գրասենյակի ___ է:", options: ["gerente", "modelo", "turista"], correct: "gerente", translation: "Francisco es el gerente de la oficina." },
  { question: "Տունը բանկի ___ է:", options: ["lejos", "enfrente", "detrás"], correct: "enfrente", translation: "La casa está enfrente del banco." },
  { question: "Ֆրանսիսկոն նաև Մադրիդի ___ է:", options: ["guía", "estudiante", "dentista"], correct: "guía", translation: "Francisco también es guía de Madrid." },
  { question: "Իգնասիոն ասում է, որ Ֆրանսիսկոն իրեն ___ է կարծում:", options: ["gerente", "modelo", "agente"], correct: "modelo", translation: "Ignacio dice que Francisco se cree el modelo." },
  { question: "Ո՞ր ըմպելիքն են հիշատակում:", options: ["Café", "Té armenio", "Agua"], correct: "Té armenio", translation: "¿Qué bebida mencionan?" },
];

export default function ArmenianTeaSeries() {
  const [view, setView] = useState<'tv-intro' | 'scene' | 'quiz' | 'finish'>('tv-intro');
  const [step, setStep] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const nextStep = () => {
    if (step < DIALOGUE.length - 1) {
      setStep(step + 1);
    } else {
      setView('quiz');
    }
  };

  const handleQuiz = (option: string) => {
    if (feedback) return;
    if (option === QUIZ[quizStep].correct) {
      setFeedback('correct');
      setScore(score + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (quizStep < QUIZ.length - 1) {
        setQuizStep(quizStep + 1);
      } else {
        setView('finish');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-orange-50 text-orange-950 font-sans flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'tv-intro' && (
          <motion.div 
            key="tv-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video bg-white rounded-[3rem] border-[12px] border-orange-200 shadow-[0_0_100px_rgba(251,146,60,0.2)] flex flex-col items-center justify-center overflow-hidden group cursor-pointer"
            onClick={() => setView('scene')}
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uWUqnW9Fe/giphy.gif')] bg-cover grayscale" />
            
            <div className="z-10 text-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(234,88,12,0.5)]"
              >
                <Play className="w-12 h-12 text-white fill-white ml-1" />
              </motion.div>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-2 text-orange-900">
                Հայկական թեյի գաղտնիքը
              </h1>
              <p className="text-orange-600 font-black uppercase tracking-[0.3em] text-sm">
                Մադրիդյան խոստովանություն
              </p>
            </div>

            <div className="absolute bottom-8 flex items-center gap-2 text-orange-300 font-black text-xs uppercase tracking-widest">
              <Tv className="w-4 h-4" />
              <span>Սեղմեք դիտելու համար</span>
            </div>
          </motion.div>
        )}

        {view === 'scene' && (
          <motion.div 
            key="scene"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-5xl bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-orange-100 flex flex-col md:flex-row min-h-[600px]"
          >
            <div className="w-full md:w-1/2 relative overflow-hidden bg-orange-100">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={step}
                  src={DIALOGUE[step].image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-orange-600 text-white px-8 py-2 rounded-full font-black uppercase tracking-widest text-xl shadow-xl"
                >
                  {DIALOGUE[step].speaker}
                </motion.div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center relative">
              <div className="absolute top-12 right-12 text-orange-100 font-black text-4xl italic">
                {String(step + 1).padStart(2, '0')}
              </div>
              
              <div className="space-y-8">
                <motion.p 
                  key={`text-${step}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-black italic leading-tight text-orange-900"
                >
                  "{DIALOGUE[step].text}"
                </motion.p>
                
                <motion.div 
                  key={`arm-${step}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 bg-orange-50 rounded-3xl border border-orange-100"
                >
                  <p className="text-xl font-medium text-orange-800 leading-relaxed">
                    {DIALOGUE[step].armenian}
                  </p>
                </motion.div>
              </div>

              <div className="mt-12">
                <button 
                  onClick={nextStep}
                  className="group flex items-center gap-4 px-12 py-5 bg-orange-600 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl active:scale-95"
                >
                  {step === DIALOGUE.length - 1 ? 'Անցնել վարժությանը' : 'Հաջորդը'}
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl bg-white rounded-[4rem] p-16 shadow-2xl border border-orange-100 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-orange-400 uppercase tracking-[0.3em] text-sm">Վարժություն {quizStep + 1} / {QUIZ.length}</span>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-black italic mb-6 text-orange-900 leading-tight">
                {QUIZ[quizStep].question.split('___').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-orange-600 underline decoration-orange-200 decoration-8 underline-offset-8 mx-2">
                        {feedback === 'correct' ? QUIZ[quizStep].correct : '___'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-xl text-orange-400 font-medium italic">{QUIZ[quizStep].translation}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {QUIZ[quizStep].options.map((option) => (
                <button 
                  key={option}
                  onClick={() => handleQuiz(option)}
                  disabled={!!feedback}
                  className={`py-6 rounded-[2rem] font-black text-2xl transition-all border-b-8 active:border-b-0 active:translate-y-2 ${feedback === 'correct' && option === QUIZ[quizStep].correct ? 'bg-emerald-500 border-emerald-700 text-white' : feedback === 'wrong' && option !== QUIZ[quizStep].correct ? 'bg-orange-50 border-orange-100 text-orange-200 opacity-50' : feedback === 'wrong' && option === QUIZ[quizStep].correct ? 'bg-red-500 border-red-700 text-white' : 'bg-orange-600 border-orange-800 text-white hover:bg-orange-700'}`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-12 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-2xl ${feedback === 'correct' ? 'text-emerald-600' : 'text-red-600'}`}
                >
                  {feedback === 'correct' ? <><CheckCircle2 className="w-8 h-8" /> Ճիշտ է:</> : <><XCircle className="w-8 h-8" /> Սխալ է:</>}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {view === 'finish' && (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-20 rounded-[5rem] shadow-2xl border border-orange-100 max-w-2xl relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-7xl font-black italic uppercase mb-4 text-orange-900">ՇԱՐՈՒՆԱԿԵԼԻ...</h2>
            <p className="text-2xl text-orange-800/70 mb-12 font-medium">
              Դու հաջողությամբ ավարտեցիր այս մասը: <br />
              Քո միավորները՝ <span className="text-orange-600 font-black">{score} / {QUIZ.length}</span>
            </p>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  setView('tv-intro');
                  setStep(0);
                  setQuizStep(0);
                  setScore(0);
                }}
                className="px-16 py-6 bg-orange-600 text-white rounded-full font-black text-2xl uppercase tracking-widest hover:bg-orange-700 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto w-full"
              >
                <RefreshCw className="w-6 h-6" />
                Նորից դիտել
              </button>
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-orange-300 font-black text-xs uppercase tracking-widest">
                  <Coffee className="w-4 h-4" />
                  <span>Հայկական թեյ</span>
                </div>
                <div className="w-1 h-1 bg-orange-100 rounded-full" />
                <div className="flex items-center gap-2 text-orange-300 font-black text-xs uppercase tracking-widest">
                  <Heart className="w-4 h-4" />
                  <span>Մադրիդ</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; background: #fffaf5; }
      `}} />
    </div>
  );
}
