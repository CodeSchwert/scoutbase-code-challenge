import * as jwt from 'jsonwebtoken';

export default function generateJWT(user: string): string {
  const signedJWT = jwt.sign({ 
    data: {
      user, 
      authenticated: true
    }
  }, 'secret', { expiresIn: '1h' });

  return signedJWT;
}
