from flask import Flask, render_template, request, redirect

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/game', methods=['POST', 'GET'])
def game_site():
    image_num = int(request.args.get('image-num', 3))
    return render_template('game.html', image_num=image_num)


if __name__ == '__main__':
    app.run(debug=True)
