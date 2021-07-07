# @author Konstantin Bogdanoski (konstantin.b@live.com)

import os
import tempfile

from flask import Flask, request
from flask import jsonify, send_file
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename

from backend.exceptions import *

UPLOAD_FOLDER = os.path.join(tempfile.gettempdir(), '')
ALLOWED_EXTENSIONS = {'pkl', 'pickle', 'csv'}

app = Flask(__name__)
cors = CORS(app, resources={r"/rest/*": {"origins": "*"}})
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

embeddings_path = None
group_names_path = None
names_path = None


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', "*")
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Headers', 'Cache-Control')
    response.headers.add('Access-Control-Allow-Headers', 'X-Requested-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    return response


@app.route("/rest/group_names", methods=['POST', 'OPTIONS'])
@cross_origin()
def upload_group_names():
    if 'file' not in request.files:
        raise NoFileFound("No group-names file was uploaded", status_code=400)
    file = request.files['file']
    if file.filename == '':
        raise NoFileFound("No file was uploaded", status_code=400)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        global group_names_path
        group_names_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        return "Successfully uploaded group names"


@app.route("/rest/embeddings", methods=['POST', 'OPTIONS'])
@cross_origin()
def upload_embeddings():
    if 'file' not in request.files:
        raise NoFileFound("No embeddings file was uploaded", status_code=400)
    file = request.files['file']
    if file.filename == '':
        raise NoFileFound("No file was uploaded", status_code=400)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        global embeddings_path
        embeddings_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        return "Successfully uploaded embeddings"


@app.route("/rest/names", methods=['POST', 'OPTIONS'])
@cross_origin()
def upload_names():
    if 'file' not in request.files:
        raise NoFileFound("No names file was uploaded", status_code=400)
    file = request.files['file']
    if file.filename == '':
        raise NoFileFound("No file was uploaded", status_code=400)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        global names_path
        names_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        return "Successfully uploaded names"


@app.route("/rest/clusterize", methods=['POST', 'OPTIONS'], )
@cross_origin()
def clusterize():
    global names_path
    global group_names_path
    global embeddings_path

    if embeddings_path == "" or embeddings_path is None:
        raise NoFileFound("File with names could not be found", status_code=404)

    if names_path == "" or names_path is None:
        raise NoFileFound("File with names could not be found", status_code=404)

    validate_payload(request)

    blanket_clusterer_path = "\"" + request.form["blanketClustererPath"] + "\" "
    model_type = "\"" + request.form["modelType"] + "\""
    num_clusters = "\"" + request.form["numClusters"] + "\""
    num_items = "\"" + request.form["numItems"] + "\""
    max_depth = "\"" + request.form["maximumDepth"] + "\""
    output_path = "\"" + request.form["outputPath"] + "\""

    command = "python " + blanket_clusterer_path
    command += model_type + " " + num_clusters + " " + embeddings_path + " " + names_path + " " + num_items
    command += " " + max_depth + " " + output_path
    if group_names_path is not None:
        command += " " + group_names_path

    os.system(command)

    with open(request.form["outputPath"], "r") as output_json:
        output = output_json.read()
    with open(r"../visualization/Results.html", "r") as output_html:
        op_html = output_html.read()

    op_html = op_html.replace("{{{output.json}}}", output)

    output_file = open(r"../visualization/Results-Copy.html", "w")
    output_file.write(op_html)

    return "Clustering completed"


def validate_payload(request):
    if request.form["blanketClustererPath"] == "" or request.form["blanketClustererPath"] is None:
        raise NoFileFound("Absolute path to blanket clusterer is not provided", status_code=404)

    if request.form["modelType"] == "" or request.form["modelType"] is None:
        raise NoFileFound("Clustering type is not provided", status_code=404)

    if request.form["numClusters"] == "" or request.form["numClusters"] is None:
        raise NoFileFound("Number of clusters is not provided", status_code=404)

    if request.form["numItems"] == "" or request.form["numItems"] is None:
        raise NoFileFound("Number of items in cluster is not provided", status_code=404)

    if request.form["maximumDepth"] == "" or request.form["maximumDepth"] is None:
        raise NoFileFound("Maximum depth is not provided", status_code=404)

    if request.form["outputPath"] == "" or request.form["outputPath"] is None:
        raise NoFileFound("Absolute path to output file is not provided", status_code=404)
    return True


@app.route("/rest/output", methods=['GET', 'OPTIONS'])
@cross_origin()
def get_output():
    return send_file("../visualization/Results-Copy.html",
                     mimetype="text/html")


@app.route("/<path:path>", methods=['GET', 'OPTIONS'])
@cross_origin()
def get_js(path):
    if "js" in path or "css" in path:
        return send_file("../visualization/" + request.path.replace("rest/", ""))
    return send_file("../visualization" + request.path)


# Error handlers


@app.errorhandler(NoFileFound)
def handle_no_file_found(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
