const Payment = require('../models/payment.model');
const User = require('../models/user.model');

exports.pay = (req,res) =>
{
    User.findOne({ username: req.body.username },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while Checking user info', error: err });
        }
        else
        {
            if(ans)
            {
                var finalPrice = 0;
                var couponCode = null;
                if(req.body.couponCodeApplied)
                {
                    finalPrice = req.body.finalPrice;
                    couponCode = req.body.couponCode;
                }
                else
                {
                    finalPrice = req.body.price;
                }
                if(finalPrice<ans.walletBalance)
                {
                    var payment = new Payment(
                        {
                            username: ans.username,
                            a: req.body.a,
                            b: req.body.b,
                            couponCodeApplied: req.body.couponCodeApplied,
                            couponCode: couponCode,
                            orgPrice: req.body.price,
                            finalrPrice: req.body.finalPrice
                        }
                    );
                    payment.save((er) =>
                    {
                        if(er)
                        {
                            res.status(500).send({ message: 'Payment Failed' });
                        }
                        else
                        {
                            if(couponCode!=null)
                            {
                                ans.usedCouponCodes.append(couponCode);
                            }
                            var newBalance = ans.walletBalance - finalPrice;
                            User.updateOne({ username: ans.username },{ walletBalance: newBalance, usedCouponCodes: usedCouponCodes },(err) =>
                            {
                                if(err)
                                {
                                    res.status(500).send({ message: 'Account Updation Failed' });
                                }
                                else
                                {
                                    res.status(200).send({ message: 'Payment Successful' });
                                }
                            });
                        }
                    })
                }
                else
                {
                    res.status(401).send({ message: 'Insufficient Balance in Wallet' });
                }
            }
            else
            {
                res.status(404).send({ message: 'User not found, please register' });
            }
        }
    });
}