// import express from "express";
// import { json } from "body-parser";
// import cors from "cors";

const express = require("express")
const { json } = require("body-parser");
const cors = require("cors");



const app = express();
app.use(json());
app.use(cors());

// Sample route to verify server is working
app.get("/", (req, res) => {
    res.send("Payment backend is running!");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Mock database to store payment transactions
const transactions = [];

// Handle Credit/Debit Card Payment
app.post("/pay/card", (req, res) => {
    
    const { cardNumber, cardHolderName, expiryDate, cvv, amount } = req.body;

    // Validate fields
    if (!cardNumber || !cardHolderName || !expiryDate || !cvv || !amount) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Mock validation (this is just a dummy check)
    if (cardNumber.length !== 20 || cvv.length !== 3) {
        return res.status(400).json({ message: "Invalid card details!" });
    }

    // Simulate payment success
    const transactionId = `TXN${Date.now()}`;
    transactions.push({ type: "card", transactionId, amount, status: "success" });

    res.status(200).json({
        message: "Payment successful!",
        transactionId,
        status: "success",
    });
});

// Handle UPI Payment
app.post("/pay/upi", (req, res) => {
    const { upiId, amount } = req.body;

    // Validate fields
    if (!upiId || !amount) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // Mock validation (dummy check for UPI ID format)
    if (!upiId.includes("@")) {
        return res.status(400).json({ message: "Invalid UPI ID!" });
    }

    // Simulate payment success
    const transactionId = `TXN${Date.now()}`;
    transactions.push({ type: "upi", transactionId, amount, status: "success" });

    res.status(200).json({
        message: "Payment successful!",
        transactionId,
        status: "success",
    });
});


// Get all transactions
app.get("/transactions", (req, res) => {
    res.status(200).json(transactions);
});
