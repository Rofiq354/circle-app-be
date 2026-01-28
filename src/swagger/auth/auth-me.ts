/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get authenticated user
 *     description: Mengambil data user yang sedang login berdasarkan token (cookie JWT)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Success get user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: ainur
 *                     email:
 *                       type: string
 *                       example: ainur@mail.com
 *                     fullname:
 *                       type: string
 *                       example: Ainur Rofiq
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
