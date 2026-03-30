import React, { useEffect, useState } from "react";
import api from "../../../api.js/axios.js";
import "./Earnings.css";

const Earnings = () => {
  // ✅ SINGLE SOURCE OF TRUTH
  const clientId = localStorage.getItem("uid");

  const [payments, setPayments] = useState([]);
  const [loadingBillId, setLoadingBillId] = useState(null);
  const [paymentModes, setPaymentModes] = useState({});

  /* =====================
     Fetch Bills
  ===================== */
  const fetchPayments = () => {
    if (!clientId) {
      console.error("Client ID not found in localStorage");
      return;
    }

    api
      .get("/client/payments", {
        params: { clientId },
      })
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Payments error:", err));
  };

  useEffect(() => {
    fetchPayments();
  }, [clientId]);

  /* =====================
     Make Payment
  ===================== */
  const makePayment = (billId) => {
    const mode = paymentModes[billId] || "UPI";
    setLoadingBillId(billId);

    api
      .put(`/client/pay/${billId}`, null, {
        params: { paymentMode: mode },
      })
      .then(() => fetchPayments())
      .catch((err) => console.error("Payment error:", err))
      .finally(() => setLoadingBillId(null));
  };

  return (
    <div className="client-payments">
      <h2>Bills & Payments</h2>

      {payments.length === 0 ? (
        <p>No bills found.</p>
      ) : (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Amount</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Bill Date</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Payment Mode</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((b) => (
              <tr key={b.billId}>
                <td>{b.billId}</td>
                <td>₹{b.amount}</td>
                <td>₹{b.tax}</td>
                <td className="total">₹{b.totalAmount}</td>
                <td>{b.billDate}</td>

                {/* Status */}
                <td>
                  <span
                    className={`status ${
                      b.paymentStatus === "PAID" ? "paid" : "pending"
                    }`}
                  >
                    {b.paymentStatus}
                  </span>
                </td>

                {/* Transaction ID */}
                <td className="txn-id">
                  {b.transactionId || "-"}
                </td>

                {/* Payment Mode */}
                <td className="payment-mode">
                  {b.paymentStatus === "PAID" ? b.paymentMode : "-"}
                </td>

                {/* Action */}
                <td>
                  {b.paymentStatus === "PENDING" ? (
                    <div className="payment-action">
                      <select
                        className="payment-select"
                        value={paymentModes[b.billId] || "UPI"}
                        onChange={(e) =>
                          setPaymentModes({
                            ...paymentModes,
                            [b.billId]: e.target.value,
                          })
                        }
                      >
                        <option value="UPI">UPI</option>
                        <option value="CARD">CARD</option>
                        <option value="NET_BANKING">NET BANKING</option>
                      </select>

                      <button
                        className="pay-btn"
                        onClick={() => makePayment(b.billId)}
                        disabled={loadingBillId === b.billId}
                      >
                        {loadingBillId === b.billId
                          ? "Processing..."
                          : "Make Payment"}
                      </button>
                    </div>
                  ) : (
                    <span className="paid-text">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Earnings;
