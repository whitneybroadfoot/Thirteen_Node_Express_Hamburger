var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update(
    {
      devoured: true
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.post("/api/burgers", function(req, res) {
  console.log(req.body);
  burger.create(["burger_name"], [req.body.burger_name], function(result) {
    // res.json({ id: result.insertId });
    res.redirect("/");
  });
});

router.delete("/api/burgers", function(req, res) {
  burger.delete(function(data) {
    res.json(data);
  });
});

module.exports = router;