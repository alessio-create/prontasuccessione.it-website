import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Booking, Confirmed } from "@/components/funnel/Booking";
import { clearAnswers } from "@/components/funnel/answersStore";

function BookingRoute() {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return <Confirmed onRestart={() => { clearAnswers(); navigate({ to: "/" }); }} />;
  }
  return (
    <Booking
      onConfirm={() => setConfirmed(true)}
      onBack={() => navigate({ to: "/opt-in" })}
    />
  );
}

export const Route = createFileRoute("/booking")({
  component: BookingRoute,
});
