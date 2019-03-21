import React from 'react';
import queryString from 'query-string';
import ReactLoading from 'react-loading';
import { getAlbums } from './api';
import { getSavedAlbums, updateSavedAlbums, resetProgress } from '../utils';

function withAlbumData(Component) {
  return class albumData extends React.Component {
    state = {
      loading: true,
      totalAlbums: 0,
      pendingAlbums: [],
      guessedAlbums: []
    };

    componentDidMount() {
      const { location, history } = this.props;
      const service = localStorage.getItem('service');

      switch (service) {
        case 'spotify':
          const parsedURL = queryString.parse(location.hash);
          this.getAlbumList('spotify', parsedURL.access_token);
          break;
        case 'appleMusic':
          const musicKit = window.MusicKit.getInstance();
          musicKit.authorize().then(() => {
            this.getAlbumList('appleMusic');
          });
          break;
        case 'cache':
          this.loadFromCache();
          break;
        default:
          history.push('/');
      }
    }

    loadFromCache = () => {
      const [pendingAlbums, guessedAlbums] = getSavedAlbums();
      const totalAlbums = pendingAlbums.length + guessedAlbums.length;
      this.setState({ pendingAlbums, guessedAlbums, totalAlbums, loading: false }, this.setNewAlbum);
    };

    async getAlbumList(service, token) {
      try {
        const pendingAlbums = await getAlbums(service, token);
        const nextAlbum = pendingAlbums[0];
        this.setState({ pendingAlbums, nextAlbum, totalAlbums: pendingAlbums.length, loading: false });
      } catch (err) {
        throw new Error(err.message);
      }
    }

    moveFirstAlbumToEnd = () => {
      const { pendingAlbums, guessedAlbums } = this.state;
      const newPending = [...pendingAlbums];
      newPending.push(newPending.shift());

      updateSavedAlbums(newPending, guessedAlbums);
      this.setState({ pendingAlbums: newPending });
    };

    moveAlbumToGuessedArray = () => {
      const { pendingAlbums, guessedAlbums } = this.state;
      // Will large arrays cloning cause a performance issue?..
      const newPending = [...pendingAlbums];
      const newGuessed = [...guessedAlbums];
      newGuessed.push(newPending.shift());

      updateSavedAlbums(newPending, newGuessed);
      this.setState({ pendingAlbums: newPending, guessedAlbums: newGuessed });
    };

    resetGuessedAlbums = () => {
      resetProgress();
      this.loadFromCache();
    };

    render() {
      const { pendingAlbums, guessedAlbums, totalAlbums, loading, error } = this.state;

      if (error) {
        return (
          <div className="error-container">
            <h1>{this.state.error}</h1>
            <Link to="/">
              <Button type="warning">Try again?</Button>
            </Link>
          </div>
        );
      }

      if (loading) {
        return (
          <div className="loading-state">
            <ReactLoading type="bubbles" color="black" height={150} width={150} />
            <h1 style={{ marginTop: 0 }}>Loading...</h1>
          </div>
        );
      }

      return (
        <Component
          nextAlbum={pendingAlbums[0]}
          totalAlbums={totalAlbums}
          progress={guessedAlbums.length}
          moveFirstAlbumToEnd={this.moveFirstAlbumToEnd}
          moveAlbumToGuessedArray={this.moveAlbumToGuessedArray}
          resetGuessedAlbums={this.resetGuessedAlbums}
        />
      );
    }
  };
}

export default withAlbumData;
