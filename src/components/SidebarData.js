import SettingsIcon from '@mui/icons-material/Settings';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon />,
        className: 'nav-text'
    },
    {
        title: 'User Info',
        path: '/user-info',
        icon: <HelpIcon />,
        className: 'nav-text'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <ShoppingBasketIcon />,
        className: 'nav-text'
    },
    {
        title: 'Settings',
        path: '/settings',
        icon: <SettingsIcon />,
        className: 'nav-text'
    }

]

