
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
            <SignForm
                cta='Register'
                switchSignTxt='Login'
                switchSignUrl='/login'
                errorMessage={this.state.errorMessage}
                handleSubmit={this._handleSubmit.bind(this)}
                userPlaceholder="newQwerty"
                passPlaceholder="que456"
            />
        )
    }

    _handleSubmit(username, password) {
        !/^[-]?[0-9]+[\.]?[0-9]+$/.test(username)
        && username.length >= 3 && password.length >= 3
        && !this.mkUsers[username]
            ? this._registerUser(username, password)
            : this.setState({errorMessage: 'You can be more creative than that'});

    }

    _registerUser(username, password) {

        this.mkUsers[username] = {
            'password': password
        }

        LS.set('mkUsers', this.mkUsers, true);

        this.props.setLogged(username);
    }

}
