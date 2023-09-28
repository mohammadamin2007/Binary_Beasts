import axios from "axios";

async function checkUser() {
    if(localStorage.getItem("USPSPA")) {
        let active = false
        await axios.post("http://localhost:8000/loginStatus/", {"user_password": localStorage.getItem("USPSPA")}).then(next => {
            active =  next.data['status'] === 'active';
        })
        return active
    } else {
        return false;
    }
}

export default checkUser;