/**
 * @swagger
 * /profile:
 *   patch:
 *     tags:
 *       - User Profile
 *     summary: Update profile user yang sedang login
 *     description: |
 *       Endpoint untuk **mengupdate data profile user yang sedang login**.
 *
 *       Endpoint ini mendukung update **sebagian data (partial update)**,
 *       sehingga hanya field yang dikirim saja yang akan diubah.
 *
 *       Field yang dapat diupdate:
 *       - name (fullname)
 *       - username
 *       - bio
 *       - photo_profile (upload file)
 *       - cover_photo (upload file)
 *
 *       Upload file menggunakan **multipart/form-data**.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nama lengkap user
 *                 example: Ainur Rofiq
 *               username:
 *                 type: string
 *                 description: Username baru user
 *                 example: ainurdev
 *               bio:
 *                 type: string
 *                 description: Bio singkat user
 *                 example: Fullstack Developer
 *               photo_profile:
 *                 type: string
 *                 format: binary
 *                 description: Foto profile user
 *               cover_photo:
 *                 type: string
 *                 format: binary
 *                 description: Cover photo user
 *     responses:
 *       200:
 *         description: Profile berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile berhasil diupdate.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: ainurdev
 *                     name:
 *                       type: string
 *                       example: Ainur Rofiq
 *                     photo_profile:
 *                       type: string
 *                       example: https://api.example.com/public/uploads/profile.jpg
 *                     cover_photo:
 *                       type: string
 *                       example: https://api.example.com/public/uploads/cover.jpg
 *                     bio:
 *                       type: string
 *                       example: Fullstack Developer
 *                     follower_count:
 *                       type: integer
 *                       example: 120
 *                     following_count:
 *                       type: integer
 *                       example: 80
 *                     likes:
 *                       type: integer
 *                       example: 45
 *                     threads:
 *                       type: integer
 *                       example: 12
 *       401:
 *         description: Unauthorized (token tidak valid atau tidak dikirim)
 *       500:
 *         description: Gagal update profile
 */
