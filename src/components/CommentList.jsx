import React from 'react';

export default function CommentList({ comments, renderStars, formatDate }){
  return (
    <ul className="comment-list">
      {comments.map((c) => (
        <li key={c.id} className="comment-item">
          <div className="comment-meta">
            <div className="avatar">{(c.name || 'Anon').slice(0,2).toUpperCase()}</div>
            <div>
              <strong>{c.name || 'Anon'}</strong>
              <div className="muted small">{formatDate(c.createdAt)}</div>
            </div>
          </div>
          <p>{c.text}</p>
          <div className="comment-footer">
            <span className="comment-rating">{renderStars(c.rating || 0)} {c.rating ? `${c.rating}/5` : ""}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
