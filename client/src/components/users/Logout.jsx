import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Flex, Heading} from "@chakra-ui/react";


export default function Logout() {

    const navigate = useNavigate()
    const [logged, setLogged] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/auth/logout',
                    {withCredentials: true}
                );
                if (response.status === 200) {
                    setLogged(false);
                    navigate('/Login');
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    return (

        <Flex
            height={'100vh'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Heading>
                {logged && 'Closing session...'}
            </Heading>
        </Flex>
    );


}


