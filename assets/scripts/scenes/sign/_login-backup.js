class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            errorMessage: ""
        };
    }

    render() {
        return (
            <div className="Window-main--center">
                <form className="Form" onSubmit={this._handleSubmit.bind(this)}>
                    <div className="Form-body">
                        <p className="InputSide">
                            <input id="username" type="text" name="username" placeholder="qwerty" ref={(input) => this._username = input}/>
                            <label htmlFor="username">Username</label>
                        </p>
                        
                        <p className="InputSide">
                            <input id="password" type="password" name="password" placeholder="123456" ref={(input) => this._password = input}/>
                            <label htmlFor="password">Password</label>
                        </p>
                    </div>

                    <div className="Form-footer">
                        <button type="submit" name="sign" className="BtnBasic--lg">Go</button>
                        <Link to="/register" className="Link">Create account</Link>
                        <p className="Form-error">{this.state.errorMessage}</p>
                    </div>
                </form>
            </div>
        )
    }

    _handleSubmit(e) {
        e.preventDefault();

        let username = this._username.value,
            password = this._password.value;

        if (this._checkUser(username, password)) {
            console.log('sucess');
            this.props.setLogged(username);
        } else {
            this.setState({errorMessage: 'What about creating a new account?'})
        }
    }

    _checkUser(username, password) {
        let mkUsers = LS.get('mkUsers', true);
        return mkUsers && mkUsers[username] && mkUsers[username].password === password;
    }

}
