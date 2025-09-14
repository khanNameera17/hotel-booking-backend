const currentDateTime = require('../lib/current.date.time');
const getDateAfterDuration = require('../lib/get.date.after.duration');

const loginResponse = (res, user) => {
  const accessToken = user.getJWTToken();
  const refreshToken = user.getJWTRefreshToken();

  // options for cookie
  const options = {
    expires: new Date(Date.now() + (process.env.JWT_TOKEN_COOKIE_EXPIRES || 1) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res
    .status(200)
    .cookie('AccessToken', accessToken, options)
    .json({
      result_code: 0,
      result: {
        data: {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          access_token: accessToken,
          refresh_token: refreshToken,
          access_token_expires: getDateAfterDuration(process.env.JWT_ACCESS_TOKEN_EXPIRES || "1d"),
          refresh_token_expires: getDateAfterDuration(process.env.JWT_REFRESH_TOKEN_EXPIRES || "7d"),
        },
      },
    });
};

module.exports = loginResponse;
