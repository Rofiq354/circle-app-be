/**
 * @swagger
 * /follows/{followingId}:
 *   post:
 *     tags:
 *       - Follow
 *     summary: Follow or unfollow a user
 *     description: |
 *       Endpoint untuk **toggle follow** user lain.
 *
 *       Mekanisme:
 *       - Jika user **belum mem-follow** target → maka akan dilakukan **FOLLOW**
 *       - Jika user **sudah mem-follow** target → maka akan dilakukan **UNFOLLOW**
 *
 *       Endpoint ini bersifat **toggle**, sehingga tidak perlu endpoint terpisah
 *       antara follow dan unfollow.
 *
 *       Catatan penting:
 *       - User **tidak diperbolehkan** mem-follow dirinya sendiri
 *       - Status follow terakhir akan dikembalikan dalam response (`isFollowed`)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user yang ingin di-follow atau di-unfollow
 *         example: 7
 *     responses:
 *       200:
 *         description: Berhasil follow atau unfollow user
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
 *                   example: Berhasil follow user.
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       description: ID user target
 *                       example: 7
 *                     isFollowed:
 *                       type: boolean
 *                       description: |
 *                         Status follow setelah aksi dilakukan:
 *                         - true → berhasil follow
 *                         - false → berhasil unfollow
 *                       example: true
 *       400:
 *         description: User mencoba mem-follow dirinya sendiri
 *         content:
 *           application/json:
 *             example:
 *               message: Anda tidak boleh follow diri sendiri
 *       401:
 *         description: Unauthorized (token tidak valid atau tidak dikirim)
 *       500:
 *         description: Gagal melakukan follow/unfollow user
 */
