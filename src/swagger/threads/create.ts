/**
 * @openapi
 * /thread:
 *   post:
 *     tags:
 *       - Threads
 *     summary: Create new thread
 *     description: Membuat thread baru dengan konten teks dan opsional gambar
 *     security:
 *       - cookieAuth: []
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
 *                 example: Ini adalah thread baru
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Gambar thread (opsional)
 *     responses:
 *       200:
 *         description: Thread berhasil diposting
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
 *                   example: Thread berhasil diposting.
 *                 data:
 *                   type: object
 *                   properties:
 *                     tweet:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "12"
 *                         user_id:
 *                           type: string
 *                           example: "3"
 *                         content:
 *                           type: string
 *                           example: Halo ini thread pertama saya
 *                         image_url:
 *                           type: string
 *                           nullable: true
 *                           example: https://example.com/public/uploads/image.jpg
 *                         timestamp:
 *                           type: string
 *                           format: date-time
 *                           example: 2026-01-21T10:20:00Z
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Invalid thread content
 */
