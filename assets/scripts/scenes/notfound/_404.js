class NotFound extends React.Component {
    render() {
        return (
            <div className="stateEmpty">
                <p>I think you are lost. Aren't you? ¯¯\_(ツ)_/¯¯</p>
                <Link to="login" className="BtnBasic--md" activeClassName="active">Get on track</Link>
            </div>
        )
    }
}
