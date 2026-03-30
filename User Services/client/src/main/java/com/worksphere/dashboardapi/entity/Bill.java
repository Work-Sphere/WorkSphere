package com.worksphere.dashboardapi.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bill")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id")
    private int billId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "service_id")
    private int serviceId;

    @Column(name = "freelancer_id")
    private Integer freelancerId;

    private double amount;
    private double tax;

    @Column(name = "total_amount")
    private double totalAmount;

    @Column(name = "bill_date")
    private LocalDate billDate;

    @Column(name = "payment_mode")
    private String paymentMode;

    /* 🔥 NEW FIELDS */
    @Column(name = "payment_status")
    private String paymentStatus;   // PENDING / PAID

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "paid_date")
    private LocalDate paidDate;

    @ManyToOne
    @JoinColumn(name = "requirement_id")
    private Requirement requirement;

    /* ================= GETTERS & SETTERS ================= */

    public Requirement getRequirement() { return requirement; }
    public void setRequirement(Requirement requirement) { this.requirement = requirement; }

    public int getBillId() { return billId; }
    public void setBillId(int billId) { this.billId = billId; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getServiceId() { return serviceId; }
    public void setServiceId(int serviceId) { this.serviceId = serviceId; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public double getTax() { return tax; }
    public void setTax(double tax) { this.tax = tax; }

    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }

    public LocalDate getBillDate() { return billDate; }
    public void setBillDate(LocalDate billDate) { this.billDate = billDate; }

    public String getPaymentMode() { return paymentMode; }
    public void setPaymentMode(String paymentMode) { this.paymentMode = paymentMode; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public Integer getFreelancerId() { return freelancerId; }
    public void setFreelancerId(Integer freelancerId) { this.freelancerId = freelancerId; }

    public LocalDate getPaidDate() { return paidDate; }
    public void setPaidDate(LocalDate paidDate) { this.paidDate = paidDate; }
}
