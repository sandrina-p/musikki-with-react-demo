class Login extends React.Component {

    constructor() {
        super();
        this._handleSubmit = this._handleSubmit.bind(this);

        this.state = {
            errorMessage: ""
        };
    }

    render() {
        return (
            <SignForm
                cta='Go'
                switchSignTxt='Create account'
                switchSignUrl='/register'
                errorMessage={this.state.errorMessage}
                handleSubmit={this._handleSubmit}
                userPlaceholder="qwerty"
                passPlaceholder="123rty"
            />
        )
    }

    _handleSubmit(username, password) {
        this._validateUser(username, password)
            ? this.props.setLogged(username)
            : this.setState({errorMessage: 'What about creating a new account?'})
    }

    _validateUser(username, password) {
        let mkUsers = LS.get('mkUsers', true);
        return mkUsers && mkUsers[username] && mkUsers[username].password === password;
    }

}
