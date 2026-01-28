/**
 * @swagger
 * /profile/{username}:
 *   get:
 *     tags:
 *       - User Profile
 *     summary: Get user profile by username
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: johndoe
 *     responses:
 *       200:
 *         description: Success get profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success get profile
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     fullname:
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
 *                       example: Backend developer
 *                     follower_count:
 *                       type: integer
 *                       example: 120
 *                     following_count:
 *                       type: integer
 *                       example: 80
 *                     likes_count:
 *                       type: integer
 *                       example: 340
 *                     threads_count:
 *                       type: integer
 *                       example: 25
 *                     isFollowed:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: User tidak ditemukan
 */
