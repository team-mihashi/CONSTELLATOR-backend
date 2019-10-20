import bcrypt from 'bcryptjs';

const toHash = (password: string): string => {
  return bcrypt.hashSync(password, 8);
};

export default toHash;
