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
 *      title: 'Don Quijote de la Mancha'
 *      author: 'Miguel de Cervantes'
 *      description: 'Don Quijote es una novela escrita por el español Miguel de Cervantes Saavedra'
 *      chapters: 52
 *      editorial: 'Libreria de José G. Fernández'
 *      year: 1605
 *  parameters:
 *   id:
 *    in: path
 *    name: id
 *    required: true
 *    description: book id
 *    schema:
 *     type: integer
 *     example: 9
 *   title:
 *    in: path
 *    name: title
 *    required: true
 *    description: book name
 *    schema:
 *     type: string
 *   author:
 *    in: path
 *    name: author
 *    required: true
 *    description: author name
 *    schema:
 *     type: string
 *  responses:
 *   200Book:
 *    description: Books Obtained
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#components/schemas/Book"
 *   403:
 *    description: Request not processed, because it does not have permissions.
 *    content:
 *     application/json:
 *      schema:
 *        example:
 *          message: '[You do not have permission to make the request]'
 *   404Book:
 *    description: Book Not Found
 *    content:
 *      application/json:
 *        schema:
 *          example:
 *            message: '[Error getting Book] - [Book - GET]'
 *   409Book:
 *    description: Error creating Book. This title already exists.
 *    content:
 *     application/json:
 *      schema:
 *        example:
 *          message: '[This title already exists]'
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
 *   summary: Get Books
 *   tags: [Book]
 *   responses:
 *    200:
 *      $ref: "#components/responses/200Book"
 *    401:
 *      $ref: "#components/responses/401"
 *    404:
 *      $ref: "#components/responses/404Book"
 *    500:
 *      $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /book/{id}:
 *  get:
 *   summary: Get a book by id
 *   tags: [Book]
 *   parameters:
 *    - $ref: "#components/parameters/id"
 *   security:
 *    - authToken: []
 *   responses:
 *    200:
 *      $ref: "#components/responses/200Book"
 *    401:
 *      $ref: "#components/responses/401"
 *    404:
 *      $ref: "#components/responses/404Book"
 *    422:
 *      $ref: "#components/responses/422"
 *    500:
 *      $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /book/title/{title}:
 *  get:
 *   summary: Get a book by title
 *   tags: [Book]
 *   parameters:
 *    - $ref: "#components/parameters/title"
 *   security:
 *    - authToken: []
 *   responses:
 *    200:
 *      $ref: "#components/responses/200Book"
 *    401:
 *      $ref: "#components/responses/401"
 *    404:
 *      $ref: "#components/responses/404Book"
 *    422:
 *      $ref: "#components/responses/422"
 *    500:
 *      $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /book/author/{author}:
 *  get:
 *   summary: Get books by author name
 *   tags: [Book]
 *   parameters:
 *    - $ref: "#components/parameters/author"
 *   security:
 *    - authToken: []
 *   responses:
 *    200:
 *      $ref: "#components/responses/200Book"
 *    401:
 *      $ref: "#components/responses/401"
 *    404:
 *      $ref: "#components/responses/404Book"
 *    422:
 *      $ref: "#components/responses/422"
 *    500:
 *      $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /book/:
 *  post:
 *   summary: Create or register a book
 *   tags: [Book]
 *   security:
 *    - authToken: []
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        example:
 *          title: ''
 *          author: ''
 *          description: ''
 *          chapters: ''
 *          editorial: ''
 *          year: ''
 *   responses:
 *    201:
 *      description: Book successfully created
 *      content:
 *       application/json:
 *         schema:
 *          $ref: "#components/schemas/Book"
 *    400:
 *        $ref: "#components/responses/400"
 *    401:
 *      $ref: "#components/responses/401"
 *    403:
 *      $ref: "#components/responses/403"
 *    409:
 *      $ref: "#components/responses/409Book"
 *    422:
 *      $ref: "#components/responses/422"
 *    500:
 *      $ref: "#components/responses/500"
 */

/**
 *  @swagger
 * /book/{id}:
 *  put:
 *   summary: Update a book
 *   tags: [Book]
 *   security:
 *    - authToken: []
 *   parameters:
 *    - $ref: "#components/parameters/id"
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *        example:
 *          title: ''
 *          author: ''
 *          description: ''
 *          chapters: ''
 *          editorial: ''
 *          year: ''
 *   responses:
 *    204:
 *      $ref: "#components/responses/204"
 *    400:
 *        $ref: "#components/responses/400"
 *    401:
 *      $ref: "#components/responses/401"
 *    403:
 *      $ref: "#components/responses/403"
 *    404:
 *      $ref: "#components/responses/404Book"
 *    409:
 *      $ref: "#components/responses/409Book"
 *    422:
 *      $ref: "#components/responses/422"
 *    500:
 *      $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /book/{id}:
 *  delete:
 *   summary: Delete a book
 *   tags: [Book]
 *   security:
 *    - authToken: []
 *   parameters:
 *    - $ref: "#components/parameters/id"
 *   responses:
 *    204:
 *      $ref: "#components/responses/204"
 *    401:
 *      $ref: "#components/responses/401"
 *    403:
 *      $ref: "#components/responses/403"
 *    404:
 *      $ref: "#components/responses/404Book"
 *    422:
 *      $ref: "#components/responses/422"
 *    500:
 *      $ref: "#components/responses/500"
 */
