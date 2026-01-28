/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users or suggested users
 *     description: |
 *       Endpoint untuk mengambil daftar user selain user yang sedang login.
 *       Mendukung pagination dan filter tipe data:
 *       - **all** → semua user (kecuali diri sendiri)
 *       - **suggested** → user yang belum di-follow oleh user login
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Nomor halaman (pagination)
 *         example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Jumlah data per halaman
 *         example: 20
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [all, suggested]
 *           default: all
 *         description: |
 *           Tipe data user:
 *           - **all**: semua user kecuali user login
 *           - **suggested**: user yang belum di-follow oleh user login
 *         example: suggested
 *     responses:
 *       200:
 *         description: Berhasil mengambil data user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success get all user
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                       fullname:
 *                         type: string
 *                         example: John Doe
 *                       photo_profile:
 *                         type: string
 *                         nullable: true
 *                         example: https://example.com/avatar.jpg
 *                       isFollowed:
 *                         type: boolean
 *                         description: Menandakan apakah user login sudah mem-follow user ini
 *                         example: false
 *       401:
 *         description: Unauthorized (token tidak valid atau tidak dikirim)
 *       500:
 *         description: Internal server error
 */
