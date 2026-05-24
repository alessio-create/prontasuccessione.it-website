import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Landing } from "@/components/funnel/Landing";
import { clearAnswers, saveAnswers } from "@/components/funnel/answersStore";

function LandingRoute() {
  const navigate = useNavigate();
  return (
    <Landing
      onStart={() => { clearAnswers(); navigate({ to: "/quiz" }); }}
      onChatComplete={(answers) => {
        saveAnswers(answers);
        navigate({ to: "/opt-in" });
      }}
    />
  );
}

export const Route = createFileRoute("/")({
  component: LandingRoute,
});
