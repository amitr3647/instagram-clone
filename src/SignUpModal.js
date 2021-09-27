import Modal from "@mui/material/Modal";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import "./SignUpModal.css";

export default function SignUpModal({
  open,
  setOpen,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  user,
  setUser,
  modalStyle,
  signUp,
}) {
  return (
    <div className="signUp__form">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
              placeholder="enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <Button onClick={signUp}>sign up</Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
