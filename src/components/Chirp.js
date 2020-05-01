import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../utility/MyButton";
import DeleteChirp from "./DeleteChirp";

// MUI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// redux
import { connect } from "react-redux";
import { likeChirp, unlikeChirp } from "../redux/actions/dataActions";

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
  likedChirp = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.chirpId === this.props.chirp.chirpId
      )
    )
      return true;
    else return false;
  };

  likeChirp = () => {
    this.props.likeChirp(this.props.chirp.chirpId);
  };

  unlikeChirp = () => {
    this.props.unlikeChirp(this.props.chirp.chirpId);
  };

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

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedChirp() ? (
      <MyButton tip="Unlike" onClick={this.unlikeChirp}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeChirp}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

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
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="Replies">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{replyCount} Replies</span>
        </CardContent>
      </Card>
    );
  }
}

Chirp.propTypes = {
  likeChirp: PropTypes.func.isRequired,
  unlikeChirp: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  chirp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeChirp,
  unlikeChirp,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Chirp));
