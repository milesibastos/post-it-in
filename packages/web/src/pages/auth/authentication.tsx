import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { authorization } from '../../linkedin';

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

export default function Authentication() {
  const classes = useStyles();
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
