import axios from "axios";

async function getUserData() {
    if(localStorage.getItem("USPSPA")) {
        let userData = {};
        await axios.post("http://localhost:8000/getUserData/", {"user_password": localStorage.getItem("USPSPA")}).then(next => {
            userData = JSON.parse(next.data)[0].fields;
        })
        return userData;
    }
}

export default getUserData;