/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserProfileRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nama lengkap user
 *           example: Ainur Rofiq
 *         username:
 *           type: string
 *           description: Username user
 *           example: ainurdev
 *         bio:
 *           type: string
 *           description: Bio singkat user
 *           example: Fullstack Developer
 *         photo_profile:
 *           type: string
 *           format: binary
 *           description: Foto profile user
 *         cover_photo:
 *           type: string
 *           format: binary
 *           description: Cover photo user
 *
 *     UserProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: ainurdev
 *         name:
 *           type: string
 *           example: Ainur Rofiq
 *         photo_profile:
 *           type: string
 *           nullable: true
 *           example: https://api.example.com/public/uploads/profile.jpg
 *         cover_photo:
 *           type: string
 *           nullable: true
 *           example: https://api.example.com/public/uploads/cover.jpg
 *         bio:
 *           type: string
 *           nullable: true
 *           example: Fullstack Developer
 *         follower_count:
 *           type: integer
 *           example: 120
 *         following_count:
 *           type: integer
 *           example: 80
 *         likes:
 *           type: integer
 *           example: 45
 *         threads:
 *           type: integer
 *           example: 12
 *
 *     UpdateUserProfileResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Profile berhasil diupdate.
 *         data:
 *           $ref: '#/components/schemas/UserProfile'
 */
