import React from "react";
import { Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { AvatarBox } from "./AvatarBox";

export const Sidebar = ({ collapse }) => {
        return (
            <Box w="full" h="full"  display="flex" flexDirection="column">
            <Logo collapse={collapse} />
            { !collapse && <Spacer />}
                <Navigation collapse={collapse} />
            <Spacer />
            <AvatarBox collapse={collapse} />
            </Box>
        );
};