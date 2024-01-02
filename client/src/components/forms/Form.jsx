import {useState} from "react";

import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel, Grid,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Spacer,
    useToast,
    VStack
} from '@chakra-ui/react'

import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

export default function Form({title, fields, submitHandler, submitName, children}) {
    const toast = useToast();

    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => ({...acc, [field.name]: ''}), {})
    );

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitHandler(formData, toast, setIsSubmitting);
    };


    return (
        <Flex
            height={'100vh'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Box
                border={'1px solid teal'}
                borderRadius={'30px 0 30px 0'}
                padding={'40px'}
                boxShadow={'1px 1px 10px teal'}
                w={'60vh'}
            >
                <Flex direction={"column"} gap={'20px'}>
                    <Center>
                        <Heading>
                            {title}
                        </Heading>
                    </Center>
                    <VStack
                        as="form"
                        spacing={4}
                        onSubmit={handleSubmit}
                        align={'stretch'}
                    >
                        {fields.map((field) => (
                            <FormControl key={field.name} id={field.name} isRequired={field.isRequired}>
                                <FormLabel>{field.label}</FormLabel>
                                {field.type === 'password' ? (
                                    <InputGroup size='md'>
                                        <Input
                                            type={field.name === 'password' && showPassword || field.name === 'confirmPassword' && showConfirmPassword ? 'text' : 'password'}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                        />
                                        <InputRightElement width='3rem'>
                                            <IconButton
                                                aria-label={field.name === 'password' && showPassword || field.name === 'confirmPassword' && showConfirmPassword ? 'Hide password' : 'Show password'}
                                                icon={field.name === 'password' && showPassword || field.name === 'confirmPassword' && showConfirmPassword ?
                                                    <ViewOffIcon/> : <ViewIcon/>}
                                                h='1.75rem'
                                                size='sm'
                                                onClick={field.name === 'password' ? toggleShowPassword : toggleShowConfirmPassword}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                ) : (
                                    <Input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                    />
                                )}
                            </FormControl>
                        ))}
                        <Spacer/>

                            <Button
                                type="submit"
                                colorScheme="teal"
                                isLoading={isSubmitting}
                                loadingText='Submitting'
                            >
                                {submitName}
                            </Button>
                            {children}
                    </VStack>
                </Flex>
            </Box>
        </Flex>
    )
}