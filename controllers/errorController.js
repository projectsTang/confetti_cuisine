module.exports = {
    internalServerError: (error, req, res, next) => {
        console.log(`Error occured: ${error.stack}`);
        res.status(500);
        res.send("500 | Sorry, our application is taking a nap!");
    },
    pageNotFoundError: (req, res) => {
        res.status(404);
        res.send("404");
    }
};
