import bcryptjs from 'bcryptjs';


export const hashPasword = (password: string): string => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(password, salt);
}

export const comparePassword = (password: string, hash: string): boolean => {
  return bcryptjs.compareSync(password, hash);
}