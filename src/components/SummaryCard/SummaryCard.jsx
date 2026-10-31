
import "./SummaryCard.css";

export default function SummaryCard({
  title,
  amount,
  buttonText,
  onButtonClick,
  amountColor,
  buttonColor
}) {
  return (
    <div className="summary-card">

      <h3>
        {title}: <span style={{ color: amountColor }}>
          ₹{Number(amount).toLocaleString("en-IN")}
        </span>
      </h3>

      <button
        className="summary-button"
        style={{ backgroundColor: buttonColor }}
        onClick={onButtonClick}
      >
        {buttonText}
      </button>

    </div>
  );
}