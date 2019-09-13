export default function (username: string): boolean {
  const re = new RegExp('^[A-Za-z0-9_]{3,254}$');
  return re.test(username);;
};
