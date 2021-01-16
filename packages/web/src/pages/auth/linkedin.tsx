import React from 'react';
import compose from 'recompose/compose';
// import withProps from 'recompose/withProps';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import qs from 'qs';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { authorization } from 'linkedin';
import withQuery from 'core/withQuery';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

type Props = {
  data: any;
  history: History;
};

function LinkedIn({ data, history }: Props) {
  const classes = useStyles();

  React.useEffect(() => {
    console.debug({ data });
    if (data) {
      window.firebase
        .auth()
        .signInWithCustomToken(data)
        .then((user) => {
          // Signed in
          console.debug(user);
          history.replace('/');
        })
        .catch((error) => {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          console.error(error);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <main className={classes.content}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        href={authorization.toString()}
        className={classes.button}
        startIcon={<LinkedInIcon />}>
        Sign In with LinkedIn
      </Button>
    </main>
  );
}

const fetcher = (key: string, code: string) => {
  console.debug({ key, code });
  return axios.get(key, { params: { code } }).then(({ data }) => data);
};

export default compose<Props, any>(
  withRouter,
  withQuery(({ location }: any) => {
    const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
    return code ? ['/api/auth/linkedin', code] : null;
  }, fetcher)
  // withProps(console.debug)
)(LinkedIn);
