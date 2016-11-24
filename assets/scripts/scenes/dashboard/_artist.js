
class Artist extends React.Component {

    constructor() {
        super();

        this.state = {
            isFav : null
        }
    }

    componentWillMount() {
        this._isFavoriteSet();
    }

    _isFavoriteSet() {
        var userLogged = LS.get('userLogged'),
            mkUsers = LS.get('mkUsers', true),
            mkUserThis = mkUsers[userLogged];

            if (mkUserThis.favName != null && mkUserThis.favName.indexOf(this.props.id) > -1) {
                console.log('yh its fav');
                this.setState({isFav: true})
            } else {
                console.log('not fav');
                this.setState({isFav: false})
            }
    }


    render() {
        var genres = this._getGenres(),
            thumbBg = {
                backgroundImage : "url(" + this.props.thumb + ")"
            };

        return (
            <div className="Artist">
                <div className="Artist-cover" style={thumbBg}></div>
                <div className="Artist-info">
                    <h3 className="Artist-name">
                        {this.props.name}
                        <span className="Artist-dates">
                            {this.props.dates ? this.props.dates[0] + " - " + ( (this.props.dates[1]) ? this.props.dates[1] : "now") : ""}
                        </span>
                    </h3>
                    <p className="Artist-details">{genres}</p>
                </div>
                <div className="Artist-actions">
                    <button className="BtnAct" data-fav={this.state.isFav} type="button" name="favorite" onClick={this._updateIsFav.bind(this)}>
                        <svg className="BtnAct-check" width="25px" height="25px" viewBox="0 0 91 78">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g transform="translate(-5.000000, 0.000000)" fill="#000000">
                                    <path d="M5.058,40.286 L10.939,40.286 C16.786,46.384 24.335,51.506 28.753,59.653 C30.059,62.062 32.025,63.952 35.251,63.313 C43.053,58.356 48.669,51.064 54.773,44.348 C60.994,37.504 66.324,29.833 72.696,23.146 C79.198,16.322 83.223,7.877 88.722,0.638 C91.331,-0.36 93.479,-0.365 94.957,2.218 C94.957,2.86 95.205,3.657 94.919,4.13 C91.825,9.237 88.888,14.465 85.425,19.315 C81.979,24.142 77.749,28.367 74.079,33.068 C70.047,38.231 64.957,42.535 62.331,48.796 C61.857,49.926 60.637,50.888 59.544,51.589 C52.611,56.037 48.558,63.152 43.279,69.116 C42.037,70.519 41.83,72.786 40.834,74.47 C38.433,78.528 33.276,79.322 30.89,75.502 C23.62,63.864 13.747,54.343 5.621,43.424 C5.277,42.967 5.376,42.179 5.058,40.286 L5.058,40.286 Z"></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }


    _getGenres() {
        if (this.props.genres.length > 0) {
            return (
                this.props.genres.slice(0, 4).map((genre) => {
                    return <span className="Link" key={genre.mkid}>{genre.name}</span> //possible gender search
                })
            )
        } else {
            return <span><i>too cool to be defined</i></span>
        }
    }

    _updateIsFav() {
        this._updateFavLS(!this.state.isFav);
        this.setState({isFav: !this.state.isFav});
    }

    _updateFavLS(toggle) {
        console.log('updateFavLS() '+toggle);
        var userLogged = LS.get('userLogged'),
            mkUsers = LS.get('mkUsers', true),
            mkUserThis = mkUsers[userLogged];

        switch (toggle) {
            case true:

                if (!mkUserThis.favName) {
                    mkUserThis.favName = [],
                    mkUserThis.favArr = []
                }

                if (mkUserThis.favName.indexOf(this.props.id) < 0 ) {
                    mkUserThis.favName.push(this.props.id);
                    mkUserThis.favArr.push({
                        id : this.props.id.toString(),
                        name : this.props.name,
                        thumb : this.props.thumb,
                        type : this.props.type,
                        dates : this.props.dates,
                        genres : this.props.genres
                    });
                    break;
                }

            case false:
                if (mkUserThis.favName) {
                    var favNameI = mkUserThis.favName.indexOf(this.props.id);
                    if (favNameI > -1) {
                        mkUserThis.favName.splice(favNameI, 1);
                        mkUserThis.favArr.splice(favNameI, 1);
                    }
                }
                break;

            default:
                console.log('argument missing: add or remove');

        }

        mkUsers[userLogged] = mkUserThis; //update mkUsers with new favorite
        LS.set('mkUsers', mkUsers, true);
    }

}
