// =include ../plugins/modernizr/modernizr-flexbox.js
// =include ../plugins/modernizr/modernizr-touch_event.js

// =include components/_react-vars.js

// =include components/_utils.js


class InitialPage extends React.Component {

    constructor() {
        super();

        this.state = {
            userLogged: LS.get('userLogged') || false
        };
    }

    render() {
        let userLogged = this.state.userLogged,
            mkUsers = LS.get('mkUsers', true) || false;

        if (userLogged && mkUsers && mkUsers[userLogged]) {

            switch (this.props.dash) {
                case 'dashboard/favorites':
                    return <Dashboard view="Favorites" setLogged={this._setLogged.bind(this)}/>;
                default:
                    // hashHistory.push('dashboard/search'); FIXME: for some reason it trows an error on console: Uncaught SyntaxError: Invalid regular expression: /^//: Stack overflow
                    return <Dashboard view="Search" setLogged={this._setLogged.bind(this)}/>
            }

        } else {
            return (
                this.props.dash == "register"
                    ? <Register setLogged={this._setLogged.bind(this)}/>
                    : <Login setLogged={this._setLogged.bind(this)}/>
            )
        }
    }

    _setLogged(username = false) {
        this.setState({
            userLogged: username
        });

        if (username) {
            LS.set('userLogged', username);
            hashHistory.push('dashboard/search');
        } else {
            LS.remove('userLogged');
            hashHistory.push('/');
        }
    }
}

// =include scenes/_window.js

// =include scenes/sign/_sign.js
// =include scenes/sign/_login.js
// =include scenes/sign/_register.js

// =include scenes/dashboard/_dashboard.js
// =include scenes/dashboard/_search.js
// =include scenes/dashboard/_favorites.js
// =include scenes/dashboard/_artist.js

// =include scenes/notfound/_404.js

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Window}>
            <IndexRoute component={() => (<InitialPage dash="/" />)} />
            <Route path="login" component={() => (<InitialPage dash="login" />)} />
            <Route path="register" component={() => (<InitialPage dash="register" />)} />
            <Route path="dashboard" component={() => (<InitialPage dash="dashboard" logout="logout" />)} />
            <Route path="dashboard/search" component={() => (<InitialPage dash="dashboard/search"/>)} />
            <Route path="dashboard/favorites" component={() => (<InitialPage dash="dashboard/favorites"/>)} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
), document.getElementById("musikkiEx"));
