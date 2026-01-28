/**
 * @openapi
 * /like:
 *   post:
 *     tags:
 *       - Likes
 *     summary: Like or unlike thread
 *     description: Toggle like pada thread (like jika belum, unlike jika sudah)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tweet_id
 *             properties:
 *               tweet_id:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Like or unlike success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tweet liked successfully.
 *                 tweet_id:
 *                   type: number
 *                   example: 1
 *                 user_id:
 *                   type: number
 *                   example: 3
 *                 isLiked:
 *                   type: boolean
 *                   example: true
 *                 likesCount:
 *                   type: number
 *                   example: 12
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Thread not found
 *       500:
 *         description: Internal Server Error
 */
