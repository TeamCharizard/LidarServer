from flask import Flask, render_template, request
from flask.ext.socketio import SocketIO, emit
import json

class LidarServer:

    data = {'data': [(0,400),
        (45,300)]
        }

    def __init__(self):
        pass

    def publish_data(self):
        try :
            self.data = json.loads(request.form['data'])
            print "DATA: ", self.data
            return "success\n"
        except KeyError:
            print request.form
            return "Key Error: " + ",".join(request.form.keys())
        except ValueError:
            return "Value Error: " + request.form['data']

    def get_data(self):
        return self.data


application = Flask(__name__)
socketio = SocketIO(application)
lds = LidarServer()

@application.route('/')
def get_root():
    return render_template('index.html')

@application.route('/data/')
def index():
    return render_template('data.html')

# when we get a post full of data, send it!
@application.route("/publish/",  methods = ['POST'])
def publish_data():
    return lds.publish_data()

# when we get a request for data, send it!
@socketio.on('update')
def get_data():
    d = lds.get_data()
    return d

if __name__ == '__main__':
    application.debug = True
    socketio.run(application)


