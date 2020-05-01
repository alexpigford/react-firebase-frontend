import React, { Component } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../utility/MyButton";
import DeleteChirp from "./DeleteChirp";
import ChirpDialog from "./ChirpDialog";
import LikeButton from "./LikeButton";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

//icons
import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Chirp extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      chirp: {
        body,
        createdAt,
        userImage,
        userHandle,
        chirpId,
        likeCount,
        replyCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteChirp chirpId={chirpId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="profile image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton chirpId={chirpId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="Replies">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{replyCount} Replies</span>
          <ChirpDialog
            chirpId={chirpId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Chirp.propTypes = {
  user: PropTypes.object.isRequired,
  chirp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Chirp));
