import Modal from 'react-modal';

Modal.setAppElement("#root");

interface ITransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ onRequestClose, isOpen }: ITransactionModalProps) {
  return (
    <Modal 
      isOpen={ isOpen } 
      onRequestClose={ onRequestClose }
    >
      <h2>Cadastrar transação</h2>
    </Modal>
  );
}