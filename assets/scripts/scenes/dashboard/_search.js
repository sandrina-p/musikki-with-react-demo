
class Search extends React.Component {

    constructor() {
        super();

        this.state = {
            searchValue: "",
            artistsFound: null
        };
    }

    _onSearch(){
        var value = this._search.value,
            artistsFoundLoad = [];

        this.setState({searchValue: value});

        if (value.length > 0) {

            Ajx.getJSON('GET', `https://music-api.musikki.com/v1/artists?q=[artist-name:${value}]&appkey=123456789&appid=123456789&limit=6`)
                .then((response) => {
                    // console.log(response);
                    for(var i = 0, artist = {}, keyString = "", artists = response.results, artistsLength = artists.length; i < artistsLength; i++) {
                        artist = {
                            id: artists[i].mkid,
                            name: artists[i].name,
                            thumb: artists[i].image,
                            dates: artists[i].dates ? [artists[i].dates.start.year, artists[i].dates.end] : null,
                            genres: artists[i].genres
                        }
                        artistsFoundLoad.push(artist);
                    }
                    this.setState({artistsFound: artistsFoundLoad });
                })
                .catch(function (response) {
                    console.error('Augh, there was an error!', response);
                });

        } else {
            this.setState({artistsFound: null });
        }

    }

    _getArtists() {
        let artists = this.state.artistsFound
        if (artists != null) {
            if (artists.length > 0) {

                return (
                    artists.map((artist) => {
                        return (
                            <Artist
                                key={artist.id.toString()}
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
                return <div className="stateEmpty">Holy, who are they? (ಠ~ಠ)</div>
            }
        }
    }

    render() {
        const artists = this._getArtists();
        let artistsNodes = <div className="ArtistsList">{artists}</div>

        return (
            <div>
                <div className="InputSearch">
                    <label htmlFor="searchArtist" hidden>Artist Name</label>
                    {/* type="text" because "search" customized css is not supported on safari  */}
                    <input id="searchArtist" type="text" name="searchArtist" placeholder="Artist Name" ref={(input) => this._search = input} onChange={this._onSearch.bind(this)}/>
                    <svg className="InputSearch-svg" width="18px" height="18px" viewBox="0 0 60 60">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path d="M59.1423313,55.2805043 C53.0483313,48.9715043 48.1303313,41.8745043 42.9653313,34.8175043 C42.5853313,34.3015043 42.1203313,33.9775043 41.6273313,33.7925043 C46.2023313,27.6195043 49.0563313,19.8485043 47.9153313,12.4835043 C45.7943313,-1.23649572 30.3703313,-1.21549572 19.7493313,1.26150428 C15.8623313,2.16850428 12.0793313,3.52450428 8.36533126,4.96950428 C6.08233126,5.85650428 6.02633126,8.65350428 7.28633126,9.95450428 C-0.367668741,16.8285043 -3.37666874,27.0245043 5.14833126,37.4855043 C13.0083313,47.1355043 25.3743313,48.2585043 35.0233313,40.6585043 C41.4803313,47.1375043 48.0643313,53.4635043 55.1443313,59.2825043 C57.9133313,61.5585043 61.7283313,57.9535043 59.1423313,55.2805043 L59.1423313,55.2805043 Z M15.1673313,38.6515043 C8.69733126,35.2645043 3.73933126,27.7035043 6.11133126,20.4635043 C9.58733126,9.85950428 24.4293313,5.35450428 34.2283313,7.41550428 C35.4783313,7.68050428 36.4673313,7.16850428 37.0823313,6.37250428 C38.7913313,7.17650428 40.2503313,8.39550428 41.3063313,10.1875043 C45.1503313,16.7155043 40.2993313,26.3725043 36.2093313,31.5465043 C35.8783313,31.9665043 35.5303313,32.3765043 35.1713313,32.7805043 C35.1533313,32.7685043 35.1443313,32.7525043 35.1303313,32.7425043 C32.6213313,30.1865043 28.7343313,33.9935043 31.0153313,36.5935043 C26.3943313,39.9805043 20.7203313,41.5565043 15.1673313,38.6515043 L15.1673313,38.6515043 Z"></path>
                        </g>
                    </svg>
                </div>
                {artistsNodes}
            </div>
        )
    }
}
