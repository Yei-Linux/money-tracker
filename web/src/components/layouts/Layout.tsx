import { FC, PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

const Main: FC<Main> = ({ children }) => (
  <main className="grid-in-main">{children}</main>
);

type Header = PropsWithChildren;
type Main = PropsWithChildren;
type Footer = PropsWithChildren;

type Layout = PropsWithChildren;
type LayoutComposition = {
  Header: typeof Header;
  Main: typeof Main;
  Footer: typeof Footer;
};
export const Layout: FC<Layout> & LayoutComposition = ({ children }) => (
  <div className="grid grid-areas-layout grid-rows-layout ">{children}</div>
);

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;
