import {Link, useNavigate} from "react-router-dom";
import Form from "./Form.jsx";
import {Button, Grid, Spacer, Text} from "@chakra-ui/react";
import { useAuth} from "../AuthContext.jsx";

export default function LogInForm() {

    const { login } = useAuth();
    const navigate = useNavigate();


    const signUpFields = [
        {name: 'email', label: 'Email', type: 'email', isRequired: true, placeholder: 'Enter your last email'},
        {name: 'password', label: 'Password', type: 'password', isRequired: true, placeholder: 'Enter your password'},
    ];

    const signInSubmitHandler = async (formData, toast, setIsSubmitting) => {
        try {

            setIsSubmitting(true);

            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {

                login()

                toast({
                    title: 'Registration successful',
                    description: data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });

                navigate('/')

            } else {
                toast({
                    title: 'Failed to register',
                    description: data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            }
        } catch (error) {
            toast({
                title: 'An error occurred',
                description: error.toString(),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }

    }


    return (
        <>
            <Form
                title="Log In"
                fields={signUpFields}
                submitHandler={signInSubmitHandler}
                submitName={'Log In'}
            >
                <Spacer/>
                <Grid
                    templateColumns='repeat(2, 1fr)'
                    alignItems={'center'}
                >
                    <Text as='b'>
                        Don't you have a user?
                    </Text>

                    <Button as={Link} to={'/signup'}>
                        Sing up
                    </Button>
                </Grid>
            </Form>
        </>
    );
}
