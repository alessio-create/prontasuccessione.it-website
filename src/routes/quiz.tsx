import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Quiz, type Answers } from "@/components/funnel/Quiz";
import { Processing } from "@/components/funnel/Result";
import { loadAnswers, saveAnswers } from "@/components/funnel/answersStore";

function QuizRoute() {
  const navigate = useNavigate();
  const [answers, setAnswersState] = useState<Answers>(() => loadAnswers());
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);

  const setAnswers = (a: Answers) => { setAnswersState(a); saveAnswers(a); };

  if (processing) {
    return <Processing onDone={() => navigate({ to: "/opt-in" })} />;
  }
  return (
    <Quiz
      answers={answers}
      setAnswers={setAnswers}
      step={step}
      setStep={setStep}
      onComplete={() => setProcessing(true)}
      onBack={() => navigate({ to: "/" })}
    />
  );
}

export const Route = createFileRoute("/quiz")({
  component: QuizRoute,
});
