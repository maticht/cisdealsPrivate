const router = require("express").Router();
const { User, validate } = require("./user");
const bcrypt = require('bcryptjs');
const Joi = require("joi");
const Token = require("./token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const generateEmailTemplate = (url, nameOrCompany) => {
    const logoUrl = "https://res.cloudinary.com/maticht12345/image/upload/v1684165066/Logoall_ozcore.png";
    const userUrl = "https://res.cloudinary.com/maticht12345/image/upload/v1684165249/Frame_cql00h.png";
    const title = "Проверка электронной почты CISDEALS";
    const welcomeText = ", добро пожаловать в CISDEALS! Мы рады видеть вас в нашем сообществе.";
    const buttonText = "Подтвердить электронную почту";
    const emailHtml = `
    <html>
  <head>
    <title>${title}</title>
  </head>
  <body style="background-color: #f1f1f1;text-align: center;width: 700px;padding: 0">
    <div style=" margin: 0 auto; padding: 3px 3px 20px 3px;">
      <div style="text-align: center; background-color: white; padding: 15px 10px 15px 10px; border-radius: 0 0 20px 20px">
        <table style="width: 100%;">
        <tr>
        <td style="text-align: left;">
            <img src="${logoUrl}" alt="Logo" style="width: 80px;">
        </td>
        <td style="text-align: right;">
        <span style="text-align: center; display: inline-block;">
          <span style="font-weight: bold; font-size: 15px; color: #5b5b5b; margin: 0; display: inline-block; text-align: center;">
            <span style="margin-bottom: 15px">${nameOrCompany}</span>
            <img src="${userUrl}" alt="Logo" style="width: 22px; margin-left: 5px; vertical-align: middle;">
          </span>
        </span>
        </td>
        </tr>
        </table>
      </div>
      <div style="text-align: center; margin-top: 20px;">
        <h1 style=" color: #000000;font-size: 18px; font-weight: bold;">${title}</h1>
        <p style="color: #000000;font-size: 14px;">${nameOrCompany} ${welcomeText}</p>
        <p style="color: #000000;font-size: 14px;">Для подтверждения вашей электронной почты, пожалуйста, перейдите по ссылке:</p>
        <a href="${url}" style="background-color: #5CA91A;font-weight: bold;font-size: 14px; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; display: inline-block;">${buttonText}</a>
      </div>
    </div>
  </body>
</html>
  `;
    return emailHtml;
};

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        console.log(error);
        if (error) return res.status(400).send({ message: error.details[0].message });
            let user = await User.findOne({ email: req.body.email });
            if (user) return res
                .status(409)
                .send({ message: "Пользователь с указанным адресом электронной почты уже существует!" });
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
        user = await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.NOBASE_URL}SuccessfulLoginScreen/${user.id}/verify/${token.token}`;
        const emailHtml = generateEmailTemplate(url, user.nameOrCompany);
        await sendEmail(user.email, "Проверка электронной почты CISDEALS", emailHtml);

        return res.status(201).send({ data: { data: user }, message: "Вам отправлено письмо! Пожалуйста, подтвердите ваш аккаунт (Может быть оно попало в спам)" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Внутренняя ошибка сервера" });
    }
});

module.exports = router;
