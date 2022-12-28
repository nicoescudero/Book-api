/**
 * @swagger
 * components:
 *  securitySchemes:
 *   authToken:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *  schemas:
 *   UserBooks:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: id generated automatically
 *     UserId:
 *      type: integer
 *      description: User ID
 *     BookId:
 *      type: integer
 *      description: Book ID
 *    example:
 *      id: 1
 *      UserId: 2
 *      BookId: 4
 *  parameters:
 *   matchId:
 *    in: path
 *    name: matchId
 *    required: true
 *    description: match id
 *    schema:
 *     type: integer
 *     example: 1
 *   bookId:
 *    in: path
 *    name: bookId
 *    required: true
 *    description: book id
 *    schema:
 *     type: integer
 *     example: 1
 *  responses:
 *   200Match:
 *    description: Get Matchs OK
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#components/schemas/UserBooks"
 *   201Match:
 *    description: Match created
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#components/schemas/UserBooks"
 *   401:
 *    description: Unauthorized Invalid token or Missing token
 *   404Match:
 *    description: Match Not Found
 *    content:
 *     application/json:
 *      schema:
 *         $ref: "#components/schemas/UserBooks"
 * tags:
 *  name: UserBooks
 *  description: UserBooks, you need a token
 */

/**
 * @swagger
 * /match:
 *  get:
 *   security:
 *    - authToken: []
 *   summary: User Matchs
 *   tags: [UserBooks]
 *   responses:
 *    200:
 *      $ref: "#components/responses/200Match"
 *    401:
 *      $ref: "#components/responses/401"
 *    404:
 *      $ref: "#components/responses/404Match"
 *    500:
 *      $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /match:
 *  post:
 *   security:
 *    - authToken: []
 *   parameters:
 *    - $ref: "#components/parameters/bookId"
 *   summary: Create Match
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       example:
 *        BookId: 1
 *   tags: [UserBooks]
 *   responses:
 *    201:
 *      $ref: "#components/responses/201Match"
 *    401:
 *      $ref: "#components/responses/401"
 *    422:
 *      $ref: "#components/responses/422"
 *    500:
 *      $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /match:
 *  delete:
 *   security:
 *    - authToken: []
 *   parameters:
 *    - $ref: "#components/parameters/matchId"
 *   summary: Delete Match
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        example:
 *          matchId: 1
 *   tags: [UserBooks]
 *   responses:
 *    204:
 *      $ref: "#components/responses/204"
 *    401:
 *      $ref: "#components/responses/401"
 *    404:
 *      $ref: "#components/responses/404Match"
 *    422:
 *      $ref: "#components/responses/422"
 *    500:
 *      $ref: "#components/responses/500"
 */
