import React from 'react';

export default function CommentForm({
  commentName, setCommentName,
  newComment, setNewComment,
  rating, setRating,
  hoverRating, setHoverRating,
  renderStars,
  onSubmit
}) {
  return (
    <form className="comment-form" onSubmit={onSubmit}>
      <label className="comment-label">
        Emri juaj
        <input
          type="text"
          value={commentName}
          onChange={(e) => setCommentName(e.target.value)}
          placeholder="Shkruani emrin tuaj"
          maxLength={40}
        />
      </label>
      <label className="comment-label">
        Vlerësimi
        <div className="star-picker" onMouseLeave={() => setHoverRating(null)}>
          <div className="star-display">{renderStars(hoverRating || rating)}</div>
          <div className="star-overlay" aria-hidden>
            {Array.from({ length: 10 }).map((_, i) => {
              const val = (i + 1) * 0.5;
              return (
                <button
                  key={val}
                  type="button"
                  className={`star-hit ${(hoverRating || rating) >= val ? 'active' : ''}`}
                  onMouseEnter={() => setHoverRating(val)}
                  onClick={() => setRating(val)}
                  aria-label={`Rate ${val}`}
                />
              );
            })}
          </div>
        </div>
      </label>
      <label className="comment-label">
        Komenti juaj
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Shkruani koment tuaj këtu..."
          maxLength={240}
          rows={4}
        />
      </label>
      <button className="home-button" type="submit">Posto Komentin</button>
    </form>
  );
}
