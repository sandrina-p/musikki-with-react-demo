
class Register extends React.Component {

    constructor() {
        super();

        this.mkUsers = LS.get('mkUsers', true) || {};

        this.state = {
            errorMessage: ""
        };
    }

    render() {
        return (
            // todo merge this with login on _signForm.js
            <div className="Window-main--center">
                <form className="Form" onSubmit={this._handleSubmit.bind(this)}>
                    <div className="Form-body">
                        <p className="InputSide">
                            <input id="username" type="text" name="username" placeholder="newQuerty" ref={(input) => this._username = input}/>
                            <label htmlFor="username">Username</label>
                        </p>
                        <p className="InputSide">
                            <input id="password" type="pass" name="password" placeholder="654321" ref={(input) => this._password = input}/>
                            <label htmlFor="password">Password</label>
                        </p>
                    </div>
                    <div className="Form-footer">
                        <button type="submit" name="sign" className="BtnBasic--lg">Register</button>
                        <Link to="/login" className="Link">Login</Link>
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

            console.log(username, password);
        if ( !/^[-]?[0-9]+[\.]?[0-9]+$/.test(username) && username.length >= 3 && password.length >= 3 && !this.mkUsers[username]) {
            console.log('registered with success');
            this._registerUser(username, password)
            this.props.setLogged(username);
        } else {
            this.setState({errorMessage: 'You can be more creative than that'})
        }
    }

    _registerUser(username, password) {

        this.mkUsers[username] = {
            'password': password
        }

        LS.set('mkUsers', this.mkUsers, true);
    }

}
