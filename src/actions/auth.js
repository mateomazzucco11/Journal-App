import Swal from 'sweetalert2'

import { types } from '../types/types';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signInWithPopup, updateProfile, signOut } from '@firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config'; 
import { finishLoading, startLoading } from './ui';


export const startLoginEmailPassword = (email, password) => {
    return(dispatch) => {

        const auth = getAuth();
        dispatch( startLoading() );

        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
                dispatch(
                    finishLoading()
                );
            })
            .catch(() => {

                dispatch(finishLoading());
                Swal.fire('Error', 'User does not exist', 'error');
            }) 
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    return (dispatch) => {

        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, email, password)
            .then( async({user}) => {
                await updateProfile( user, { displayName: name });
                
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(() => {
                Swal.fire('Error', 'The email address is already in use', 'error');
            })

    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    }
})

export const startLogout = () => {
    return async( dispatch ) => {
        const auth = getAuth();
        await signOut(auth);

        dispatch( logout() );
    } 
}

export const logout = () => ({
    type: types.logout
})