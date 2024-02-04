import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    AlertDialog, AlertDialogBody, AlertDialogCloseButton,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Flex,
    Heading, useDisclosure
} from "@chakra-ui/react";
import {useAuth} from "../AuthContext";


export default function Logout() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate()
    const { logout } = useAuth();


    const handleLogout = () => {
        axios.get('http://localhost:3000/api/auth/logout', {withCredentials: true})
            .then(
                response => {
                    logout()
                    navigate('/')
                }
            ).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={true}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>
                        Close session?
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to close your session? You will be redirected to the home page.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={() => navigate(-1)}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={handleLogout}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
