import { RiSparkling2Fill } from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import type { ProcessStep } from "@/types";
import { ProcessList } from "./ProcessList";

export function ProcessCard({ steps }: { steps: ProcessStep[] }) {
  return (
    // No overflow clipping: step tooltips float over neighbouring cards.
    <BentoCard area="process" aria-labelledby="process-title" className="border-white/[0.06] pt-2.5">
      <CardHeader
        bordered
        icon={RiSparkling2Fill}
        label="Work Process"
        title="Workflow Highlights"
        id="process-title"
      />
      <ProcessList steps={steps} />
    </BentoCard>
  );
}
