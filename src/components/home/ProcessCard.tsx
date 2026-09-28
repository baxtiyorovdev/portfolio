import { RiSparkling2Fill } from "react-icons/ri";
import { BentoCard, CardHeader } from "@/components/bento/BentoCard";
import { workflow } from "@/lib/portfolio";
import { ProcessList } from "./ProcessList";

export function ProcessCard() {
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
      <ProcessList steps={workflow} />
    </BentoCard>
  );
}
