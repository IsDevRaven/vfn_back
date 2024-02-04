import {
    Avatar,
    Flex,
    IconButton,
    List,
    ListItem,
    SkeletonCircle,
    SkeletonText,
    Spacer,
    Text,
    useToast
} from "@chakra-ui/react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {NavItem} from "./Navigation/NavItem.jsx";
import { IoIosLogIn } from "react-icons/io";
import { FaPowerOff } from 'react-icons/fa';
import { FiUserPlus } from "react-icons/fi";
import { useAuth } from '../AuthContext';
import {useEffect, useState} from "react";

export const AvatarBox = ({ collapse }) => {
    const { isAuthenticated, userData, isLoading: isLoadingAuth } = useAuth();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    const items = [
        {
            type: "link",
            label: "Log in",
            icon: IoIosLogIn,
            path: "/login",
        }
    ];

    useEffect(() => {
        setIsLoading(isLoadingAuth)
    }, [isLoadingAuth]);


    if (isLoading) {
        return null
    }


    if (!isAuthenticated){
        return (
            <>
                <List w="full" my={8} mb={0}>
                    {items.map((item, index) => (
                        <ListItem key={index}>
                            <NavItem item={item} isActive={location.pathname === item.path} collapse={collapse} />
                        </ListItem>
                    ))}
                </List>
            </>

        )
    }

    return (
        <Flex
            borderWidth={collapse ? 1 : 0}
            borderColor="gray.100"
            borderRadius="full"
            w="full"
            p={2}
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            flexDirection={collapse ? "row" : "column-reverse"}
        >
            {
                Object.keys(userData).length > 0 ? (
                    <>
                        <Avatar name={userData.name + ' ' + userData.lastName} bg="teal.300" />
                        {collapse && (
                            <Flex
                                w="full"
                                flexDirection="column"
                                gap={4}
                                justifyContent="center"
                                alignItems="flex-start"
                            >
                                <Text fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
                                    {userData.name + ' ' + userData.lastName}
                                </Text>
                                <Text as="small" color="gray.500" fontSize={12} lineHeight={0}>
                                    {userData.email}
                                </Text>
                            </Flex>
                        )}

                        <IconButton
                            as={Link}
                            to={'/logout'}
                            aria-label="Settings"
                            icon={<FaPowerOff />}
                            borderRadius="full"
                            color="gray.400"
                            variant="ghost"
                            fontSize={20}
                        />
                    </>
                ): <>
                    {
                        collapse
                            ? <SkeletonText mt="4" noOfLines={2} spacing="3" w={'60%'} m={2} ml={14}/>
                            : <SkeletonCircle size="12" />
                    }

                </>
            }


        </Flex>
    );
}