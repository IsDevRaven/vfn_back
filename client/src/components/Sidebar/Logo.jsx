import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { FcGraduationCap } from "react-icons/fc";
import { AiFillThunderbolt, AiOutlineSearch } from "react-icons/ai";

export const Logo = ({ collapse }) => (
    <Flex
        w="full"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={collapse ? "row" : "column"}
        gap={4}
    >
        <Box display="flex" alignItems="center" gap={2}>
            <Icon as={FcGraduationCap} fontSize={30} />
            {collapse && (
                <Text fontWeight="bold" fontSize={16}>
                    Virtual Fun English
                </Text>
            )}
        </Box>
        <IconButton
            variant="ghost"
            aria-label="search"
            icon={<AiOutlineSearch />}
            fontSize={26}
            color="gray.400"
            borderRadius="50%"
        />
    </Flex>
);