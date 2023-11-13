from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    songs = sorted(os.listdir('music'))
    return render_template('index.html', songs=songs)

@app.route('/play/<path:filename>')
def play(filename):
    return send_from_directory('music', filename)

if __name__ == '__main__':
    app.run(debug=True)

