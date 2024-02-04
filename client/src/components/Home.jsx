import {Box, Flex, Heading, HStack, Text} from "@chakra-ui/react";


export default function Home({header}) {
    return (
        <>
            <HStack
                position='absolute'
                top={10}
            >
                {header}
                <Flex
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='space-between'
                    gap={8}
                >
                    <Box
                        display={'flex'}
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Heading>
                            Welcome to the home page!
                        </Heading>
                        <Text>
                            This is the home page!
                        </Text>
                    </Box>
                </Flex>

            </HStack>
        </>
    )
}