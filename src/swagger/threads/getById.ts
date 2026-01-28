/**
 * @openapi
 * /thread/{threadId}:
 *   get:
 *     tags:
 *       - Threads
 *     summary: Get thread by ID
 *     description: Mengambil detail thread berdasarkan ID
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID thread
 *     responses:
 *       200:
 *         description: Get Data Thread Successfully
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
 *                 message:
 *                   type: string
 *                   example: Get Data Thread Successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: Ini adalah detail thread
 *                     image:
 *                       type: string
 *                       nullable: true
 *                       example: https://example.com/image.jpg
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-01-21T08:30:00Z
 *                     likes:
 *                       type: number
 *                       example: 10
 *                     replies:
 *                       type: number
 *                       example: 5
 *                     user:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: number
 *                           example: 3
 *                         username:
 *                           type: string
 *                           example: johndoe
 *                         name:
 *                           type: string
 *                           example: John Doe
 *                         profile_picture:
 *                           type: string
 *                           nullable: true
 *                           example: https://example.com/avatar.jpg
 *       404:
 *         description: Data Thread Not Found
 *       500:
 *         description: Internal Server Error
 */
