/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user
 *     description: |
 *       Endpoint untuk autentikasi user menggunakan email dan password.
 *       Jika berhasil:
 *       - Server akan mengembalikan data user
 *       - Server akan menyimpan JWT sebagai httpOnly cookie bernama `token`
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@mail.com
 *
 *               password:
 *                 type: string
 *                 format: password
 *                 example: P@ssw0rd!
 *
 *     responses:
 *       200:
 *         description: Login berhasil
 *         headers:
 *           Set-Cookie:
 *             description: JWT token disimpan sebagai httpOnly cookie
 *             schema:
 *               type: string
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
 *                   example: Login successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: opikdev
 *                     name:
 *                       type: string
 *                       example: Opik Maulana
 *                     email:
 *                       type: string
 *                       example: user@mail.com
 *                     avatar:
 *                       type: string
 *                       nullable: true
 *                       example: https://cdn.example.com/avatar.png
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *       400:
 *         description: Validasi gagal
 *         content:
 *           application/json:
 *             example:
 *               code: 400
 *               success: false
 *               message:
 *                 email: Email tidak valid
 *                 password: Password wajib diisi
 *
 *       401:
 *         description: Email atau password salah
 *         content:
 *           application/json:
 *             example:
 *               code: 401
 *               status: error
 *               message: Email atau password salah.
 *
 *       500:
 *         description: Server error
 */
