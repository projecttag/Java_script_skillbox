let password = "1234-"

if (password.length >= 4 && (password.includes ('-') || password.includes ('_')))  // можно только одно условие с одним знаком записать
{
    console.log("Пароль надёжный");
} else {
    console.log("Пароль недостаточно надёжный");
}
