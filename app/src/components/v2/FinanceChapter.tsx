import type { CSSProperties } from "react";
import {
  calculateFinanceSummary,
  createIndexedPoints,
  ILLUSTRATIVE_ASSUMPTIONS,
  pointsToSvgPath,
} from "./financeMath";

const CHART = { left: 86, top: 54, width: 820, height: 250, maxIndex: 100 };
const INDEXED_POINTS = createIndexedPoints(ILLUSTRATIVE_ASSUMPTIONS.years);
const GRID_PATH = pointsToSvgPath(INDEXED_POINTS, "gridIndex", CHART);
const SOLAR_PATH = pointsToSvgPath(INDEXED_POINTS, "solarIndex", CHART);
const SUMMARY = calculateFinanceSummary(ILLUSTRATIVE_ASSUMPTIONS);

const formatBDT = (value: number) => `BDT ${Math.round(value).toLocaleString("en-BD")}`;
const chartY = (index: number): number => CHART.top + CHART.height - (index / CHART.maxIndex) * CHART.height;

export interface FinanceChapterProps {
  embedded?: boolean;
  evidenceLabel?: string;
}

/**
 * Finance is a chapter of the master story, not a second scroll controller.
 * Keep every assumption in the DOM so the mobile fallback is equally honest.
 */
export default function FinanceChapter({ embedded = false, evidenceLabel = "Illustrative index / no tariff or live quote" }: FinanceChapterProps) {
  const chartStyle = { "--finance-chart-height": `${CHART.height}px` } as CSSProperties;
  const solarY = chartY(70);
  const gridY = chartY(100);

  return (
    <section className={`v2-finance${embedded ? " v2-finance--embedded" : ""}`} aria-labelledby="v2-finance-title">
      <div className="v2-finance__track">
        <div className="v2-finance__stage">
          <div className="v2-finance__copy">
            <p className="v2-kicker"><span>03</span> / Financial illustration</p>
            <h2 id="v2-finance-title">Make the bill<br /><em>legible.</em></h2>
            <p>One transparent illustration: the solar-covered portion of a utility bill is modeled at a lower indexed cost. The rest of the bill stays visible.</p>
            <div className="v2-finance__note"><span className="v2-signal v2-signal--gold" /> {evidenceLabel}</div>
          </div>

          <div className="v2-finance__visual" aria-label="Illustrative indexed cost comparison">
            <div className="v2-finance__visual-head">
              <span>Indexed cost, solar portion only</span>
              <span>Base = 100 · no escalation modeled</span>
            </div>
            <svg className="v2-finance__chart" viewBox="0 0 1000 390" role="img" aria-labelledby="v2-finance-chart-title v2-finance-chart-desc" style={chartStyle}>
              <title id="v2-finance-chart-title">Flat illustrative utility and solar-portion cost curves</title>
              <desc id="v2-finance-chart-desc">The utility index remains at 100 and the modeled solar-covered portion remains at 70 through year 20. This is not a whole-bill forecast.</desc>
              <g className="v2-finance__grid" aria-hidden="true">
                {[0, 50, 100].map((index) => <line key={index} x1={CHART.left} x2={CHART.left + CHART.width} y1={chartY(index)} y2={chartY(index)} />)}
                {[0, 5, 10, 15, 20].map((year) => <line key={year} x1={CHART.left + (year / 20) * CHART.width} x2={CHART.left + (year / 20) * CHART.width} y1={CHART.top} y2={CHART.top + CHART.height} />)}
              </g>
              <g className="v2-finance__axis" aria-hidden="true">
                <text x="28" y={gridY + 5}>100</text><text x="42" y={solarY + 5}>70</text><text x="42" y={chartY(0) + 5}>0</text>
                <text x={CHART.left} y="350">TODAY</text><text x="875" y="350">YEAR 20</text>
              </g>
              <path className="v2-finance__curve v2-finance__curve--grid" d={GRID_PATH} />
              <path className="v2-finance__curve v2-finance__curve--netso" d={SOLAR_PATH} />
              <circle className="v2-finance__dot v2-finance__dot--grid" cx={CHART.left + CHART.width} cy={gridY} r="6" />
              <circle className="v2-finance__dot v2-finance__dot--netso" cx={CHART.left + CHART.width} cy={solarY} r="6" />
            </svg>
            <div className="v2-finance__legend">
              <span><i className="v2-legend-dot v2-legend-dot--grid" /> Utility index (100)</span>
              <span><i className="v2-legend-dot v2-legend-dot--netso" /> Modeled solar portion (70)</span>
            </div>
            <div className="v2-finance__delta"><strong>30%</strong><span>illustrative discount<br />on solar portion only</span></div>
          </div>

          <div className="v2-finance__panel" aria-label="Illustrative monthly assumptions">
            <span className="v2-finance__panel-label">Monthly illustration</span>
            <span>Illustrative grid bill <b>{formatBDT(ILLUSTRATIVE_ASSUMPTIONS.monthlyGridSpend)}</b></span>
            <span>Solar-covered portion <b>{Math.round(ILLUSTRATIVE_ASSUMPTIONS.solarPortion * 100)}% / {formatBDT(SUMMARY.solarPortionBaseline)}</b></span>
            <span>Unchanged remainder <b>{formatBDT(SUMMARY.unchangedMonthlySpend)}</b></span>
            <span>Modeled solar cost <b>{formatBDT(SUMMARY.solarPortionCost)}</b></span>
          </div>

          <div className="v2-finance__cumulative">
            <span className="v2-finance__panel-label">Value, without escalation</span>
            <strong>{formatBDT(SUMMARY.monthlySaving)}<small> / month saving</small></strong>
            <span>{formatBDT(SUMMARY.cumulativeSaving)} over {ILLUSTRATIVE_ASSUMPTIONS.years} years, if the illustration held.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
