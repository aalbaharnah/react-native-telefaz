/**
 * AlertProvider.tsx
 * This is a React context provider for displaying custom alerts using React's Modal.
 */

import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useScale } from '@/src/hooks/useScale';
import FocusableBox from '@/src/components/focusable-box';
import { useTheme } from '@/src/hooks/useTheme';

type setAlertProps = {
    message: string;
    buttonText?: string;
    cancelText?: string;
    onAction?: () => void;
    onCancel?: () => void;
};

interface AlertContextProps {
    setAlert: (props: setAlertProps) => void;
}

const AlertContext = createContext<AlertContextProps>({
    setAlert: () => { },
});

export default function AlertProvider({ children }: PropsWithChildren<{}>) {
    const styles = useStyles();
    const scale = useScale();

    const [visible, setVisible] = useState(false);

    const [alertProps, setAlertProps] = useState<setAlertProps>({
        message: '',
        cancelText: '',
        onCancel: () => { },
    });

    const setAlert = (props: setAlertProps) => {
        setAlertProps(props);
        setVisible(true);
    };

    const onCancel = () => {
        setVisible(false);
        if (alertProps.onCancel) {
            alertProps.onCancel();
        }
    };

    const onPress = () => {
        setVisible(false);
        if (alertProps.onAction) {
            alertProps.onAction();
        }
    };

    return (
        <AlertContext.Provider value={{ setAlert }}>
            {children}
            <Modal visible={visible} transparent={true} animationType='fade'>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Text style={styles.message}>{alertProps.message}</Text>
                        <View style={styles.buttons}>

                            {alertProps.onAction ? (
                                <FocusableBox
                                    width={200 * scale}
                                    height={50 * scale}
                                    text={alertProps.buttonText ?? 'OK'}
                                    onPress={onPress}
                                    style={styles.button}
                                />
                            ) : null}

                            <FocusableBox
                                width={200 * scale}
                                height={50 * scale}
                                text={alertProps.cancelText ?? "Close"}
                                onPress={onCancel}
                                style={styles.button}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </AlertContext.Provider>
    );
}

const useStyles = () => {
    const scale = useScale();
    return StyleSheet.create({
        overlay: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        container: {
            backgroundColor: '#000',
            borderColor: '#333333',
            borderWidth: scale * 2,
            padding: scale * 20,
            borderRadius: scale * 10,
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: scale * 2
        },
        buttons: {
            flexDirection: 'row',
            gap: scale * 10,
            width: '100%',
            justifyContent: 'center'
        },
        button: {
            marginTop: scale * 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        message: {
            color: '#fff',
            fontSize: scale * 24,
            marginBottom: scale * 20,
            fontFamily: 'IBMPlexSansArabic-Regular',

        }
    });
}

export function useAlert() {
    return useContext(AlertContext);
}
