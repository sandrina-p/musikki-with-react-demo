 class Window extends React.Component {

     constructor() {
         super();

         this.state = {
            linksFooter: [
                ['https://github.com/sandrina-p', 'sandrina-p'],
                ['https://github.com/sandrina-p/musikki-with-react-demo', 'github'],
                ['https://musikki.com', 'Powered by Musikki']
            ]
         };
     }

    render() {
        //get window title NOTE: I fell this is not the best approach but it works x)
        let viewTitle = window.location.hash.split('/');
        let viewTitleKey = viewTitle[viewTitle.length - 1];
        viewTitle = viewTitleKey == "" ? 'Musikki' : 'Musikki . '+viewTitleKey;

        let linksLi = this._getLinksFooter();
        let linksUl = <ul className="Window-footer-ul">{linksLi}</ul>

        return (
            <div className="Window">
                <header className="Window-header">
                    <h1>{viewTitle}</h1>
                </header>
                <main className="Window-main">
                    {this.props.children}
                </main>
                <footer className="Window-footer">
                    <h6 className="sr-only">Footer</h6>
                    {linksUl}
                </footer>
            </div>
        )
    }

    _getLinksFooter() {
        return (
            this.state.linksFooter.map((link, index) => {
                return <li key={index}> <a target="_blank" href={link[0]} className="Link">{link[1]}</a> </li>
            })
        )
    }
}
