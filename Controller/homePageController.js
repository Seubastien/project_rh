exports.displayHomePage = (req, res) => {
    try {

        res.render("./home/index.html.twig", {

        })
    } catch (error) {
        res.send(error)
    }
}