import express from 'express';
import * as gadoController from '../controller/gadoController.js'

const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Gado
 *    description: Rotas para realizar pesquisas nas gestaçes
 */

/**
 * @swagger
 * /gado:
 *  get:
 *      tags: [Gado]
 *      description: Retorna todos os gados
 */
router.get('/', gadoController.getAll);

/**
 * @swagger
 * /gado/base:
 *  get:
 *   tags: [Gado]
 *   description: Retorna as informaçoes básicas do gado
 */
router.get('/base', gadoController.getBaseData);

/**
 * @swagger
 * /gado/month:
 *  get:
 *   tags: [Gado]
 *   summary: Retorna as informaçoes de todos os animais com previsão de parto para o mês e ano especificados
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        month:
 *         type: string
 *        year:
 *         type: string
 *   responses:
 *    '200':
 *     description: Retorna as informaçoes de todos os animais com previsão de parto para o mês e ano especificados
 */
router.get('/month', gadoController.getByMonth);

/**
 * @swagger
 * /gado/status/{status}:
 *  get:
 *   tags: [Gado]
 *   summary: Retorna as informaçoes do gado por status
 *   parameters:
 *    - in: path
 *     name: status
 *     required: true
 *     schema:
 *      type: string
 *   responses:
 *    '200':
 *     description: Retorna as informaçoes de todas as gestações com aquele status
 */
router.get('/status/:status', gadoController.getByStatus);

/**
 * @swagger
 * /gado/animal/{animal}:
 *  get:
 *   tags: [Gado]
 *   summary: Retorna as informações daquele animal específico
 *   parameters:
 *    - in: path
 *     name: animal
 *     required: true
 *     schema:
 *      type: string
 *   responses:
 *    '200':
 *     description: Retorna as informaçoes do gado por animal
 */
router.get('/animal/:animal', gadoController.getByAnimal);

/**
 * @swagger
 * /gado/lactantes:
 *  get:
 *   tags: [Gado]
 *   description: Retorna as informaçes gos gados que estão lactantes
 */
router.get('/lactantes', gadoController.getLactantes);

export default router;

