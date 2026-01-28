/**
 * @openapi
 * /user/{userId}/threads:
 *   get:
 *     tags:
 *       - Threads
 *     summary: Get threads by user ID
 *     description: Mengambil semua thread yang dibuat oleh user tertentu
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: ID user
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
 *                     threads:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 10
 *                           content:
 *                             type: string
 *                             example: Thread buatan user ini
 *                           images:
 *                             type: string
 *                             nullable: true
 *                             example: https://example.com/image.jpg
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-01-21T10:00:00Z
 *                           likes:
 *                             type: number
 *                             example: 5
 *                           reply:
 *                             type: number
 *                             example: 2
 *                           isLiked:
 *                             type: boolean
 *                             example: false
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: number
 *                                 example: 2
 *                               username:
 *                                 type: string
 *                                 example: johndoe
 *                               fullname:
 *                                 type: string
 *                                 example: John Doe
 *                               photo_profile:
 *                                 type: string
 *                                 nullable: true
 *                                 example: https://example.com/avatar.jpg
 *       404:
 *         description: Data Threads Not Found
 *       500:
 *         description: Internal Server Error
 */
