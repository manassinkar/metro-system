const Route = require('../models/route.model');

exports.addRoute = (req,res) =>
{
    Route.findOne({ $or: [{ a: req.body.a, b: req.body.b },{ b: req.body.a, a: req.body.b }] },(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while adding route', error: err });
        }
        else
        {
            if(ans)
            {
                res.status(401).send({ message: 'Route already exists' });
            }
            else
            {
                var route = new Route(
                    {
                        a: req.body.a,
                        b: req.body.b,
                        price: req.body.price
                    }
                );
                route.save((er) =>
                {
                    if(er)
                    {
                        res.status(500).send({ message: 'Error while adding Route',error: er });
                    }
                    else
                    {
                        res.status(200).send({ message: 'Route added successfully' });
                    }
                })
            }
        }
    });
};

exports.viewRoutes = (req,res) =>
{
    Route.find({},(err,ans) =>
    {
        if(err)
        {
            res.status(500).send({ message: 'Error while finding routes' });
        }
        else
        {
            res.status(200).send(ans);
        }
    })
};