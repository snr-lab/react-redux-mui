import React, { Fragment, ReactNode, createContext, useReducer } from 'react';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


interface ToastProps {
    severity: "success" | "error" | "warning" | "info" | undefined;
    message: string;
}

interface Action{
    type: string;
    payload?: ToastProps;
}

interface StoreProps extends ToastProps {
    open: boolean;
}

const initialState: StoreProps = {
    open: false,
    severity: undefined,
    message: ""
};

function reducer(state: any, action: Action) {
  switch (action.type) {
    case 'show':
      return {
        open: true,
        severity: action.payload && action.payload.severity,
        message: action.payload && action.payload.message
      };
    case 'hide':
        return {
            ...state,
            open: false,
            message: ""
        };
    default:
      throw new Error();
  }
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

const ToastContext = createContext<{
    showToast: (data: ToastProps) => void,
    showApiToast: (data: any, successMessage: string, errorMessage: string) => void
}>({
    showToast: () => {},
    showApiToast: () => {}
});

export const useToast = () => React.useContext(ToastContext);

type AppToastProps = {
    children: ReactNode;
}

const AppToast: React.FC<AppToastProps> = (props) => {
    const {children} = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    const showToast = (data: ToastProps) => {
        dispatch({
            type: 'show', 
            payload: {
                severity: data.severity, 
                message: data.message
            }
        });
    }

    const showApiToast = (response: any, successMessage: string, errorMessage: string) => {
        if(response.error){
            showToast({
                severity: "error",
                message: errorMessage
            });
        } else {
            showToast({
                severity: "success",
                message: successMessage
            });
        }
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch({type: 'hide'});
    };
    return (
        <Fragment>
            <ToastContext.Provider value={{ showToast, showApiToast}} >
                {children}
                <Snackbar open={state.open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={state.severity}>
                        {state.message}
                    </Alert>
                </Snackbar>
            </ToastContext.Provider>
        </Fragment> 
    );
}

export default AppToast;