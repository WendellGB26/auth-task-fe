import { GoogleLogout } from "react-google-login";
import { setGlobalVariable } from "../../actions/LoginProfile/actions";
import { useDispatch } from 'react-redux';

const clientID = "1044229163626-gdfufnfo00da8e89it6pp15upf7fbc3q.apps.googleusercontent.com";

const Logout = ({}) => {
    const dispatch = useDispatch();

    const onLogoutSuccess = () => {
        dispatch(setGlobalVariable('user', []));
        console.log("Log out successfull!");
    } 
    
    return (
        <div>
            <GoogleLogout
                clientId={clientID}
                buttonText="Logout"
                onLogoutSuccess={onLogoutSuccess}
            />
        </div>
    )
}

export default Logout;