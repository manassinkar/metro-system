const Coupon = require('../models/coupon.model');
const User = require('../models/user.model');

exports.addCoupon = (req,res) =>
{
    Coupon.findOne({ code: req.body.code },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while adding coupon', error: err });
        }
        else
        {
            if(ans)
            {
                res.status(401).send({ message: 'Coupon already exists' });
            }
            else
            {
                var coupon = new Coupon(
                    {
                        code: req.body.code,
                        percentageOff: req.body.percentageOff,
                        timeAdded: new Date()
                    }
                );
                coupon.save((er) =>
                {
                    if(er)
                    {
                        res.status(500).send({ message: 'Error while adding Coupon',error: er });
                    }
                    else
                    {
                        res.status(200).send({ message: 'Coupon added successfully' });
                    }
                })
            }
        }
    });
};

exports.applyCoupon = (req) =>
{
    User.findOne({ username: req.body.username },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while Checking user info',error: err });
        }
        else
        {
            if(ans)
            {
                var used = ans.usedCouponCodes.includes(req.body.code);
                if(used)
                {
                    res.status(401).send({ message: 'Coupon Used Already' });
                }
                else
                {
                    Coupon.findOne({ code: req.body.code },(er,an) =>
                    {
                        if(er)
                        {
                            res.status(500).send({ message: 'Error while fetching Coupon information',error: er });
                        }
                        else
                        {
                            if(an)
                            {
                                var price = req.body.price;
                                price = Math.ceil(((100-an.percentageOff)/100)*price);
                                res.status(200).send({ message: 'Discount Applied', finalPrice: price });
                            }
                            else
                            {
                                res.status(404).send({ message: 'Coupon not found' });
                            }
                        }
                    });
                }
            }
            else
            {
                res.status(404).send({ message: 'User not found, please register' });
            }
        }
    });
};