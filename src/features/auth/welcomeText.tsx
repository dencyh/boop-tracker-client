import React from "react";

const WelcomeText = () => {
  return (
    <div className="max-w-lg flex-1 p-10 text-center">
      <h2 className="mb-5 text-4xl font-semibold">Nota bene</h2>
      <p className="text-left">
        После регистрации необходимо подтвердить эл. почту. Для входа можно
        использовать данные тестового пользователя:
      </p>
      <div className="mt-4 text-left font-semibold">
        <p className="mb-2">Логин: ljmfvd@gmail.com</p>
        <p> Пароль: 123123f</p>
      </div>
    </div>
  );
};

export default WelcomeText;
