import Form from "./Form.jsx";
import {useNavigate} from "react-router-dom";
import {Button, Grid, Spacer, Text} from "@chakra-ui/react";

export default function SignUpForm() {

    const navigate = useNavigate()

    const signUpFields = [
        {name: 'name', label: 'Name', type: 'text', isRequired: true, placeholder: 'Enter your name'},
        {name: 'lastName', label: 'Last name', type: 'text', isRequired: true, placeholder: 'Enter your last name'},
        {name: 'email', label: 'Email', type: 'email', isRequired: true, placeholder: 'Enter your last email'},
        {name: 'password', label: 'Password', type: 'password', isRequired: true, placeholder: 'Enter your password'},
        {
            name: 'confirmPassword',
            label: 'Confirm password',
            type: 'password',
            isRequired: true,
            placeholder: 'Enter your password'
        }
    ];

    const signUpSubmitHandler = async (formData, toast, setIsSubmitting) => {



        if (formData.password !== formData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords don\'t match.',
                status: 'error',
                duration: 5000,
                isClosable: true
            });

            return;
        }

        setIsSubmitting(true);

        try {

            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: 'Registration successful',
                    description: data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });

                navigate('/login')

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
                title="Sign Up"
                fields={signUpFields}
                submitHandler={signUpSubmitHandler}
                submitName={'Sing Up'}
            >
                <Spacer />
                <Grid
                    templateColumns='repeat(2, 1fr)'
                    alignItems={'center'}
                >
                    <Text as='b' fontSize={'sm'}>
                        Do you already have a user?
                    </Text>
                    <Button
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </Button>
                </Grid>
            </Form>
        </>
    )
}
