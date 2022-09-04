import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Nav, NavItem, NavLink, Offcanvas, OffcanvasBody } from 'reactstrap';
import { useLogoutMutation } from '../api/auth';
import { useAppSelector } from '../hooks';
import { supportedLngs } from '../i18n';
import routes from '../routes';
import { isLoggedInSelector } from '../store/authSlice';

const Navigation: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [logout] = useLogoutMutation();

  const logoutUser = useCallback(() => {
    if (confirm(t('auth.logoutConfirm'))) {
      logout();
      toggleIsShowNav();
    }
  }, []);

  const [isShowNav, setIsShowNav] = useState(false);

  const toggleIsShowNav = useCallback(() => {
    setIsShowNav((prev) => !prev);
  }, [isShowNav]);

  const routesToShow = Object.values(routes).filter((route) => route.name);

  const isLoggedIn = useAppSelector(isLoggedInSelector);

  const isAllowedRoute = useCallback(
    (route: typeof routes[keyof typeof routes]) => {
      return (
        !isLoggedIn
        || route !== routes.login
        && route !== routes.register
      );
    },
    [isLoggedIn]
  );

  return (
    <>
      <Button
        style={{
          position: 'fixed',
          zIndex: 1100,
          top: 10,
          right: 10,
          minWidth: 70,
          opacity: 0.75
        }}
        onClick={toggleIsShowNav}
      >
        {isShowNav ? t('nav.close') : t('nav.menu')}
      </Button>
      <Offcanvas
        direction='top'
        isOpen={isShowNav}
        style={{
          height: '100%'
        }}
      >
        <OffcanvasBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Nav
            vertical
            justified
            style={{
              fontSize: '24px'
            }}
          >
            {
              routesToShow
                .filter((route) => isAllowedRoute(route))
                .map(({ name, path }) => (
                  <NavItem
                    key={path}
                    onClick={toggleIsShowNav}
                  >
                    <NavLink tag={Link} to={path}>{t(name)}</NavLink>
                  </NavItem>
                ))
            }
            {
              isLoggedIn && (
                <NavItem>
                  <NavLink
                    style={{
                      cursor: 'pointer'
                    }}
                    onClick={logoutUser}
                  >
                    {t('auth.logout')}
                  </NavLink>
                </NavItem>
              )
            }
          </Nav>
          <div
            style={{
              textAlign: 'center'
            }}
          >
            <ButtonGroup>
              {
                supportedLngs.map((lng) => (
                  <Button
                    key={lng}
                    color={
                      i18n.language === lng
                        ? 'primary'
                        : 'light'
                    }
                    onClick={
                      () => {
                        i18n.changeLanguage(lng);
                      }
                    }
                  >
                    {lng}
                  </Button>
                ))
              }
            </ButtonGroup>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

export default Navigation;
