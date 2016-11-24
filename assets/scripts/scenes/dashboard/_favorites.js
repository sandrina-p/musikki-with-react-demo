class Favorites extends React.Component {

    render() {
        const artistsFav = this._getArtistsFav();

        return <div className="ArtistsList">{artistsFav}</div>;
    }

    _getArtistsFav() {
        var userLogged = LS.get('userLogged'),
            mkUsers = LS.get('mkUsers', true),
            mkUserThis = mkUsers[userLogged],
            artistsFav = mkUserThis.favArr || [];

        if (artistsFav.length > 0 ) {
            return (
                artistsFav.map((artist) => {
                    return (
                        <Artist key={artist.id.toString()}
                            id={artist.id.toString()}
                            name={artist.name}
                            thumb={artist.thumb}
                            dates={artist.dates}
                            genres={artist.genres}
                        />
                    );
                })
            )
        } else {
            return <div className="stateEmpty">nothing yet ヾ(⌐■_■)ノ♪</div>
        }
    }
}
