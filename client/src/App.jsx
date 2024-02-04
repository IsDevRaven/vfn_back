import {Route, Routes, useLocation} from "react-router-dom";
import Home from "./components/Home.jsx";
import SignUpForm from "./components/forms/SignUpForm.jsx";
import LogInForm from "./components/forms/LogInForm.jsx";
import Profile from "./components/users/Profile.jsx";
import Logout from "./components/users/Logout.jsx";
import {Flex, HStack, IconButton, useBreakpointValue} from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {useAuth} from './components/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute.jsx";



const IndexPage = () => {
    const [collapse, setCollapse] = React.useState(false);
    const { isAuthenticated }  = useAuth()

    // const sidebarWidth = useBreakpointValue({ base: "full", md: "full", lg: "full" });

    return (

            <HStack w="full" h="100vh" minH={'500'} bg="gray.100" padding={10}>
                <Flex
                    as="aside"
                    w={'full'}
                    h="full"
                    minH={'500px'}
                    // maxH={'100vh'}
                    maxW={collapse ? 350 : 100}
                    bg="white"
                    alignItems="start"
                    padding={6}
                    flexDirection="column"
                    justifyContent="space-between"
                    transition="ease-in-out .2s"
                    borderRadius="3xl"
                >
                    <Sidebar collapse={collapse} />
                </Flex>
                <Flex
                    as="main"
                    w="full"
                    h="full"
                    bg="white"
                    minH={'500px'}
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    position="relative"
                    borderRadius="3xl"
                >
                    <IconButton
                        aria-label="Menu Colapse"
                        icon={<MdMenu />}
                        position="absolute"
                        top={6}
                        left={6}
                        zIndex={1}
                        onClick={() => setCollapse(!collapse)}
                    />

                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/logout'} element={<Logout/>}/>
                        <Route path={'/profile'} element={
                            <ProtectedRoute>
                                <Profile/>
                            </ProtectedRoute>
                        }/>
                        <Route path={'/login'} element={
                            isAuthenticated ? <Home/>  : <LogInForm/>
                        }/>
                        <Route path={'/signup'} element={
                            isAuthenticated ? <Home/> : <SignUpForm/>
                        }/>
                    </Routes>

                </Flex>
            </HStack>


    );
};

export default IndexPage;
