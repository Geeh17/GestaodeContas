const express = require("express");
const router = express.Router();
const contaController = require("../controllers/contaController");

router.post("/", contaController.createConta);

router.get("/:usuarioId", contaController.getContas);

router.patch("/:id", contaController.updateContaStatus);

router.delete("/:id", contaController.deleteConta);

module.exports = router;
