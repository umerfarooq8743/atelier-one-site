"use client";

import dynamic from "next/dynamic";
import type { ScreenId } from "@/data/types";

/** Loads the mockup library only when a screen is first requested (e.g. a tab click). */
const Screen = dynamic(() => import("@/components/mockups/registry").then((m) => m.Screen), {
  ssr: false,
  loading: () => (
    <div className="mk-frame grid aspect-[16/10] place-items-center" aria-busy="true">
      <span className="size-8 animate-spin rounded-full border-2 border-line-strong border-t-brass" />
      <span className="sr-only">Loading preview…</span>
    </div>
  ),
});

export function LazyScreen({ id }: { id: ScreenId }) {
  return <Screen id={id} />;
}
