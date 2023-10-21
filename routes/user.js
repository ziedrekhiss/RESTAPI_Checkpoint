const express = require ("express")
const router = express.Router()
const {
    createUser,
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    connectUser,
} = require ("../controllers/userControllers.js")
const { uservalidator, validate } = require("../middlewares/validators");
const protect = require ("../middlewares/authenticator.js")

router.post("/add",uservalidator, validate, createUser);
router.get("/all",protect ,getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:_id", updateUser);
router.post("/log", connectUser);

module.exports = router;