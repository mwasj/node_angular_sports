/**
 * Created by Michal on 29/12/2015.
 */
module.exports = function(app, dirname)
{
    app.all('/*', function(req, res)
    {
        res.sendFile(dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
