import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';

import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { startLoadingNotes } from '../actions/notes';



export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    useEffect(() => {
        const auth = getAuth();

        onAuthStateChanged(auth, async(user) => {
            
            if ( user?.uid ) {
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn(true);

                dispatch( startLoadingNotes(  user.uid ) );
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        })
    }, [dispatch, setChecking, setIsLoggedIn])

    if ( checking ) {
        return (
            <h1>Waiting...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path='/auth'
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />
                    <PrivateRoute
                        exact
                        path='/'
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />

                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
