export const ILLUSTRATIVE_MONTHLY_GRID_SPEND = 100_000;
export const ILLUSTRATIVE_SOLAR_PORTION = 0.5;
export const ILLUSTRATIVE_SOLAR_DISCOUNT = 0.3;
export const ILLUSTRATIVE_YEARS = 20;

export interface FinanceAssumptions {
  monthlyGridSpend: number;
  solarPortion: number;
  solarDiscount: number;
  years: number;
}

export interface FinanceSummary {
  unchangedMonthlySpend: number;
  solarPortionBaseline: number;
  solarPortionCost: number;
  monthlySaving: number;
  annualSaving: number;
  cumulativeSaving: number;
}

export interface IndexedPoint {
  year: number;
  gridIndex: number;
  solarIndex: number;
}

export const ILLUSTRATIVE_ASSUMPTIONS: FinanceAssumptions = {
  monthlyGridSpend: ILLUSTRATIVE_MONTHLY_GRID_SPEND,
  solarPortion: ILLUSTRATIVE_SOLAR_PORTION,
  solarDiscount: ILLUSTRATIVE_SOLAR_DISCOUNT,
  years: ILLUSTRATIVE_YEARS,
};

export function calculateFinanceSummary({
  monthlyGridSpend,
  solarPortion,
  solarDiscount,
  years,
}: FinanceAssumptions): FinanceSummary {
  const unchangedMonthlySpend = monthlyGridSpend * (1 - solarPortion);
  const solarPortionBaseline = monthlyGridSpend * solarPortion;
  const solarPortionCost = solarPortionBaseline * (1 - solarDiscount);
  const monthlySaving = solarPortionBaseline - solarPortionCost;

  return {
    unchangedMonthlySpend,
    solarPortionBaseline,
    solarPortionCost,
    monthlySaving,
    annualSaving: monthlySaving * 12,
    cumulativeSaving: monthlySaving * 12 * years,
  };
}

export function createIndexedPoints(years: number): IndexedPoint[] {
  const safeYears = Math.max(0, Math.floor(years));
  return [0, 5, 10, 15, safeYears]
    .filter((year, index, points) => year <= safeYears && points.indexOf(year) === index)
    .map((year) => ({ year, gridIndex: 100, solarIndex: 70 }));
}

export function pointsToSvgPath(
  points: IndexedPoint[],
  value: "gridIndex" | "solarIndex",
  chart: { left: number; top: number; width: number; height: number; maxIndex: number },
): string {
  if (points.length === 0) return "";
  const lastYear = points[points.length - 1]?.year ?? 1;
  const denominator = Math.max(lastYear, 1);

  return points
    .map((point, index) => {
      const x = chart.left + (point.year / denominator) * chart.width;
      const y = chart.top + chart.height - (point[value] / chart.maxIndex) * chart.height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}
