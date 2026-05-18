import { createFileRoute } from "@tanstack/react-router";
import { Funnel } from "@/components/funnel/Funnel";

export const Route = createFileRoute("/")({
  component: Funnel,
});
