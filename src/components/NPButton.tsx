import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';

type INPButtonProps = {
  children?: ReactNode;
} & React.ComponentProps<typeof Button>;

const NPButton: React.FC<INPButtonProps> = ({children, ...props}) => {
  return (
    <TouchableOpacity>
      <Button {...props}>{children}</Button>
    </TouchableOpacity>
  );
};

export default NPButton;
