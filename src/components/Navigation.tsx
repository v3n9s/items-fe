import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Nav, NavItem, NavLink, Offcanvas, OffcanvasBody } from 'reactstrap';
import routes from '../routes';

const Navigation: React.FC = () => {
  const { t } = useTranslation();

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
        <OffcanvasBody>
          <Nav
            vertical
            justified
            style={{
              fontSize: '24px'
            }}
            onClick={toggleIsShowNav}
          >
            {
              Object.values(routes).map(({ name, path }) => (
                <NavItem key={path}>
                  <NavLink tag={Link} to={path}>{t(name)}</NavLink>
                </NavItem>
              ))
            }
          </Nav>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}

export default Navigation;
