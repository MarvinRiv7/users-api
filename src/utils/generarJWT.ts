import jwt from 'jsonwebtoken';

export const generarJWT = (uid: string = ''): Promise<string> => {
  return new Promise<string>(
    (resolve: (value: string) => void, reject: (reason?: any) => void) => {
      const payload = { uid };
      jwt.sign(
        payload,
        process.env.SECRETKEYJWT ?? '',
        {
          expiresIn: '24h',
        },
        (err, token) => {
          if (err) {
            console.log(err);
            reject('No se pudo generar el JWT');
          } else {
            resolve(token ?? ' ');
          }
        },
      );
    },
  );
};
