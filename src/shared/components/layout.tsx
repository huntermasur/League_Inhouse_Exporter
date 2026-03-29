import { Outlet } from 'react-router-dom';
import { Nav } from './nav';
import styles from './layout.module.css';

export function Layout() {
  return (
    <div className={styles.shell}>
      <Nav />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
