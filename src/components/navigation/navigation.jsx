import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { Link as LinkR } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import image from "../../img/image.png";
import image2 from "../../img/image2.png";
import Logo from "../../img/logo4.png";
import "./navigation.css"

const Nav = styled.div`
  background-color: ${({ theme }) => theme.card_light};
  height: 60px;
  width: 100%;
  display: flex;
  max-width: 1850px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  border-radius: 200px 30px 200px 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 600px) {
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 378px) {
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 10px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1200px;
  @media screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 28px;
  }
  @media screen and (max-width: 600px) {
    font-size: 10px;
    line-height: 28px;
  }
  @media screen and (max-width: 378px) {
    font-size: 10px;
    line-height: 28px;
  }
`;

const NavLogo =styled.div`
  width: 100%;
  padding: 0 6px;
  display: flex;
  justify-self: flex-start;
  cursor: pointer;
  position: static;
  right: 20%;
  text-decoration: none;
  align-items: center;
  @media screen and (max-width: 640px) {
    padding: 0 0px;
  }
`;

const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 50%);
    font-size: 1.5rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text_primary};
  }
  
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
  
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary}
  }
  
`;

const ButtonContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: end;
   width: 80%;
   height: 100%;
   padding: 0 6px;
   @media screen and (max-width: 900px) {
    justify-content: center;
    align-items: center;
    margin-right: 40px;
    display: inline-flex;
   }
   @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    margin-right: 55px;
    display: inline-flex;
   }
   @media screen and (max-width: 378px) {
    justify-content: center;
    align-items: center;
    margin-right: 55px;
    display: inline-flex;
   }
`;

export const Span = styled.div`
   padding: 0 4px;
   font-weight: bold;
   font-size: 18px;
`;
const MobileMenu = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   gap: 16px;
   position: absolute;
   top: 0;
   right: 0;
   padding: 12px 40px 24px 40px;
   background: ${({ theme }) => `${theme.card_light}99`};
   transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
   transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
   border-radius: 0 0 20px 20px;
   box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
   opacity: ${({ open }) => (open ? "1" : "0")};
   visibility: ${({ open }) => (open ? "visible" : "hidden")};
   z-index: 10; /* Definido como constante */
   will-change: transform, opacity;
`;

const MobileMenuLinks = styled(LinkR)`
   color: ${({ theme }) => theme.text_primary};
   font-weight: 500;
   cursor: pointer;
   text-decoration: none;
   transition: all 0.2s ease-in-out;
   &:hover {
    color: ${({ theme }) => theme.primary};
   }
`;

const InputCheckbox = styled.input`
   width: 0;
   height: 0;
   visibility: hidden;
`;

const ButtonLabel = styled.label`
  background-color: hsla(26, 100%, 60%, 1);
  color: ${({ theme }) => theme.text_light};
  border: 2px solid white;
  border-radius: 20px;
  width: 80px;
  height: 40px;
  align-items: center;
  display: flex;
  cursor: pointer;
  -webkit-box-shadow: inset 3px 3px 3px -2px rgba(0,0,0,0.68);
  -moz-box-shadow: inset 3px 3px 4px -2px rgba(0,0,0,0.68);
  box-shadow: inset 3px 4px 5px -1px rgba(0,0,0,0.68);
  transition: 0.3s;

  &:after {
    content: '';
    background-image: url(${image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    width: 25px;
    height: 25px;
    overflow: hidden;
    border-radius: 50%;
    
    left: 5px;
    transform: translate(-50% -50%);
    transition: 0.3s;
  }
  
  /* Estilos quando o input está checado */
  ${InputCheckbox}:checked + & {
    background: #242424;
    background-image: url(${image2});
  }

  ${InputCheckbox}:checked + &:after {
    left: 45px;
    transition: 0.3s;
    background-image: url(${image2}); 
  }

   @media screen and (max-width: 768px) {
    width: 50px;
    height: 23px;
    font-size: 0.8rem;
    margin-left: 20px;
    &:after {
      width: 20px;
      height: 20px;
      overflow: hidden;
      border-radius: 50%;
      
      left: 5px;
      transition: 0.3s;
    }
    /* Estilos quando o input está checado */
  ${InputCheckbox}:checked + & {
    background: #242424;
    background-image: url(${image2});
  }

  ${InputCheckbox}:checked + &:after {
    left: 25px;
    transition: 0.3s;
    background-image: url(${image2}); 
  }
  }
   @media screen and (max-width: 378px) {
    width: 53px;
    height: 30px;
    &:after {
      width: 20px;
      height: 20px;
      overflow: hidden;
      border-radius: 50%;
      
      left: 5px;
      transition: 0.3s;
    }
    /* Estilos quando o input está checado */
  ${InputCheckbox}:checked + & {
    background: #242424;
    background-image: url(${image2});
  }

  ${InputCheckbox}:checked + &:after {
    left: 25px;
    transition: 0.3s;
    background-image: url(${image2}); 
  }
  }
`;

const LogoImage = styled.div`
  background-image: url(${Logo});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 1;
  transform: translate(0%, 0%);
  width: 90px;
  height: 80px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 900px) {

  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 378px) {
    display: none;
  }
`;

const TitleLogo = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  font-size: 1.5rem;
  margin-left: 0.125rem;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  display: block;

  @media screen and (max-width: 900px) {
    font-size: 1.125rem;
    margin-left: 0;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.125rem;
    margin-left: 0;
  }
  @media screen and (max-width: 378px) {
    font-size: 1rem;
    left: 55px;
    margin-top: 1.875rem;
    margin-bottom: 1.5rem;
  }
`;

export const Navigation = ({isDark, setIsDark}) => {
const [open, setOpen] = React.useState(false);
const menuRef = useRef(null);

  const handleChange = () => { 
    setIsDark(!isDark)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica se o clique foi fora da barra de navegação
      if (menuRef.current &&!menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);


  return (
    <Nav ref={menuRef} translate='no'>
        <NavContainer>
          <NavLogo to="/" style={{ display: "flex", alignItems: "center" }} >
              <a 
                href='#inicio'
                style={{
                  display:"flex",
                  alignItems:"center",
                  marginRight:"10px",
                  textDecoration:"none",
              }}>
                <LogoImage className='logo-image'></LogoImage>
                  <TitleLogo><strong>Clima</strong>Analizer</TitleLogo>
              </a>
              
            </NavLogo>
            <MobileIcon>
              <FaBars
                onClick={() => {
                  setOpen(!open);
                }} 
                />
            </MobileIcon>
            <NavItems>
              <NavLink href='#inicio'>Inicio</NavLink>
              <NavLink href='#sobre'>Sobre</NavLink>
              <NavLink href='#climaHistórico'>Clima Histórico</NavLink>
            </NavItems>
            <ButtonContainer>
              <InputCheckbox
                type="checkbox"
                id="check"
                onChange={handleChange}
              />
            <ButtonLabel htmlFor="check"></ButtonLabel>
            </ButtonContainer>
        </NavContainer>
        {open && (
          <MobileMenu open={open}>
            <MobileMenuLinks 
              href="#inicio"
              onClick={() => setOpen(false)}
            >
              Inicio
            </MobileMenuLinks>
            <MobileMenuLinks 
              href="#sobre"
              onClick={() => setOpen(false)}
            >
              Sobre
            </MobileMenuLinks>
            <MobileMenuLinks 
              href="#ajuda"
              onClick={() => setOpen(false)}
            >
              Ajuda
            </MobileMenuLinks>
          </MobileMenu>
        )}
        </Nav>
  )
}
