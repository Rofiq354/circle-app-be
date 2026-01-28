/**
 * @openapi
 * /reply:
 *   get:
 *     tags:
 *       - Replies
 *     summary: Get replies by thread ID
 *     description: Mengambil semua reply berdasarkan thread ID
 *     parameters:
 *       - in: query
 *         name: thread_id
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
 *                     replies:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 5
 *                           threadId:
 *                             type: number
 *                             example: 1
 *                           content:
 *                             type: string
 *                             example: Ini adalah reply
 *                           image:
 *                             type: string
 *                             nullable: true
 *                             example: https://example.com/reply.jpg
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-01-21T11:00:00Z
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: number
 *                                 example: 3
 *                               username:
 *                                 type: string
 *                                 example: johndoe
 *                               name:
 *                                 type: string
 *                                 example: John Doe
 *                               profile_picture:
 *                                 type: string
 *                                 nullable: true
 *                                 example: https://example.com/avatar.jpg
 *       400:
 *         description: Invalid thread_id
 *       404:
 *         description: Replies Not Found
 *       500:
 *         description: Internal Server Error
 */
