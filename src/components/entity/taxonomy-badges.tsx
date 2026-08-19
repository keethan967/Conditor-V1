import { Badge } from "@/components/ui/badge";
import {
  FUNDING_STAGES,
  INDUSTRIES,
  labelFor,
  type FundingStage,
  type Industry,
} from "@/constants/taxonomy";

export function StageBadge({
  stage,
  className,
}: {
  stage: FundingStage;
  className?: string;
}) {
  return (
    <Badge variant="secondary" className={className}>
      {labelFor(FUNDING_STAGES, stage)}
    </Badge>
  );
}

export function IndustryBadge({
  industry,
  className,
}: {
  industry: Industry;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={className}>
      {labelFor(INDUSTRIES, industry)}
    </Badge>
  );
}
