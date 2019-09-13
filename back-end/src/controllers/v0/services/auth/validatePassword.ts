export default function (password: string): boolean {
  // accept password made up of any characters 
  // including spaces and excluding newlines
  const re = new RegExp('^.{6,254}$');

  return re.test(password);
};
