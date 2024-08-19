from flask import Blueprint, jsonify, request, abort
from board.models import get_db

bp = Blueprint('board', __name__)

# 모든 게시물 조회
@bp.route('', methods=['GET'])
def get_posts():
    cursor = get_db().cursor()
    cursor.execute('SELECT id, title, content FROM posts')
    posts = cursor.fetchall()
    return jsonify([{'id': row[0], 'title': row[1], 'content': row[2]} for row in posts])

# 특정 게시물 조회
@bp.route('/<int:post_id>', methods=['GET'])
def get_post(post_id):
    cursor = get_db().cursor()
    cursor.execute('SELECT id, title, content FROM posts WHERE id = ?', (post_id,))
    post = cursor.fetchone()
    if post is None:
        abort(404)
    return jsonify({'id': post[0], 'title': post[1], 'content': post[2]})

# 게시물 작성
@bp.route('', methods=['POST'])
def create_post():
    if not request.json or not 'title' in request.json or not 'content' in request.json:
        abort(400)
    title = request.json['title']
    content = request.json['content']
    cursor = get_db().cursor()
    cursor.execute('INSERT INTO posts (title, content) VALUES (?, ?)', (title, content))
    get_db().commit()
    return jsonify({'id': cursor.lastrowid, 'title': title, 'content': content}), 201

# 게시물 수정
@bp.route('/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    if not request.json:
        abort(400)
    title = request.json.get('title')
    content = request.json.get('content')
    cursor = get_db().cursor()
    cursor.execute('UPDATE posts SET title = ?, content = ? WHERE id = ?', (title, content, post_id))
    get_db().commit()
    if cursor.rowcount == 0:
        abort(404)
    return jsonify({'id': post_id, 'title': title, 'content': content})

# 게시물 삭제
@bp.route('/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    cursor = get_db().cursor()
    cursor.execute('DELETE FROM posts WHERE id = ?', (post_id,))
    get_db().commit()
    if cursor.rowcount == 0:
        abort(404)
    return '', 204
