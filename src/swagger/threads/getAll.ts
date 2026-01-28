/**
 * @openapi
 * /thread:
 *   get:
 *     tags:
 *       - Threads
 *     summary: Get all threads
 *     description: Mengambil daftar thread dengan pagination. Data bersifat personalized berdasarkan user login (isLiked).
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Jumlah data per halaman (default 50)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Nomor halaman (mulai dari 1)
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
 *                             example: 1
 *                           content:
 *                             type: string
 *                             example: Ini adalah contoh thread
 *                           images:
 *                             type: string
 *                             nullable: true
 *                             example: https://example.com/image.jpg
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-01-20T10:00:00Z
 *                           likes:
 *                             type: number
 *                             example: 12
 *                           reply:
 *                             type: number
 *                             example: 3
 *                           isLiked:
 *                             type: boolean
 *                             example: true
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Data Threads Not Found
 */
