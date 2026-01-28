/**
 * @swagger
 * /users/search:
 *   get:
 *     tags:
 *       - User
 *     summary: Search user by username or fullname
 *     description: |
 *       Endpoint untuk mencari user berdasarkan **username** atau **fullname**.
 *       - Jika **keyword tidak dikirim**, API akan mengembalikan daftar user (maksimal 10 data) selain user yang sedang login.
 *       - Jika **keyword dikirim**, pencarian dilakukan secara **case-insensitive** pada field `username` atau `fullname`.
 *       - Response juga menyertakan status apakah user tersebut sudah di-follow oleh user login (`isFollowing`).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: |
 *           Kata kunci pencarian untuk username atau fullname.
 *           Jika dikosongkan, API akan mengembalikan user secara default.
 *         example: john
 *     responses:
 *       200:
 *         description: Berhasil mengambil data user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User found
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 3
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                       fullname:
 *                         type: string
 *                         example: John Doe
 *                       bio:
 *                         type: string
 *                         nullable: true
 *                         example: Frontend Developer
 *                       photo_profile:
 *                         type: string
 *                         nullable: true
 *                         example: https://example.com/avatar.jpg
 *                       isFollowing:
 *                         type: boolean
 *                         description: Menandakan apakah user login sudah mem-follow user ini
 *                         example: true
 *       401:
 *         description: Unauthorized (token tidak valid atau tidak dikirim)
 *       500:
 *         description: Gagal mengambil data user
 */
