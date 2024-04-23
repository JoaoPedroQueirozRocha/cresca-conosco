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
 * /gestacao/{animal_id}:
 *  get:
 *   summary: Retorna as informações daquele animal específico]
 *   tags: [Gestacao]
 *   parameters: 
 *    - in: path
 *      name: animal_id
 *      required: true
 *      schema:
 *          type: string
 *      description: id do animal específico
 *   responses:
 *      200:
 *          description: Gestacao encontrada
 *          content: 
 *              application/json:
 *               schema: 
 *                  $ref: '#components/schemas/Gestacao'
 */
router.get("/:animal_id", gestacaoController.getGestacaoById);

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
 * /gestacao/{animal_id}:
 *  put:
 *   summary: Atualiza as informações daquele animal específico
 *   tags: [Gestacao]
 *   parameters: 
 *    - in: path
 *      name: animal_id
 *      required: true
 *      schema:
 *          type: animal_id
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
router.put("/:id", gestacaoController.updateGestacao);

/**
 * @swagger
 * /gestacao/{animal_id}:
 *  delete:
 *   summary: Deleta uma gestação
 *   tags: [Gestacao]
 *   parameters: 
 *    - in: path
 *      name: animal_id
 *      required: true
 *      schema:
 *          type: string
 *      description: id do animal específico
 *  responses:
 *      200:
 *          description: Gestacao deletada
 */
router.delete("/:nome_animal", gestacaoController.deleteGestacao);

export default router;
