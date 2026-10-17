import type { CSSProperties } from "react";
import { calculateFinanceSummary, ILLUSTRATIVE_ASSUMPTIONS } from "./financeMath";
import { getV2Chapter, v2ChapterNumber } from "./v2Chapters";

const SUMMARY = calculateFinanceSummary(ILLUSTRATIVE_ASSUMPTIONS);
const BILL_TOTAL = ILLUSTRATIVE_ASSUMPTIONS.monthlyGridSpend;
const WITH_SOLAR_TOTAL = SUMMARY.unchangedMonthlySpend + SUMMARY.solarPortionCost;
const SOLAR_DISCOUNT_PERCENT = Math.round(ILLUSTRATIVE_ASSUMPTIONS.solarDiscount * 100);
const MODELED_TOTAL_BILL_REDUCTION_PERCENT = Math.round(
  ILLUSTRATIVE_ASSUMPTIONS.solarPortion * ILLUSTRATIVE_ASSUMPTIONS.solarDiscount * 100,
);

const formatAmount = (value: number) => Math.round(value).toLocaleString("en-BD");
/** Every bar is a share of the same grid-only bill, so the two rows compare directly. */
const billShare = (value: number) => `${(value / BILL_TOTAL) * 100}%`;

function BillAmount({ value }: { value: number }) {
  return formatAmount(value);
}

export interface FinanceChapterProps {
  embedded?: boolean;
  evidenceLabel?: string;
}

/** Finance compares one whole bill before solar with one whole bill after solar.
 *  The solar portion is split across the two illustrations, but each row is a single
 *  monthly bill, and the difference between them is the modeled saving. */
export default function FinanceChapter({ embedded = false, evidenceLabel = "Illustrative calculation / no tariff or live quote" }: FinanceChapterProps) {
  return (
    <section className={`v2-finance${embedded ? " v2-finance--embedded" : ""}`} aria-labelledby="v2-finance-title">
      <div className="v2-finance__track">
        <div className="v2-finance__stage">
          <div className="v2-finance__copy">
            <p className="v2-kicker"><span>{v2ChapterNumber("finance")}</span> / {getV2Chapter("finance").label}</p>
            <h2 id="v2-finance-title">One bill in, one bill out.</h2>
          </div>

          <div className="v2-finance__visual">
            <div className="v2-finance__bars">
              <div className="v2-finance__bars-meta">
                <p className="v2-finance__bars-caption">Monthly bill · BDT</p>
              </div>

              <div className="v2-finance__bar" data-bar="grid-only">
                <div className="v2-finance__bar-head">
                  <span className="v2-finance__bar-name">Grid only</span>
                  <span className="v2-finance__bar-total" style={{ "--bar-end": billShare(BILL_TOTAL) } as CSSProperties}>
                    {formatAmount(BILL_TOTAL)}
                  </span>
                </div>
                <div className="v2-finance__bar-track" aria-hidden="true">
                  <span className="v2-finance__seg v2-finance__seg--rest" style={{ width: billShare(SUMMARY.unchangedMonthlySpend) }} />
                  <span className="v2-finance__seg v2-finance__seg--portion" style={{ width: billShare(SUMMARY.solarPortionBaseline) }} />
                </div>
              </div>

              <div className="v2-finance__bar" data-bar="with-solar">
                <div className="v2-finance__bar-head">
                  <span className="v2-finance__bar-name">With solar <span>modeled</span></span>
                  <span className="v2-finance__bar-total v2-finance__bar-total--solar" style={{ "--bar-end": billShare(WITH_SOLAR_TOTAL) } as CSSProperties}>
                    {formatAmount(WITH_SOLAR_TOTAL)}
                  </span>
                </div>
                <div className="v2-finance__bar-track" aria-hidden="true">
                  <span className="v2-finance__seg v2-finance__seg--rest" style={{ width: billShare(SUMMARY.unchangedMonthlySpend) }} />
                  <span className="v2-finance__seg v2-finance__seg--discount" style={{ width: billShare(SUMMARY.solarPortionCost) }} />
                  <span className="v2-finance__bar-gap" style={{ left: billShare(WITH_SOLAR_TOTAL) }} aria-hidden="true">−{MODELED_TOTAL_BILL_REDUCTION_PERCENT}%</span>
                </div>
                <span className="v2-finance__bar-gap-label" aria-live="polite">That is BDT {formatAmount(SUMMARY.monthlySaving)} less each month.</span>
              </div>

              <p className="v2-finance__result">
                <strong>
                  {SOLAR_DISCOUNT_PERCENT}% discount on the solar portion = {MODELED_TOTAL_BILL_REDUCTION_PERCENT}% modeled total-bill reduction.
                </strong>
              </p>
            </div>

            <table className="v2-finance__bill">
              <caption>Line by line · BDT · {Math.round(ILLUSTRATIVE_ASSUMPTIONS.solarPortion * 100)}% solar-covered portion</caption>
              <thead>
                <tr><th scope="col">Bill part</th><th scope="col">Grid only</th><th scope="col">With solar<br /><span>modeled</span></th></tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Unchanged remainder</th>
                  <td><BillAmount value={SUMMARY.unchangedMonthlySpend} /></td>
                  <td><BillAmount value={SUMMARY.unchangedMonthlySpend} /></td>
                </tr>
                <tr className="v2-finance__bill-solar">
                  <th scope="row">Solar-covered portion</th>
                  <td><BillAmount value={SUMMARY.solarPortionBaseline} /></td>
                  <td><BillAmount value={SUMMARY.solarPortionCost} /></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Monthly total</th>
                  <td><BillAmount value={BILL_TOTAL} /></td>
                  <td><BillAmount value={WITH_SOLAR_TOTAL} /></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <aside className="v2-finance__evidence" aria-label="Illustration limits">
            <div className="v2-finance__disclosure">
              <p className="v2-finance__note">{evidenceLabel}</p>
              <p>Excludes tariff changes, escalation, degradation, changing usage, financing, and maintenance terms.</p>
              <p>This is not a whole-bill forecast.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
