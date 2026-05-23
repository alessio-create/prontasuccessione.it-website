import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Landing } from "@/components/funnel/Landing";
import { clearAnswers } from "@/components/funnel/answersStore";

function LandingRoute() {
  const navigate = useNavigate();
  return <Landing onStart={() => { clearAnswers(); navigate({ to: "/quiz" }); }} />;
}

export const Route = createFileRoute("/")({
  component: LandingRoute,
});
