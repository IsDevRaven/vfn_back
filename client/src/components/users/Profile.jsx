import {
    Box,
    Button,
    Heading,
    useToast,
    VStack,
    SkeletonText,
    FormControl,
    FormLabel,
    Input,
    Flex, Center, Spacer, Grid, Text,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import {useAuth} from "../AuthContext.jsx";

export default function Profile() {

    const toast = useToast()

    const {userData: userDataContext, setUserData: setUserDataContext, isLoading: isLoadingAuth} = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const [userData, setUserData] = useState({
        name: '',
        lastName: '',
        email: '',
        role: {
            name: ''
        }
    })


    useEffect(() => {
        if (!isLoadingAuth && Object.keys(userDataContext).length > 0) {
            setUserData(userDataContext);
            setIsLoading(false); // No más carga si el contexto de autenticación ha terminado de cargar
        }
    },[userDataContext, isLoadingAuth]); // Añadir isLoadingAuth como dependencia

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {

            toast({
                title: 'Perfil actualizado.',
                description: 'Tus datos han sido actualizados con éxito.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setIsSubmitting(false)
        }, 2000);
    };


    return (
        <>

                    <Flex direction={"column"} gap={'20px'}>
                        <Center>
                            <Heading>
                                Profile
                            </Heading>
                        </Center>
                    <VStack
                        as="form"
                        spacing={4}
                        onSubmit={handleSubmit}
                        align={'stretch'}
                    >
                        {isLoading ? (
                            <SkeletonText mt="4" noOfLines={4} spacing="4" />
                        ) : (
                            <>
                                <FormControl id="name">
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl id="name">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={userData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl id="email" isDisabled={true}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>
                                <FormControl id="role" isDisabled={true}>
                                    <FormLabel>Role</FormLabel>
                                    <Input
                                        type="text"
                                        name="role"
                                        value={userData.role.name[0].toUpperCase() + userData.role.name.slice(1)}
                                        onChange={handleInputChange}
                                    />
                                </FormControl>

                                <Spacer/>

                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    isLoading={isSubmitting}
                                    loadingText='Submitting'
                                >
                                    Update profile
                                </Button>
                                <Grid
                                    templateColumns='repeat(2, 1fr)'
                                    alignItems={'center'}
                                >
                                    <Text as='b'>
                                        Update Password?
                                    </Text>
                                    <ChangePasswordModal></ChangePasswordModal>
                                </Grid>

                            </>
                        )}
                    </VStack>

                    </Flex>
        </>

    );
}