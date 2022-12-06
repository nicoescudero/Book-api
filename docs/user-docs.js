/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - userName
 *                  - email
 *                  - password
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: id generated automatically
 *                  userName:
 *                      type: string
 *                      description: nickname of user
 *                  email:
 *                      type: string
 *                      description: email of user
 *                  password:
 *                      type: string
 *                      description: password of user
 *              example:
 *                  id: 1
 *                  userName: User10
 *                  email: user@example.com
 *                  password: $2a$10$YoIyUHeciH67iIf/lewjXOHVmOSAEMbywYSOYMM2nrxbqMEWCUf2C
 *
 *          UserRequirements:
 *                      type: object
 *                      properties:
 *                          userName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          userName: user1
 *                          email: user@example.com
 *                          password: YourPassword
 *
 *      parameters:
 *          userId:
 *              in: path
 *              name: userId
 *              required: true
 *              description: id of user
 *              schema:
 *                  type: string
 *      responses:
 *          InvalidForm:
 *           description: Error, Unprocessable Entity
 *           type: object
 *           content:
 *            application/json:
 *             example:
 *              errors: []
 *          UserNotFound:
 *           description: User not found
 *           type: object
 *           content:
 *            application/json:
 *              example:
 *                  message: User not found
 *          BadRequest:
 *           description: Some aspect of the request is invalid
 *           type: object
 *           content:
 *            application/json:
 *              example:
 *                  message: Bad Request
 *          Success:
 *           description: Successful Operation
 *           type: object
 *           content:
 *            application/json:
 *              example:
 *                  id: 1
 *                  userName: User10
 *                  email: user@example.com
 *                  password: $2a$10$YoIyUHeciH67iIf/lewjXOHVmOSAEMbywYSOYMM2nrxbqMEWCUf2C
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Data
 */

/**
 * @swagger
 * /user:
 *  get:
 *      summary: Return a user list
 *      tags: [User]
 *      responses:
 *          200:
 *            $ref: "#components/responses/Success"
 *          404:
 *            $ref: "#components/responses/UserNotFound"
 */

/**
 * @swagger
 * /user/{userId}:
 *  get:
 *      summary: Get a user by id
 *      tags: [User]
 *      parameters:
 *          - $ref: "#components/parameters/userId"
 *      responses:
 *          200:
 *            $ref: "#components/responses/Success"
 *          404:
 *            $ref: "#components/responses/UserNotFound"
 */

/**
 * @swagger
 * /user:
 *  post:
 *      summary: Adds new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/UserRequirements"
 *      responses:
 *              201:
 *                  description: User Created
 *                  content:
 *                      application/json:
 *                         example:
 *                             message: User Created
 *              400:
 *                  $ref: "#components/responses/BadRequest"
 *              422:
 *                  $ref: "#components/responses/InvalidForm"
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: login and token creation
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                      example:
 *                          email: user@example.com
 *                          password: YourPassword
 *      responses:
 *              201:
 *                  description: Succes login & token
 *                  content:
 *                      application/json:
 *                         example:
 *                             token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2V
 *              400:
 *                $ref: "#components/responses/BadRequest"
 *              404:
 *                $ref: "#components/responses/UserNotFound"
 */

/**
 * @swagger
 * /user/{userId}:
 *  put:
 *      summary: Update user by id
 *      security:
 *       - authToken: []
 *      tags: [User]
 *      parameters:
 *          - $ref: "#components/parameters/userId"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#components/schemas/UserRequirements"
 *      responses:
 *          201:
 *              description: Successfully updated
 *              content:
 *                  application/json:
 *                     example:
 *                         Succes: User Updated
 *          400:
 *            $ref: "#components/responses/BadRequest"
 *          401:
 *            $ref: "#components/responses/Unauthorized"
 *          404:
 *            $ref: "#components/responses/UserNotFound"
 *          422:
 *            $ref: "#components/responses/InvalidForm"
 *
 */

/**
 * @swagger
 * /user/{userId}:
 *  delete:
 *      summary: Delete a user by id
 *      tags: [User]
 *      security:
 *       - authToken: []
 *      parameters:
 *          - $ref: "#components/parameters/userId"
 *      responses:
 *          200:
 *              description: User Deleted
 *              content:
 *                  application/json:
 *                     example:
 *                         Succes: User Deleted
 *          401:
 *            $ref: "#components/responses/Unauthorized"
 *          404:
 *            $ref: "#components/responses/UserNotFound"
 */
