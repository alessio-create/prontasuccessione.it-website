import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Result } from "@/components/funnel/Result";
import { loadAnswers } from "@/components/funnel/answersStore";

function OptInRoute() {
  const navigate = useNavigate();
  const answers = loadAnswers();
  return (
    <Result
      answers={answers}
      onContinue={() => navigate({ to: "/booking" })}
      onBack={() => navigate({ to: "/quiz" })}
    />
  );
}

export const Route = createFileRoute("/opt-in")({
  component: OptInRoute,
});
