import React from "react";
import { generateBill } from "../api/FreelancerApi";
import "./GenerateBill.css";

const GenerateBill = ({ requirementId, serviceId, budget, onBillGenerated }) => {
  const handleGenerate = async () => {
    // 1. Prompt for Amount
    const inputAmount = window.prompt(
      `Enter Bill Amount (Defaults to Budget: ₹${budget ?? 0}):`,
      budget ?? 0
    );

    if (inputAmount === null) return; // Cancelled

    const finalAmount = parseFloat(inputAmount);

    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    // 2. Calculate Tax (18%)
    const taxAmount = finalAmount * 0.18;
    const totalAmount = finalAmount + taxAmount;

    // 3. Prepare Data
    const billData = {
      requirementId: requirementId,
      serviceId: serviceId,
      amount: finalAmount,
      tax: taxAmount,
    };

    try {
      // 4. API Call
      await generateBill(billData);

      // 5. Success Handling
      alert(`✅ Bill Generated Successfully!\n\nAmount: ₹${finalAmount}\nTax (18%): ₹${taxAmount.toFixed(2)}\nTotal: ₹${totalAmount.toFixed(2)}`);

      if (onBillGenerated) {
        onBillGenerated();
      }

    } catch (err) {
      console.error("GENERATE BILL ERROR:", err);

      // 6. robust Error Handling
      let errorMessage = "Failed to generate bill.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      alert("❌ Error: " + errorMessage);
    }
  };

  return (
    <button
      className="status-badge generate-bill-btn"
      onClick={handleGenerate}
      style={{ cursor: "pointer", backgroundColor: "#007bff", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px" }}
    >
      Generate Bill
    </button>
  );
};

export default GenerateBill;
