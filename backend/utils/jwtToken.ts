export const sendToken = (user: any, statusCode: any, res: any) => {
    console.log(user);
    const token = user?.token;
    const options = {
        expires: new Date(
            //@ts-ignore
            Date.now() + process.env.COOKIE_EXPIRES_TIME ?? 1 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    return res.status(statusCode).cookie("token", token, options).json({
        status: "0",
        responseData: {
            user
        }
  });
};