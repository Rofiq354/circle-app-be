/**
 * @swagger
 * /follows/{id}/{type}:
 *   get:
 *     tags:
 *       - Follow
 *     summary: Get user followers or following
 *     description: |
 *       Endpoint untuk mengambil daftar **followers** atau **following** dari seorang user.
 *
 *       - `type = following` → mengambil daftar user yang **di-follow** oleh user dengan ID tertentu
 *       - `type = followers` → mengambil daftar user yang **mem-follow** user dengan ID tertentu
 *
 *       Response akan menyertakan field `isFollowing` yang menunjukkan apakah user login
 *       saat ini sudah mem-follow masing-masing user di dalam list.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user target
 *         example: 5
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [followers, following]
 *         description: |
 *           Jenis relasi yang ingin diambil:
 *           - followers → user yang mem-follow user target
 *           - following → user yang di-follow oleh user target
 *         example: followers
 *     responses:
 *       200:
 *         description: Berhasil mengambil data followers/following
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     followers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           username:
 *                             type: string
 *                             example: janedoe
 *                           fullname:
 *                             type: string
 *                             example: Jane Doe
 *                           bio:
 *                             type: string
 *                             nullable: true
 *                             example: Backend Engineer
 *                           photo_profile:
 *                             type: string
 *                             nullable: true
 *                             example: https://example.com/avatar.jpg
 *                           isFollowing:
 *                             type: boolean
 *                             description: Menandakan apakah user login sudah mem-follow user ini
 *                             example: false
 *       400:
 *         description: Parameter type tidak dikirim atau tidak valid
 *       401:
 *         description: Unauthorized (token tidak valid atau tidak dikirim)
 *       500:
 *         description: Gagal mengambil data followers/following
 */
