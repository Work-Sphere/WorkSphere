package com.worksphere.dashboardapi.controller;

import com.worksphere.dashboardapi.entity.Bill;
import com.worksphere.dashboardapi.service.ClientPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
@CrossOrigin(origins = "http://localhost:5173")
public class ClientPaymentController {

    @Autowired
    private ClientPaymentService paymentService;

    @GetMapping("/payments")
    public List<Bill> getClientPayments(@RequestParam("clientId") int clientId) {
        return paymentService.getClientPayments(clientId);
    }

    /* 🔥 MAKE PAYMENT API */
    @PutMapping("/pay/{billId}")
    public Bill makePayment(
            @PathVariable("billId") int billId,
            @RequestParam("paymentMode") String paymentMode) {
        return paymentService.makePayment(billId, paymentMode);
    }
}
