import React from "react";
import "./ReviewCard.css";

interface ReviewCardProps {
  username: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
  onLike?: () => void;
  onDislike?: () => void;
  userLiked?: boolean;
  userDisliked?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  username,
  avatar,
  date,
  rating,
  comment,
  likes,
  dislikes,
  onLike,
  onDislike,
  userLiked = false,
  userDisliked = false,
}) => {
  // 渲染星级评分
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? "filled" : "empty"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="user-info">
          <img src={avatar} alt={username} className="user-avatar" />
          <div className="user-details">
            <h3 className="username">{username}</h3>
            <p className="review-date">{date}</p>
          </div>
        </div>
      </div>
      
      <div className="review-rating">{renderStars()}</div>
      
      <p className="review-comment">{comment}</p>
      
      <div className="review-actions">
        <button 
          className={`action-button like-button ${userLiked ? 'active' : ''}`} 
          onClick={onLike}
        >
          <span className="action-icon">👍</span>
          <span className="action-count">{likes}</span>
        </button>
        <button 
          className={`action-button dislike-button ${userDisliked ? 'active' : ''}`} 
          onClick={onDislike}
        >
          <span className="action-icon">👎</span>
          <span className="action-count">{dislikes}</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;