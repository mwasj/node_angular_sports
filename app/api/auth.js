/**
 * Created by Michal on 29/12/2015.
 */
// app/routes.js
module.exports = function(app, passport)
{
    app.get('/logout', passport.ensureAuthenticated, function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/isloggedin', passport.ensureAuthenticated, function(req, res)
    {
        return res.status(200).send({ success : true, user: req.user});
    });

    app.get('/api/test', passport.ensureAuthenticated, function(req, res)
    {
        res.json("Authentication successful!");
    });

    // process the signup form
    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info)
        {
            if (err) {
              return next(err); // will generate a 500 error
            }

            // Generate a JSON response reflecting authentication status
            if (! user) {
                return res.status(400).send({ success : false, message: info.message});
            }
            return res.status(200).send({ success : true, message: info.message, user: user});

        })(req, res, next);
    });

    app.post('/login', function(req, res, next) {
      passport.authenticate('local-login', function(err, user, info)
      {
            if (err) {
              return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
              return res.send(401,{ success : false, message : info.message });
            }

            req.login(user, function(err)
            {
              if(err)
              {
                return next(err);
              }
              return res.send({ success : true, message :  info.message, user: req.user});
            });
      })(req, res, next);
    });
};