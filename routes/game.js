const express = require('express');
const router = express.Router();
const gameController = require ("../controllers/game.controllers");
const uploadImg = require('../middlewares/uploadImg')


//endpoint que abre el form desde el nav
router.get("/addGameNav", gameController.openAddNewGame);
router.post("/addGameNav", uploadImg("games"), gameController.addNewGame);

//endpoint de editar juego
router.get('/editGame/:game_id', gameController.openEditGame);
router.post('/editGame/:game_id/:user_id', gameController.editGame);

//endpoint para borrar juego
router.get('/delTotal/:game_id/:user_id', gameController.delTotal);

module.exports = router;