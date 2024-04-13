import express from "express";
import * as animalsController from "../controller/animalsController.js";

const router = express.Router();

/**
 * @swagger
 * tags: 
 *   - name: Animais
 *     description: Rotas para realizar operações na tabela de animais
 * 
 * /animals/{nome}:
 *   get:
 *     tags: 
 *       - Animais
 *     description: Retorna as informações pelo nome do animal
 *     summary: Retorna as informações pelo nome do animal
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do animal
 *         required: true
 *     responses:
 *       200:
 *         description: Retorna as informações do animal
 */
router.get("/:nome", animalsController.getAnimalByName);

/**
 * @swagger
 * /animals/:
 *  post:
 *   summary: Cria um novo animal
 *   tags: [Animais]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Animal'
 *   responses:
 *    201:
 *     description: Animal criado
 *    404:
 *     description: Nome do animal já existe
 */
router.post("/", animalsController.createNewAnimal);

/**
 * @swagger
 * /animals/{nome}:
 *  put:
 *   summary: Atualiza as informaçes daquele animal específico
 *   tags: [Animais]
 *   parameters:
 *    - in: path
 *      name: nome
 *      schema:
 *       type: string
 *      description: Nome do animal
 *      required: true
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Animal'
 *   responses:
 *    200:
 *     description: Animal atualizado
 */
router.put("/:nome", animalsController.updateAnimalByName);

/**
 * @swagger
 * /animals/{nome}:
 *  delete:
 *   summary: Deleta um animal
 *   tags: [Animais]
 *  parameters:
 *    - in: path
 *      name: nome
 *      required: true
 *      schema:
 *       type: string
 *      description: Nome do animal
 *  responses:
 *   200:
 *    description: Animal deletado
 */
router.delete("/:nome", animalsController.deleteAnimalByName);

export default router;
