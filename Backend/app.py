from flask import Flask
from board.routes import bp as board_bp
from board.models import init_db
from category.routes import bp as category_bp
def create_app():
    app = Flask(__name__)
    
    # 블루프린트 등록
    app.register_blueprint(board_bp, url_prefix='/posts')
    app.register_blueprint(category_bp,url_prefix = '/category_search')
    # 데이터베이스 초기화
    with app.app_context():
        init_db()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
