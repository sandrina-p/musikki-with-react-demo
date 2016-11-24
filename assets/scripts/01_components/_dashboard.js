class Dashboard extends React.Component {

    render() {

        var componentToRender = this.props.view;
        var componentLookup = {
            Search : (<Search />),
            Favorites : (<Favorites />)
        };

        return (
            <div>
                <div className="Nav">
                    <nav className="Nav-tabs">
                        <Link to="dashboard/search" className="BtnBasic--lg" activeClassName="active">Search</Link>
                        <Link to="dashboard/favorites" className="BtnBasic--lg" activeClassName="active">Favorites</Link>
                    </nav>
                    <div className="Nav-actions">
                        <Link to="/" onClick={this._handleLogOut.bind(this)} className="BtnBasic--md">Logout</Link>
                    </div>
                </div>
                {componentLookup[componentToRender]}
            </div>
        );
    }


    _handleLogOut() {
        this.props.setLogged();
    }
}
