module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 5000),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "9e57c8e37b292ad8ee72ef2388ea56b8"),
    },
  },
  cron: {
    enabled: true,
  },
});
