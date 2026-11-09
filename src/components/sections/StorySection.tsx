import { Info } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { stories, workflowProof } from "@/data/stories";

export function StorySection() {
  const story = stories[0];
  return (
    <section className="section bg-bg-raised/50" aria-labelledby="story-title">
      <div className="container-page grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <SectionHeading align="left" eyebrow="Customer story" title={<span id="story-title">{story.business}</span>}>
            {!story.verified && <Badge tone="brass"><Info aria-hidden className="size-3" />{story.label}</Badge>}
          </SectionHeading>
          <Reveal>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-fg-2">{story.context}</p>
          </Reveal>

          <Reveal className="mt-10">
            <h3 className="font-display text-lg font-semibold">Built Around Real Tailoring Business Workflows</h3>
            <p className="mt-2 text-[0.9375rem] text-muted">Rather than invented testimonials, here are product rules you can verify in the documentation:</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {workflowProof.map((p) => (
                <li key={p.title} className="card p-4">
                  <p className="font-display font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <RevealGroup as="ol" className="relative space-y-4">
          <span aria-hidden className="stitch-v absolute left-[1.6rem] top-6 bottom-6 hidden sm:block" />
          {story.scenes.map((s) => (
            <RevealItem as="li" key={s.time} className="relative flex gap-5">
              <span className="relative z-10 hidden h-fit min-w-[3.25rem] rounded-full border border-line bg-bg px-2 py-1.5 text-center font-display text-xs font-semibold text-brass-text sm:block">
                {s.time}
              </span>
              <div className="card flex-1 p-5">
                <p className="text-xs font-semibold text-brass-text sm:hidden">{s.time}</p>
                <h3 className="font-display font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{s.detail}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
