import express from "express";
import * as gestacaoController from "../controller/gestacaoController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Gestacao
 *    description: Rotas para realizar operaçes na tabela de gestaçoes
 */

/**
 * @swagger
 * /gestacao/{nome_animal}:
 *  get:
 *   summary: Retorna as informaçes daquele animal específico]
 *   tags: [Gestacao]
 *   parameters: 
 *    - in: path
 *      name: nome_animal
 *      required: true
 *      schema:
 *          type: string
 *      description: nome do animal específico
 *   responses:
 *      200:
 *          description: Gestacao encontrada
 *          content: 
 *              application/json:
 *               schema: 
 *                  $ref: '#components/schemas/Gestacao'
 */
router.get("/:nome_animal", gestacaoController.getGestacaoByAnimal);

/**
 * @swagger
 * /gestacao/:
 *   post:
 *     summary: Cria uma gestação
 *     tags: [Gestacao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gestacao'
 *     responses:
 *       201:
 *         description: Gestação criada
 */

router.post("/", gestacaoController.createGestacao);

/**
 * @swagger
 * /gestacao/{nome_animal}:
 *  put:
 *   summary: Atualiza as informaçes daquele animal específico
 *   tags: [Gestacao]
 *   parameters: 
 *    - in: path
 *      name: nome_animal
 *      required: true
 *      schema:
 *          type: string
 *      description: nome do animal específico
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#components/schemas/Gestacao'
 *   responses:
 *      200:
 *          description: Gestacao encontrada
 *          content: 
 *              application/json:
 *               schema: 
 *                  $ref: '#components/schemas/Gestacao'
 */
router.put("/:nome_animal", gestacaoController.updateGestacao);

/**
 * @swagger
 * /gestacao/{nome_animal}:
 *  delete:
 *   summary: Deleta uma gestação
 *   tags: [Gestacao]
 *  responses:
 *      200:
 *          description: Gestacao deletada
 */
router.delete("/:nome_animal", gestacaoController.deleteGestacao);

export default router;
