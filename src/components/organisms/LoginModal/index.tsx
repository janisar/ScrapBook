import React, {FunctionComponent, useState} from 'react';
import {Modal} from '../../Modal';
import {RegisterFlowScreen} from '../../../pages/RegisterFlowScreen';

type Props = {
  visible: boolean;
};

export const LoginModal: FunctionComponent<Props> = ({visible}) => {
  const [show, setShow] = useState<boolean>(visible);
  return (
    <Modal visible={show} height={'100%'}>
      <RegisterFlowScreen skip={() => setShow(false)} />
    </Modal>
  );
};
