from flask import Flask,render_template
import os


app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')
if __name__ == '__main__':
    # It is crucial to use os.environ.get for the PORT
    port = int(os.environ.get("PORT", 8000))
    # host='0.0.0.0' is required for the server to be accessible externally
    app.run(host='0.0.0.0', port=port)
