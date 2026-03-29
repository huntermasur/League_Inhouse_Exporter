import { NavLink } from "react-router-dom";
import styles from "./nav.module.css";

const links = [
  { to: "/", label: "Games" },
  { to: "/stats", label: "Stats" },
  { to: "/settings", label: "Settings" },
];

export function Nav() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.logo}>
        <span className={styles.logoIcon}>⚔</span>
        <span className={styles.logoText}>Inhouse Tracker</span>
      </div>
      <ul className={styles.links}>
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
