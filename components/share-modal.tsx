// Icons
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

// NextUI
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Snippet,
} from "@nextui-org/react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  onShareOption: (option: string) => void;
  articleUrl: string;
}

const ShareModal = ({
  isOpen,
  onClose,
  onOpenChange,
  onShareOption,
  articleUrl,
}: ShareModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Share Article</ModalHeader>
        <ModalBody>
          <Snippet symbol=" " variant="bordered">
            <span className="text-wrap">{`${articleUrl}`}</span>
          </Snippet>
          <div className="flex flex-row gap-2">
            <Button onClick={() => onShareOption("email")} fullWidth>
              <MdEmail />
              Email
            </Button>
            <Button onClick={() => onShareOption("facebook")} fullWidth>
              <FaFacebook />
              Facebook
            </Button>
            <Button onClick={() => onShareOption("twitter")} fullWidth>
              <FaTwitter />
              Twitter
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
