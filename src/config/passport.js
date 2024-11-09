const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const prisma = require("./database");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      let user = await prisma.usuario.findUnique({ where: { email } });

      if (!user) {
        user = await prisma.usuario.create({
          data: {
            email,
            nome: profile.displayName,
            senha: "",
          },
        });
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.usuario.findUnique({ where: { id } });
  done(null, user);
});

module.exports = passport;
