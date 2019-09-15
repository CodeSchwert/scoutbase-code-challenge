import * as bcrypt from 'bcrypt';

const generatePassword = async (plainTextPassword: string): Promise<string> => {
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
};

export default generatePassword;
