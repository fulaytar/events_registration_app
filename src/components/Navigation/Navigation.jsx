import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import css from "./Navigation.module.css";

export default function Navigation() {
  const getNavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <nav className={css.nav}>
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/event" className={getNavLinkClass}>
          Event
        </NavLink>
        <NavLink to="/peopleSearch" className={getNavLinkClass}>
          People
        </NavLink>
      </nav>
    </>
  );
}
