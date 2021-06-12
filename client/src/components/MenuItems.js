import { HiGlobe, HiViewList, HiChartPie, HiServer, HiInformationCircle, HiBeaker, HiOutlineLink } from 'react-icons/hi'

const navMenu = [
    {id: 1, menuName: "Menu home", menuLink: "/", iconComponent: HiGlobe}, 
    {id: 2, menuName: "Menu details", menuLink: "/plants", iconComponent: HiViewList}, 
    {id: 3, menuName: "Menu reports", menuLink: "/reports", iconComponent: HiChartPie}, 
    {id: 4, menuName: "Menu manage", menuLink: "/manage", iconComponent: HiServer}, 
    {id: 5, menuName: "Menu bigdata", menuLink: "/bigdata", iconComponent: HiBeaker}, 
    {id: 6, menuName: "Menu blockchain", menuLink: "/blockchain", iconComponent: HiOutlineLink}, 
    {id: 7, menuName: "Menu about", menuLink: "/about", iconComponent: HiInformationCircle}, 
  ];

export default navMenu;