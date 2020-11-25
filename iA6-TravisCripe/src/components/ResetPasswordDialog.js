import React from 'react'

class ResetPasswordDialog extends React.Component {

    constructor(){
        super();
        this.state = {
            showResetPasswordDialog: false,
        }
    }

    handleLookUpAccount = (event) => {
        event.preventDefault();
        let thisUser = this.accountEmailRef.current.value;
        let data = JSON.parse(localStorage.getItem("userData"));
        //Check username and password:
        if (data == null || !data.hasOwnProperty(thisUser)) { 
            alert("Sorry, there is no account associated with this email address.");
            this.accountEmailRef.current.focus();
        } else {
            this.setState({resetEmail: thisUser, 
                           resetQuestion: data[thisUser].accountInfo.securityQuestion,
                           resetAnswer: data[thisUser].accountInfo.securityAnswer,
                           showLookUpAccountDialog: false, 
                           showSecurityQuestionDialog: true});
        }
    }
    
    handleResetPassword = (event) => {
        event.preventDefault();
       
        if (this.resetPasswordRef.current.value != this.resetPasswordRepeatRef.current.value) { 
            alert("Sorry, The passwords you entered do not match. Please try again.");
            this.resetPasswordRepeatRef.current.select();
        } else { //Reset password and log user in
            let data = JSON.parse(localStorage.getItem("userData"));
            data[this.state.resetEmail].accountInfo.password = this.resetPasswordRef.current.value;
            localStorage.setItem("userData",JSON.stringify(data));
            this.props.setUserId(this.state.resetEmail);
            this.props.changeMode(AppMode.DATA);
            this.setState({resetEmail: "", 
                           resetQuestion: "",
                           resetAnswer: "",
                           showPasswordResetDialog: false});
        }
    }
    
    renderPasswordResetDialog = () => {
        return (
        <div className="modal" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title"><b>Reset Password</b>
                  <button className="close-modal-button" 
                    onClick={() => {this.setState({resetEmail: "", 
                                     resetQuestion: "",
                                     resetAnswer: "",
                                     showResetPasswordDialog: false})}}>
                    &times;</button>
                </h3>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleResetPassword}>
                <label>
                    New Password: 
                    <input
                    type="password"
                    placeholder="Enter new password"
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    className="form-control form-text"
                    ref={this.resetPasswordRef}
                    />
                </label>
                <label>
                    Repeat New Password: 
                    <input
                    type="password"
                    placeholder="Repeat new password"
                    className="form-control form-text"
                    ref={this.resetPasswordRepeatRef}
                    />
                </label>
                <button role="submit" className="btn btn-primary btn-color-theme form-submit-btn">
                    <span className="fa fa-key"></span>&nbsp;Reset Password
                </button>
                </form>
            </div>
          </div>
        </div>
      </div>
      );
    }
}

export default ResetPasswordDialog;