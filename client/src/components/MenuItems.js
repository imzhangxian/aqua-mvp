import { HiGlobe, HiViewList, HiChartPie, HiServer, HiInformationCircle, HiBeaker, HiOutlineLink } from 'react-icons/hi'

const navMenu = [
    {menuName: "Menu home", menuLink: "/", iconComponent: HiGlobe}, 
    {menuName: "Menu details", menuLink: "/plants", iconComponent: HiViewList}, 
    {menuName: "Menu reports", menuLink: "/reports", iconComponent: HiChartPie}, 
    {menuName: "Menu manage", menuLink: "/manage", iconComponent: HiServer}, 
    {menuName: "Menu bigdata", menuLink: "/bigdata", iconComponent: HiBeaker}, 
    {menuName: "Menu blockchain", menuLink: "/blockchain", iconComponent: HiOutlineLink}, 
    {menuName: "Menu about", menuLink: "/about", iconComponent: HiInformationCircle}, 
  ];

export default navMenu;