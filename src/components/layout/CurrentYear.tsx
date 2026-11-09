"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Year is read in the browser only, so the static build never freezes an old year. */
export function CurrentYear() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
  return <span>{year ?? ""}</span>;
}
