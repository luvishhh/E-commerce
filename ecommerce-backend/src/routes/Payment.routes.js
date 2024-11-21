const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../model/Payment.model/Payment.model.js'); // Import your Payment model
const router = express.Router();

// Razorpay credentials
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_GOrCEYisNgBF2q", // Replace with your Razorpay Test Key ID
  key_secret: 'wcFWT7BZFhpchB7i05uYqWAK', // Replace with your Razorpay Test Key Secret
});

// Route to create a Razorpay order
router.post('/create-order', async (req, res) => {
  const { amount, userId, orderId } = req.body;

  if (!amount || !userId || !orderId) {
    return res.status(400).json({ error: 'Amount, userId, and orderId are required' });
  }

  try {
    const options = {
      amount: amount * 100, // Amount in paise (1 INR = 100 paise)
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
      payment_capture: 1, // 1 means Razorpay will capture the payment immediately
    };

    // Create the order with Razorpay API
    razorpayInstance.orders.create(options, async (err, order) => {
      if (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ error: 'Failed to create Razorpay order' });
      }

      // Save payment details to the database
      const payment = new Payment({
        userId: userId,  // Assuming userId is passed from the frontend
        amount: amount,
        paymentMethod: 'Razorpay',
        paymentStatus: 'Pending', // Initially, the status is 'Pending'
        transactionId: order.id, // Razorpay order ID as transaction ID
        orderId: orderId,  // Order ID from frontend
      });

      await payment.save();

      // Return Razorpay order details to the frontend
      return res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        paymentId: payment._id,  // Return the payment document ID to track the payment
      });
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Error creating Razorpay order');
  }
});

// Route to verify payment
router.post('/verify-payment', async (req, res) => {
  const { paymentId, orderId, signature } = req.body;

  if (!paymentId || !orderId || !signature) {
    return res.status(400).json({ error: 'PaymentId, OrderId, and Signature are required' });
  }

  // Razorpay provides a signature to validate the payment
  const generatedSignature = crypto
    .createHmac('sha256', 'wcFWT7BZFhpchB7i05uYqWAK')  // Use your Razorpay Test Key Secret
    .update(orderId + "|" + paymentId)
    .digest('hex');

  // Check if the generated signature matches with the signature sent by Razorpay
  if (generatedSignature === signature) {
    try {
      // Payment is valid, now update the payment status in the database
      const payment = await Payment.findOne({ transactionId: orderId });

      if (payment) {
        payment.paymentStatus = 'Completed';  // Update payment status to 'Completed'
        await payment.save();

        // Optionally, you can also update the order status in the database here
        // For example, you might update the order's status to "Paid"
        // const order = await Order.findById(payment.orderId);
        // order.status = 'Paid';
        // await order.save();

        return res.status(200).send('Payment verified and status updated');
      }

      return res.status(404).send('Payment not found');
    } catch (error) {
      console.error('Error verifying payment:', error);
      return res.status(500).send('Error verifying payment');
    }
  } else {
    // Signature mismatch, invalid payment
    return res.status(400).send('Payment verification failed');
  }
});

module.exports = router;
