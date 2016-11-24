class Window extends React.Component {

    render() {
        //get window title. REVIEW: I know this is not the best approach but it works x)
        let viewTitle = window.location.hash.split('/');
        let viewTitleKey = viewTitle[viewTitle.length - 1];
        viewTitle = viewTitleKey == "" ? 'Musikki' : 'Musikki . '+viewTitleKey;

        return (
            <div className="Window">
                <header className="Window-header">
                    <h1>{viewTitle}</h1>
                </header>
                <main className="Window-main">
                    {this.props.children}
                </main>
                <footer className="Window-footer">
                    <h6><a href="https://github.com/sandrina-p" className="Link">sandrina-p's first React project</a> . <a href="git" className="Link">github</a> . <i><a href="https://musikki.com" className="Link">Powered by Musikki</a></i> </h6>
                </footer>
            </div>
        )
    }
    
}
