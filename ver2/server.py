from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route("/")
def index():
  songs = ["/static/audio/song1.mp3", "/static/audio/song2.mp3", "/static/audio/song3.mp3"]
  return render_template("index.html", songs=songs)



if __name__ == "__main__":
  app.run(debug=True)
