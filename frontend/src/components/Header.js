import { Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header page__section page__section_place_header">
      <Link to="/" className="header__logo" aria-label="Home"></Link>
      <div className="header__auth-controls">
        <Route exact path="/">
          <p className="header__email">{props.userEmail}</p>
          <button className="header__logout" onClick={props.onLogout}>
            Выйти
          </button>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
