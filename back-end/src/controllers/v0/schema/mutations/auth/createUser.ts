import { GraphQLNonNull, GraphQLString } from 'graphql';
import UserType from '../../types/users/user';
import { User } from '../../../../../server';
import { generatePassword, generateJWT } from '../../../services/auth';

export default {
  type: UserType,
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  async resolve(parentValue: any, args: any, context: any) {
    try {    
      const { username, password } = args;

      /**
       * TODO - check username and password for reasonable values
       */

      // @ts-ignore
      const tryUser = await User.findOne({
        where: { username }
      });

      if (!tryUser) {
        const hashedPassword = await generatePassword(password);

        // @ts-ignore
        await User.create({
          username,
          password: hashedPassword
        });

        const jwt = generateJWT(username);

        context.res.cookie('scoutbase-code-challenge', jwt, { httpOnly: true });

        return { username };
      } else {
        context.res.status(418); // or use a more appropriate error code!!
        return { username: '' };
      }
    } catch (e) {
      console.error(e);
    }
  }
};
