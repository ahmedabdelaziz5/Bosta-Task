const path = require("path");

// server routes
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");
const bookRoutes = require("./book.routes");
const libraryRoutes = require("./LibraryTransaction.routes");

module.exports = (app) => {
  app.get("/", (req, res) => {
    if (process.env.NODE_ENV === "development") {
      return res.status(200).json({
        version: "1.0.0",
        status: "OK",
        message: "Server is up",
      });
    }
    else {
      return res.sendFile(
        path.join(__dirname, "..", "public", "notFound.html")
      );
    }
  });

  app.use('/api/user', userRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/book', bookRoutes);
  app.use('/api/library', libraryRoutes);
};