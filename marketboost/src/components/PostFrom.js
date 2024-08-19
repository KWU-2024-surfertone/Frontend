import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const newPost = {
            title: title,
            content: content,
            date: new Date().toLocaleString(),
            comments: [], // 댓글 배열 추가
        };

        setPosts([newPost, ...posts]);

        setTitle('');
        setContent('');
    };

    const handleAddComment = (postIndex, comment) => {
        const newPosts = [...posts];
        newPosts[postIndex].comments.push({
            text: comment,
            date: new Date().toLocaleString(),
        });
        setPosts(newPosts);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <h1>게시판</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
                <div  style={{ marginBottom: '10px', width: '100%' }}>
                    
                    <input className='input'
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        placeholder="제목"
                        style={{fontSize: '18px', border: '2px solid black', borderRadius: '10px'}}
                    />
                </div>
                <div style={{ marginBottom: '10px', width: '100%' }}>
                    
                    <textarea className='textarea'
                        id="content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                        placeholder="내용"
                        style={{fontSize: '20px', border: '2px solid black', borderRadius: '10px' }}
                    />
                </div>
                <button tyle={{ padding: '10px 20px' }} type="submit">작성 완료</button>
            </form>

            <h2 style={{ marginTop: '50px' }}>글 목록</h2>
            <ul style={{ listStyleType: 'none', padding: 0, width: '100%', maxWidth: '400px' }}>
                {posts.map((post, index) => (
                    <li key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px', fontSize: '16px' }}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p><small>{post.date}</small></p>

                        <CommentSection 
                            postIndex={index} 
                            comments={post.comments} 
                            onAddComment={handleAddComment} 
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CommentSection({ postIndex, comments, onAddComment }) {
    const [comment, setComment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment.trim()) {
            onAddComment(postIndex, comment);
            setComment('');
        }
    };

    return (
        <div style={{borderTop: '1px solid #ccc'}}>
            <h4>댓글</h4>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="댓글을 입력하세요" 
                    required 
                    style={{marginRight: '10px', height: '20px'}}
                />
                <button type="submit" style={{verticalAlign: 'baseline'}}>댓글 작성</button>
            </form>
            <ul>
                {comments.map((c, index) => (
                    <li key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
                        <p>{c.text}</p>
                        <p><small>{c.date}</small></p>
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: '40px', borderTop: '2px solid #000', paddingTop: '20px' }}>
                <h3>결론</h3>
                <p>주변에 파스타집이 생기면 좋겠습니다.</p>
                <p>패스트푸드점이 생겼으면 좋겠습니다.</p>
                <p>카페 수가 너무 많습니다.</p>
            </div>
        </div>
    );
}

export default PostForm;
