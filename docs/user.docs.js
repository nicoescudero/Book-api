/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - userName
 *          - email
 *          - password
 *        properties:
 *          id:
 *            type: integer
 *            description: id generated automatically
 *          name:
 *            type: string
 *            description:  name of user
 *          email:
 *            type: string
 *            description: email of user
 *          password:
 *            type: string
 *            description: password of user
 *          example:
 *            name: ''
 *            email: ''
 *            password: ''
 *    responses:
 *      200User:
 *        description: returns user information
 *        type: object
 *        content:
 *          application/json:
 *            example:
 *              id: 1
 *              name: John Doe
 *              email: johndoe@example.com
 *              password: $2a$10$YoIyUHeciH67iIf/lewjXOHVmOSAEMbywYSOYMM2nrxbqMEWCUf2C
 *      204:
 *        description: Successful request. Does not return content
 *      400:
 *        description: Bad Request
 *        type: object
 *        content:
 *          application/json:
 *            example:
 *              message: 'Bad Request'
 *      401User:
 *        description: invalid credentials
 *        type: object
 *        content:
 *          application/json:
 *            example:
 *              message: '[Error logging user] - [User - POST]: [Invalid Credentials]'
 *      404User:
 *        description: User not found
 *        type: object
 *        content:
 *          application/json:
 *            example:
 *              message: [User Not found]
 *      409User:
 *        description: User not found
 *        type: object
 *        content:
 *          application/json:
 *            example:
 *              message: [This email already exists]
 *      422:
 *        description: Error, Unprocessable Entity
 *        type: object
 *        content:
 *          application/json:
 *            example:
 *              errors: []
 *      500:
 *        description: Server error
 *        type: object
 *        content:
 *          application/json:
 *            example:
 *              message: Server internal error
 * tags:
 *  name: User
 *  description: User Data
 */

/**
 * @swagger
 * /user:
 *  get:
 *    summary: User Info
 *    security:
 *      - authToken: []
 *    tags: [User]
 *    responses:
 *      200:
 *        $ref: "#components/responses/200User"
 *      401:
 *        $ref: "#components/responses/401"
 *      404:
 *        $ref: "#components/responses/404User"
 */

/**
 * @swagger
 * /user/register:
 *  post:
 *    summary: Create new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              name: ''
 *              email: ''
 *              password: ''
 *    responses:
 *      201:
 *        $ref: "#components/responses/200User"
 *      400:
 *        $ref: "#components/responses/400"
 *      422:
 *        $ref: "#components/responses/422"
 *      500:
 *        $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *    summary: login and token creation
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            example:
 *              email: ''
 *              password: ''
 *    responses:
 *      200:
 *        description: Succes login & token
 *        content:
 *          application/json:
 *            example:
 *              token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2V
 *      400:
 *        $ref: "#components/responses/400"
 *      401:
 *        $ref: "#components/responses/401User"
 *      404:
 *        $ref: "#components/responses/404User"
 *      409:
 *        $ref: "#components/responses/409User"
 *      422:
 *        $ref: "#components/responses/422"
 *      500:
 *        $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /user:
 *  put:
 *    summary: Update user by id
 *    security:
 *      - authToken: []
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            example:
 *              name: ''
 *              email: ''
 *              password: ''
 *              newPassword: ''
 *    responses:
 *      204:
 *        $ref: "#components/responses/204"
 *      400:
 *        $ref: "#components/responses/400"
 *      401:
 *        $ref: "#components/responses/401"
 *      404:
 *        $ref: "#components/responses/404User"
 *      409:
 *        $ref: "#components/responses/409User"
 *      422:
 *        $ref: "#components/responses/422"
 *      500:
 *        $ref: "#components/responses/500"
 */

/**
 * @swagger
 * /user:
 *  delete:
 *    summary: Delete a user by id
 *    tags: [User]
 *    security:
 *      - authToken: []
 *    responses:
 *      204:
 *        $ref: "#components/responses/204"
 *      401:
 *        $ref: "#components/responses/401"
 *      404:
 *        $ref: "#components/responses/404User"
 */
