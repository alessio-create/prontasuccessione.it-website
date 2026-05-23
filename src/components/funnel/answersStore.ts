import type { Answers } from "./Quiz";

const KEY = "ps_answers";

export const loadAnswers = (): Answers => {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(sessionStorage.getItem(KEY) || "{}"); } catch { return {}; }
};

export const saveAnswers = (a: Answers) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(a));
};

export const clearAnswers = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
};
