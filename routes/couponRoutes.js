const express = require("express");
const router = express.Router();

const {
  authUser,
  authorizedPermission,
} = require("../middleware/authentication");

const {
  addCoupon,
  deleteCoupon,
  showCoupons,
  validCoupon,
} = require("../controllers/couponController");

router.post("/add", authUser, authorizedPermission("admin"), addCoupon);
router.delete("/delete", authUser, authorizedPermission("admin"), deleteCoupon);
router.get("/showAll", authUser, authorizedPermission("admin"), showCoupons);
router.get("/:code", authUser, validCoupon);

module.exports = router;
