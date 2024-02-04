import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import {useState} from "react";

export default function ChangePasswordModal () {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handlePasswordChange = (e) => {
        if (e.target.name === 'currentPassword') {
            setCurrentPassword(e.target.value);
        } else if (e.target.name === 'newPassword') {
            setNewPassword(e.target.value);
        } else if (e.target.name === 'confirmNewPassword') {
            setConfirmNewPassword(e.target.value);
        }
    };

    const handleUpdatePassword = async () => {
        // Aquí agregarías la lógica para actualizar la contraseña
        // Debes verificar que newPassword y confirmNewPassword coincidan
        // Y luego enviarlos al servidor junto con el currentPassword para actualizar
        onClose(); // Cierra el modal después de la operación
    };

    return (
        <>
            <Button onClick={onOpen}>
                Change Password
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Current Password</FormLabel>
                            <Input name="currentPassword" type="password" value={currentPassword} onChange={handlePasswordChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>New Password</FormLabel>
                            <Input name="newPassword" type="password" value={newPassword} onChange={handlePasswordChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Confirm New Password</FormLabel>
                            <Input name="confirmNewPassword" type="password" value={confirmNewPassword} onChange={handlePasswordChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdatePassword}>
                            Update Password
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}