/**
 * @swagger
 * components:
 *  securitySchemes:
 *   authToken:
 *    type: http
 *    scheme: bearer
 *    bearerFormat: JWT
 *  schemas:
 *   Book:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *      description: id generated automatically
 *     name:
 *      type: string
 *      description: name of book
 *     author:
 *      type: string
 *      description: name of the book's author
 *    example:
 *      id: 1
 *      title: "Don Quijote de la Mancha"
 *      author: "Miguel de Cervantes"
 *   BookRequirements:
 *    type: object
 *    example:
 *      name: ""
 *      author: ""
 *  parameters:
 *   bookId:
 *    in: path
 *    name: bookId
 *    required: true
 *    description: id of book
 *    schema:
 *     type: integer
 *     example: 9
 *   bookName:
 *    in: path
 *    name: bookName
 *    required: true
 *    description: name of the book
 *    schema:
 *     type: string
 *   bookAuthor:
 *    in: path
 *    name: bookAuthor
 *    required: true
 *    description: name of the author
 *    schema:
 *     type: string
 *  responses:
 *   BookFound:
 *    description: Succes Operation
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#components/schemas/Book"
 *   BookNotFound:
 *    description: Not found books
 *    content:
 *     application/json:
 *      schema:
 *         $ref: "#components/schemas/Book"
 *   Unauthorized:
 *    description: Unauthorized Error
 *    content:
 *     application/json:
 *        example:
 *         message: Token not provided
 * tags:
 *  name: Book
 *  description: Book Data, you need a token
 */

/**
 * @swagger
 * /book:
 *  get:
 *   security:
 *    - authToken: []
 *   summary: Get list of books
 *   tags: [Book]
 *   responses:
 *    200:
 *      $ref: "#components/responses/BookFound"
 *    401:
 *      $ref: "#components/responses/Unauthorized"
 *    404:
 *      $ref: "#components/responses/BookNotFound"
 */

/**
 * @swagger
 * /book/{bookId}:
 *  get:
 *   summary: Get a book by Id
 *   tags: [Book]
 *   parameters:
 *    - $ref: "#components/parameters/bookId"
 *   security:
 *    - authToken: []
 *   responses:
 *    200:
 *      $ref: "#components/responses/BookFound"
 *    401:
 *      $ref: "#components/responses/Unauthorized"
 *    404:
 *      $ref: "#components/responses/BookNotFound"
 */

/**
 * @swagger
 * /book/name/{bookName}:
 *  get:
 *   summary: Get a book by Name
 *   tags: [Book]
 *   parameters:
 *    - $ref: "#components/parameters/bookName"
 *   security:
 *    - authToken: []
 *   responses:
 *    200:
 *      $ref: "#components/responses/BookFound"
 *    401:
 *      $ref: "#components/responses/Unauthorized"
 *    404:
 *      $ref: "#components/responses/BookNotFound"
 */

/**
 * @swagger
 * /book/author/{bookAuthor}:
 *  get:
 *   summary: Get books by name of the author
 *   tags: [Book]
 *   parameters:
 *    - $ref: "#components/parameters/bookAuthor"
 *   security:
 *    - authToken: []
 *   responses:
 *    200:
 *      $ref: "#components/responses/BookFound"
 *    401:
 *      $ref: "#components/responses/Unauthorized"
 *    404:
 *      $ref: "#components/responses/BookNotFound"
 */

/**
 * @swagger
 * /book/:
 *  post:
 *   summary: Add a book
 *   tags: [Book]
 *   security:
 *    - authToken: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#components/schemas/BookRequirements"
 *   responses:
 *    201:
 *      description: Added book
 *      content:
 *       application/json:
 *         example:
 *          message: Added book
 *    400:
 *      $ref: "#components/responses/BadRequest"
 *    401:
 *      $ref: "#components/responses/Unauthorized"
 *    422:
 *      $ref: "#components/responses/InvalidForm"
 */

/**
 *  @swagger
 * /book/{bookId}:
 *  put:
 *   summary: Update a book
 *   tags: [Book]
 *   security:
 *    - authToken: []
 *   parameters:
 *    - $ref: "#components/parameters/bookId"
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#components/schemas/BookRequirements"
 *   responses:
 *    201:
 *      description: Updated book
 *      content:
 *       application/json:
 *         example:
 *          message: Updated book
 *    400:
 *      $ref: "#components/responses/BadRequest"
 *    401:
 *      $ref: "#components/responses/Unauthorized"
 *    422:
 *      $ref: "#components/responses/InvalidForm"
 */

/**
 * @swagger
 * /book/{bookId}:
 *  delete:
 *   summary: Delete a book
 *   tags: [Book]
 *   security:
 *    - authToken: []
 *   parameters:
 *    - $ref: "#components/parameters/bookId"
 *   responses:
 *    200:
 *      description:
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          example:
 *           message: Book deleted
 *    401:
 *      $ref: "#components/responses/Unauthorized"
 *    404:
 *      $ref: "#components/responses/BookNotFound"
 */
