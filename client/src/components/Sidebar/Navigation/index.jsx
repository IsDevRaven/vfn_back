import {Flex, List, ListItem, Spacer} from "@chakra-ui/react";
import {
    MdCalendarToday,
    MdOutlineSettingsInputComposite,
    MdOutlineNotificationsActive,
} from "react-icons/md";

import { RiHome3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

import { NavItem } from "./NavItem";
import { useLocation} from "react-router-dom";
import {useAuth} from "../../AuthContext.jsx";
import Home from "../../Home.jsx";
import Profile from "../../users/Profile.jsx";
import {useEffect, useState} from "react";

export const items = [
    {
        type: "link",
        label: "Home",
        icon: RiHome3Line,
        path: "/",
        element: (props) => <Home {...props} />,
    },
    {
        type: "link",
        label: "Settings",
        icon: IoSettingsOutline,
        path: "/settings",
    },

    {
        type: "header",
        label: "Account",
        protected: true,
    },
    {
        type: "link",
        label: "Profile",
        icon: AiOutlineUser,
        path: "/profile",
        protected: true,
        element: (props) => <Profile {...props} />,
    },
    {
        type: "link",
        label: "Calendar",
        icon: MdCalendarToday,
        path: "/calendar",
        protected: true,
    },
];

export const Navigation = ({ collapse }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    const { isAuthenticated, isLoading: isLoadingAuth } = useAuth();

    useEffect(() => {
        setIsLoading(isLoadingAuth)
    }, [isLoadingAuth]);


    if (isLoading) {
        return null
    }

    return (
        <>
            <List w="full" my={8}>
                {items.map((item, index) => {

                    if (item.protected && !isAuthenticated) {
                        return null;
                    }

                    return (
                        <>
                            <ListItem key={index}>
                                <NavItem item={item} isActive={location.pathname === item.path} collapse={collapse} />
                            </ListItem>
                        </>

                    )
                })}
            </List>
        </>


    );
}