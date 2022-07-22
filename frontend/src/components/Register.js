import React from "react";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <main className="main page__main">
      <section className="auth page__section">
        <div className="auth-form auth__form">
          <h1 className="auth-form__title">Регистрация</h1>
          <form name="register" className="form" onSubmit={handleSubmit}>
            <fieldset className="form__fieldset">
              <input
                name="email"
                id="email"
                type="email"
                className="form__input form__input_theme_dark"
                placeholder="E-mail"
                maxLength="40"
                required
                autoComplete="off"
                value={email || ""}
                onChange={handleEmailChange}
              />
              <span className="profile-email-error form__error-msg"></span>
              <input
                name="password"
                id="password"
                type="password"
                className="form__input form__input_theme_dark"
                placeholder="Пароль"
                required
                autoComplete="off"
                value={password || ""}
                onChange={handlePasswordChange}
              />
              <span className="profile-profession-error form__error-msg"></span>
            </fieldset>
            <button
              type="submit"
              className="button button_theme_dark auth-form__submit"
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
