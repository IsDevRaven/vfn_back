import {Button, Heading, useToast} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Profile() {

    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const toast=  useToast()
    const [logged, setLogged] = useState(false)

    useEffect( () => {
        axios.get(
            'http://localhost:3000/api/auth/profile',
            {
                withCredentials: true
            }
        ).then(
            response => {
                setLogged(true)
                setUserData(response.data)
                console.log('Hola')
            }
        ).catch(
            err => {
                if (err.request.status === 401) {
                    toast({
                        title: 'Unregistered user',
                        status: 'error',
                        duration: 5000,
                        isClosable: true
                    });

                    navigate('/login')

                }
            }

        )

    }, []);

    const getCookieValue = (name) => (
        document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1]
    );


    useEffect(() => {
        console.log(getCookieValue('token'))
    })

    if (!logged) {
        return (
            <></>
        )
    }

    return (

        <>
            <Heading>
                Profile
            </Heading>
            {
                userData ?  (
                    <>
                        <div>
                            <p>ID: {userData.userId}</p>
                            <p>Name: {userData.name}</p>
                            <p>Role: {userData.role.name} </p>
                        </div>

                        <Button
                            onClick={() => navigate('/login')}
                        >
                            Logout
                        </Button>
                    </>


                ) : (
                    <p>Loading ...</p>
                )
            }


        </>

    )
}