import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  ...theme.restOfTheme,
  replyImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
    padding: 10,
  },
  replyData: {
    marginLeft: 20,
  },
});

class Replies extends Component {
  render() {
    const { replies, classes } = this.props;
    return (
      <Grid container>
        {replies.map((reply, index) => {
          const { body, createdAt, userImage, userHandle } = reply;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="reply"
                      className={classes.replyImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.replyData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="secondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeparator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== replies.length - 1 && (
                <hr className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Replies.propTypes = {
  replies: PropTypes.array.isRequired,
};

export default withStyles(styles)(Replies);
