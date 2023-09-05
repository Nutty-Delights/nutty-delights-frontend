

import { useDispatch } from "react-redux";
import { openLoginDialog } from "../redux/slices/user";


export const loginDialogHandler = (state, dispatch) => {

    dispatch(openLoginDialog({ open: state }));
}


// eslint-disable-next-line import/no-anonymous-default-export
