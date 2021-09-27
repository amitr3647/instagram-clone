import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
export default function SignInModal({
  openSignIn,
  setOpenSignIn,
 
  email,
  setEmail,
  password,
  setPassword,
  
  modalStyle,
  signIn,
}) {
  return (
    <div className="signIn__form">
      <Modal open={openSignIn} onClose={() => setOpenSignIn (false)}>
        <div style={modalStyle} className="modal__container">
          <form className="modal__form" type="submit">
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              ></img>
            </center>

            <Input
              type="text"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
