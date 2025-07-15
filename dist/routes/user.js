"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({
        ok: true,
        msg: "get Api",
    });
});
router.put("/", (req, res) => {
    res.status(400).json({
        ok: true,
        msg: "put Api",
    });
});
router.post("/", (req, res) => {
    res.status(201).json({
        ok: true,
        msg: "post Api",
    });
});
router.delete("/", (req, res) => {
    res.json({
        ok: true,
        msg: "delete Api",
    });
});
router.patch("/", (req, res) => {
    res.json({
        ok: true,
        msg: "patch Api",
    });
});
exports.default = router;
//# sourceMappingURL=user.js.map