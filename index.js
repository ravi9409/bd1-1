const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

let taxRate = 5;
let discountPercetage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = newItemPrice + cartTotal;
  res.send(total.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let total = 0;
  if (isMember) {
    total = cartTotal * 0.9;
  }
  res.send(total.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = cartTotal * 0.05;
  res.send(total.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let days = 0;
  if (shippingMethod == 'standard') days = distance / 50;
  else if (shippingMethod == 'express') days = distance / 100;
  res.send(days.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = 0;
  shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let purchaseAfterLoyalty = loyaltyRate * purchaseAmount;
  res.send(purchaseAfterLoyalty.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
