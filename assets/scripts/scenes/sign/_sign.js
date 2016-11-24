class Sign extends React.Component {
    constructor() {
        super();

        var self = this;
    }

    _handleForm(e) {
        console.log('ew');
        e.preventDefault();
        this.props.onFormChange(this._username.value, this._username.value);
    }

    render() {
        return (
            <div className="Window-main--center">
                <form className="Form" onSubmit={this._handleForm}>
                    <div className="Form-body">
                        <p className="InputSide">
                            <input id="username" type="text" name="username" placeholder="qwerty" ref={(input) => this._username = input}/>
                            <label htmlFor="username">Username</label>
                        </p>

                        <p className="InputSide">
                            <input id="password" type="pass" name="password" placeholder="123rty" ref={(input) => this._password = input}/>
                            <label htmlFor="password">Password</label>
                        </p>
                    </div>

                    <div className="Form-footer">
                        <button type="submit" name="sign" className="BtnBasic--lg">{this.props.cta}</button>
                        <Link to="/login" className="Link">{this.props.otherSign}</Link>
                        <p className="Form-error">{this.props.errorMessage}</p>
                    </div>
                </form>
            </div>
        )
    }

    // _onSubmit(e) {
    //     e.preventDefault();
    //     console.log('creew');
    //     self.props.handleSubmit.bind(self);
    // }
}