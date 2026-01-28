/**
 * @openapi
 * /profile:
 *   get:
 *     tags:
 *       - User Profile
 *     summary: Get logged-in user profile
 *     description: Mengambil data profil user yang sedang login
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil data my profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Berhasil mengambil data my profile.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 3
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     photo_profile:
 *                       type: string
 *                       nullable: true
 *                       example: https://example.com/avatar.jpg
 *                     cover_photo:
 *                       type: string
 *                       nullable: true
 *                       example: https://example.com/cover.jpg
 *                     bio:
 *                       type: string
 *                       nullable: true
 *                       example: Fullstack developer
 *                     follower_count:
 *                       type: number
 *                       example: 120
 *                     following_count:
 *                       type: number
 *                       example: 80
 *                     likes:
 *                       type: number
 *                       example: 45
 *                     threads_count:
 *                       type: number
 *                       example: 12
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User Not Found
 *       500:
 *         description: Internal Server Error
 */
