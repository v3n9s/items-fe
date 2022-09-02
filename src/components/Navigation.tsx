import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Nav, NavItem, NavLink, Offcanvas, OffcanvasBody } from 'reactstrap';
import { supportedLngs } from '../i18n';
import routes from '../routes';

const Navigation: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [isShowNav, setIsShowNav] = useState(false);

  const toggleIsShowNav = useCallback(() => {
    setIsShowNav((prev) => !prev);
  }, [isShowNav]);

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
            onClick={toggleIsShowNav}
          >
            {
              Object.values(routes)
                .filter((route) => route.name)
                .map(({ name, path }) => (
                  <NavItem key={path}>
                    <NavLink tag={Link} to={path}>{t(name)}</NavLink>
                  </NavItem>
                ))
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
