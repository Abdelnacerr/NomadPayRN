import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Portal, Button, Provider} from 'react-native-paper';

interface Props {
  children?: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[];
  visible: boolean;
  dismissable?: boolean;
  hideModal: () => void;
  showModal: () => void;
}

const RNPModal: FC<Props> = ({children, visible, hideModal, showModal}) => {
  if (visible) {
    showModal();
  }

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
          dismissable>
          {children}
        </Modal>
      </Portal>
    </Provider>
  );
};

export default RNPModal;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#EDEADE',
    margin: 20,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
