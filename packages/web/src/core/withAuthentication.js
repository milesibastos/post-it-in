import lifecycle from 'recompose/lifecycle';

export default function withAuthentication(WrappedComponent) {
  // const user = window.firebase.auth().currentUser.toJSON();
  // const [user, setUser] = useState(window.firebase.auth().currentUser.toJSON())
  const WithAuthentication = lifecycle({
    componentDidMount() {
      window.firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          this.setState({ user: user.toJSON() });
          // ...
        } else {
          // User is signed out
          this.setState({ user: null });
        }
      });
    }
  })(WrappedComponent);
  WithAuthentication.displayName = `WithAuthentication(${getDisplayName(
    WrappedComponent,
  )})`;
  return WithAuthentication;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
