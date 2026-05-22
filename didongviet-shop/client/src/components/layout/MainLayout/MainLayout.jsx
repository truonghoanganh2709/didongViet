import { Outlet } from 'react-router-dom';
import TopBar from '../../figma/TopBar/TopBar';
import SiteHeader from '../../figma/SiteHeader/SiteHeader';
import MainNav from '../../figma/MainNav/MainNav';
import SiteFooter from '../../figma/SiteFooter/SiteFooter';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="figma-layout">
      <TopBar />
      <SiteHeader />
      <MainNav />
      <main className="figma-layout__main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
