import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Result } from "@/components/funnel/Result";
import { Confirmed } from "@/components/funnel/Booking";
import { clearAnswers, loadAnswers } from "@/components/funnel/answersStore";

function OptInRoute() {
  const navigate = useNavigate();
  const answers = loadAnswers();
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return <Confirmed onRestart={() => { clearAnswers(); navigate({ to: "/" }); }} />;
  }
  return (
    <Result
      answers={answers}
      onConfirm={() => setConfirmed(true)}
      onBack={() => navigate({ to: "/quiz" })}
    />
  );
}

export const Route = createFileRoute("/opt-in")({
  component: OptInRoute,
});
