/**
 * @openapi
 * /reply:
 *   post:
 *     tags:
 *       - Replies
 *     summary: Create reply by thread ID
 *     description: Membuat reply pada thread tertentu dengan konten teks dan opsional gambar
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: thread_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID thread yang akan direply
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Ini adalah reply pertama
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Gambar reply (opsional)
 *     responses:
 *       200:
 *         description: Reply berhasil diposting
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
 *                   example: Reply berhasil diposting.
 *                 data:
 *                   type: object
 *                   properties:
 *                     tweet:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 15
 *                         user_id:
 *                           type: number
 *                           example: 3
 *                         thread_id:
 *                           type: number
 *                           example: 1
 *                         content:
 *                           type: string
 *                           example: Ini reply saya
 *                         image_url:
 *                           type: string
 *                           nullable: true
 *                           example: https://example.com/public/uploads/reply.jpg
 *                         timestamp:
 *                           type: string
 *                           format: date-time
 *                           example: 2026-01-21T11:30:00Z
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Thread not found
 *       500:
 *         description: Invalid thread content
 */
