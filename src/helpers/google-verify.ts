import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface GooglePayload {
  nombre: string;
  correo: string;
  img: string;
}

const googleVerify = async (token: string): Promise<GooglePayload> => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('No se pudo obtener el payload de Google');
  }

  const { name, picture, email } = payload;

  return {
    nombre: name || 'Sin nombre',
    correo: email || 'Sin correo',
    img: picture || '',
  };
};

export default googleVerify;
