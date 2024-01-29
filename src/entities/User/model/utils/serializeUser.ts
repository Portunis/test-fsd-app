
const serializeUser = (user: { id: number, email: string, user_metadata: []}) =>
  user
    ? {
        id: user.id,
        email: user.email,
        ...user.user_metadata,
      }
    : null;

export default serializeUser;
