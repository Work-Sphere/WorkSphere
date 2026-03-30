package com.worksphere.dashboardapi.service;

import com.worksphere.dashboardapi.entity.Bill;
import com.worksphere.dashboardapi.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
public class ClientPaymentService {

    @Autowired
    private BillRepository billRepository;

    public List<Bill> getClientPayments(int clientId) {
        return billRepository.findByUserId(clientId);
    }

    /* 🔥 MAKE PAYMENT */
    public Bill makePayment(int billId, String paymentMode) {

        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

        if ("PAID".equalsIgnoreCase(bill.getPaymentStatus())) {
            throw new RuntimeException("Bill already paid");
        }

        bill.setPaymentStatus("PAID");
        bill.setPaymentMode(paymentMode);
        bill.setPaidDate(LocalDate.now());
        bill.setTransactionId(generateTransactionId(bill.getUserId()));

        return billRepository.save(bill);
    }

    /* 🔐 Transaction ID Generator */
    private String generateTransactionId(int userId) {
        int random = new Random().nextInt(9000) + 1000;
        return "TXN_" + userId + "_" +
                LocalDate.now().toString().replace("-", "") +
                "_" + random;
    }
}
