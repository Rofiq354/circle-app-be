/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register user baru
 *     description: |
 *       Endpoint untuk membuat akun user baru.
 *       Jika berhasil, server akan:
 *       - Menyimpan user ke database
 *       - Mengembalikan data user
 *       - Meng-set cookie JWT bernama `token` (httpOnly)
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - fullname
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 example: opikdev
 *
 *               fullname:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: Opik Maulana
 *
 *               email:
 *                 type: string
 *                 format: email
 *                 example: opik@mail.com
 *
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 pattern: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).+$
 *                 description: |
 *                   Password minimal 8 karakter dan harus mengandung:
 *                   huruf besar, huruf kecil, angka, dan simbol.
 *                 example: P@ssw0rd!
 *
 *     responses:
 *       201:
 *         description: Registrasi berhasil
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
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Registrasi berhasil. Akun berhasil dibuat.
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
 *                       example: opik@mail.com
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *       400:
 *         description: Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 code: 400
 *                 success: false
 *                 message:
 *                   email: '"email" must be a valid email'
 *                   username: '"username" length must be at least 3 characters long'
 *                   fullname: '"fullname" length must be at least 3 characters long'
 *                   password: '"Password" harus mengandung huruf besar, huruf kecil, angka, dan simbol'
 *
 *       422:
 *         description: Email sudah terdaftar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 code: 422
 *                 status: error
 *                 message: Email sudah terdaftar.
 *
 *       500:
 *         description: Server error
 */
