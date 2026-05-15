"use client";

export type AschLineLabel = "A" | "B" | "C";

export const ASCH_LABELS: AschLineLabel[] = ["A", "B", "C"];

// 기준선과 동일한 길이는 B. A는 짧고 C는 김 → 정답은 B.
export const ASCH_LENGTHS: Record<AschLineLabel, number> = {
  A: 180,
  B: 280,
  C: 360,
};

export const ASCH_REFERENCE_LENGTH = 280;
export const ASCH_CORRECT_ANSWER: AschLineLabel = "B";

type AschStimulusProps = {
  selectable?: boolean;
  selected?: AschLineLabel | null;
  onSelect?: (label: AschLineLabel) => void;
  highlight?: AschLineLabel | null;
  /**
   * - "full": 기준 선분 + 비교 선분 모두 표시 (기본)
   * - "reference": 기준 선분만
   * - "comparison": 비교 선분만
   */
  variant?: "full" | "reference" | "comparison";
};

function LineRow({
  label,
  length,
  selected,
  onClick,
  highlight,
}: {
  label: string;
  length: number;
  selected?: boolean;
  onClick?: () => void;
  highlight?: boolean;
}) {
  const interactive = !!onClick;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      className={`w-full flex items-center gap-4 sm:gap-6 py-3 px-3 sm:px-4 rounded-md transition-colors text-left ${
        interactive ? "hover:bg-blue-50 cursor-pointer" : "cursor-default"
      } ${
        selected
          ? "bg-blue-100 ring-2 ring-blue-500"
          : highlight
          ? "bg-amber-50 ring-2 ring-amber-400"
          : "bg-white"
      }`}
    >
      <span
        className={`text-base font-bold w-6 shrink-0 ${
          selected ? "text-blue-700" : "text-gray-600"
        }`}
      >
        {label}
      </span>
      <span
        className="block h-1.5 bg-gray-900 rounded-sm"
        style={{ width: `${length}px`, maxWidth: "100%" }}
        aria-label={`line ${label}`}
      />
    </button>
  );
}

export default function AschStimulus({
  selectable = false,
  selected = null,
  onSelect,
  highlight = null,
  variant = "full",
}: AschStimulusProps) {
  const showReference = variant !== "comparison";
  const showComparison = variant !== "reference";

  return (
    <div className="bg-blue-50/40 border-2 border-blue-300 rounded-lg p-4 sm:p-6 shadow-md ring-1 ring-blue-200/60">
      {showReference && (
        <div className={showComparison ? "mb-4" : ""}>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            기준 선분
          </p>
          <div className="flex items-center gap-4 sm:gap-6 py-3 px-3 sm:px-4 bg-white border border-gray-200 rounded-md">
            <span className="text-base font-bold text-gray-900 w-6 shrink-0">
              ★
            </span>
            <span
              className="block h-1.5 bg-gray-900 rounded-sm"
              style={{ width: `${ASCH_REFERENCE_LENGTH}px`, maxWidth: "100%" }}
              aria-label="reference line"
            />
          </div>
        </div>
      )}

      {showComparison && (
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            비교 선분
          </p>
          <div className="space-y-2">
            {ASCH_LABELS.map((label) => (
              <LineRow
                key={label}
                label={label}
                length={ASCH_LENGTHS[label]}
                selected={selectable && selected === label}
                highlight={!selectable && highlight === label}
                onClick={selectable ? () => onSelect?.(label) : undefined}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
