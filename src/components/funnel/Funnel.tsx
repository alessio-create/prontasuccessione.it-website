import React, { useState } from "react";
import { Landing } from "./Landing";
import { Quiz, type Answers } from "./Quiz";
import { Processing, Result } from "./Result";
import { Booking, Confirmed } from "./Booking";

type Screen = "landing" | "quiz" | "processing" | "result" | "booking" | "confirmed";

export const Funnel = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const reset = () => { setAnswers({}); setStep(0); };

  switch (screen) {
    case "landing": return <Landing onStart={() => { reset(); setScreen("quiz"); }}/>;
    case "quiz": return <Quiz answers={answers} setAnswers={setAnswers} step={step} setStep={setStep}
      onComplete={() => setScreen("processing")} onBack={() => setScreen("landing")}/>;
    case "processing": return <Processing onDone={() => setScreen("result")}/>;
    case "result": return <Result answers={answers} onContinue={() => setScreen("booking")}
      onBack={() => { setStep(0); setScreen("quiz"); }}/>;
    case "booking": return <Booking onConfirm={() => setScreen("confirmed")} onBack={() => setScreen("result")}/>;
    case "confirmed": return <Confirmed onRestart={() => { reset(); setScreen("landing"); }}/>;
  }
};
