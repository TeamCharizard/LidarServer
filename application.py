from flask import Flask, render_template, request
from flask.ext.socketio import SocketIO, emit
import json

class LidarServer:

    data = {'data': []}

    def __init__(self):
        pass

    def publish_data(self):
        try :
            self.data = json.loads(request.form['data'])
            print self.data
            return "success\n"
        except KeyError:
            return "key 'data' not found\n"

    def get_data(self):
        return self.data


app = Flask(__name__)
socketio = SocketIO(app)
lds = LidarServer()

test_data = {'data': [{'t':-1,'r':-1}]}

@app.route('/')
def get_root():
    return render_template('index.html')

@app.route('/data/')
def index():
    return render_template('data.html')

# when we get a post full of data, send it!
@app.route("/publish/",  methods = ['POST'])
def publish_data():
    return lds.publish_data()

# when we get a request for data, send it!
@socketio.on('update')
def get_data():
    d = lds.get_data()
    print d
    print test_data
    return d

if __name__ == '__main__':
    app.debug = True
    socketio.run(app)


