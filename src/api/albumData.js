import React from 'react';
import queryString from 'query-string';
import { getAlbums } from './api';
import { getSavedAlbums, updateSavedAlbums, resetProgress } from '../utils';

function withAlbumData(Component) {
  return class albumData extends React.Component {
    state = {
      error: null,
      loading: true,
      totalAlbums: 0,
      pendingAlbums: [],
      guessedAlbums: []
    };

    componentDidMount() {
      const { location, history } = this.props;
      let service = localStorage.getItem('service');

      // The user might have another serivce saved in his localStorage although they already have progress.
      if (service !== 'cache' && getSavedAlbums()[0].length > 0) {
        service = 'cache';
      }

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
        this.setState({ error: err.message });
      }
    }

    moveFirstAlbumToArrayEnd = () => {
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

      return (
        <Component
          nextAlbum={pendingAlbums[0]}
          totalAlbums={totalAlbums}
          progress={guessedAlbums.length}
          moveFirstAlbumToArrayEnd={this.moveFirstAlbumToArrayEnd}
          moveAlbumToGuessedArray={this.moveFirstAlbumToArrayEnd}
          resetGuessedAlbums={this.resetGuessedAlbums}
          error={error}
          loading={loading}
        />
      );
    }
  };
}

export default withAlbumData;
