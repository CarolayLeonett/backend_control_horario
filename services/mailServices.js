import nodemailer from "nodemailer";

export const sendNewUserEmail = async (email, username, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "carolayleonett20@gmail.com",
        pass: "nzgz huhm jqra jfit",
      },
    });

    const mailOptions = {
      from: '"Soporte Técnico" <carolayleonett20@gmail.com>', // Nombre mostrado en el remitente
      to: email,
      subject: "¡Bienvenido al sistema! Tus credenciales de acceso",

      // Aquí está el nuevo formato HTML
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;">
            <tr style="background-color: #4CAF50; color: white; text-align: center;">
              <td style="padding: 20px;">
                <h1 style="margin: 0;">Bienvenido, ${username}!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p style="font-size: 18px;">¡Nos complace darte la bienvenida al sistema!</p>
                <p>Hemos creado una cuenta para ti. A continuación, encontrarás tus credenciales de acceso:</p>
                <div style="border: 1px solid #ddd; padding: 10px; background-color: #f9f9f9; margin-top: 15px;">
                  <p><strong>Usuario:</strong> ${username}</p>
                  <p><strong>Contraseña:</strong> ${password}</p>
                </div>
                <p style="margin-top: 20px;">
                  <strong>Importante:</strong> Por favor, recuerda cambiar tu contraseña después de iniciar sesión por primera vez para proteger tu cuenta.
                </p>
                <p style="margin-top: 40px;">Saludos cordiales,<br>Equipo de Soporte Técnico</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f0f0f0; padding: 10px; text-align: center; color: #888;">
                <p style="margin: 0;">Este correo fue generado automáticamente. Por favor, no respondas a este mensaje.</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado con éxito a", email);
  } catch (error) {
    console.error("Error al enviar el correo", error);
    throw error;
  }
};
