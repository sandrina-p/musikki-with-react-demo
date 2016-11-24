// =include ../00_atoms/_react-vars.js

// =include ../00_atoms/_utils.js


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

                // case '/':
                // case 'login':
                // case 'dashboard':
                // case 'dashboard/search':
                default:
                    // hashHistory.push('dashboard/search'); FIXME: for some reason it trows an error on console: Uncaught SyntaxError: Invalid regular expression: /^//: Stack overflow
                    return <Dashboard view="Search" setLogged={this._setLogged.bind(this)}/>;

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

        username ? LS.set('userLogged', username) : LS.remove('userLogged');

        username ? hashHistory.push('dashboard/search') : hashHistory.push('/')
    }
}

// =include ../01_components/_window.js

// =include ../01_components/_login.js
// =include ../01_components/_register.js

// =include ../01_components/_signForm.js


// =include ../01_components/_dashboard.js

// =include ../01_components/_search.js
// =include ../01_components/_favorites.js

// =include ../01_components/_artist.js


// =include ../01_components/_404.js

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
