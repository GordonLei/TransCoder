from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
import subprocess

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://172.21.171.80:3000/"]}}) 
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route("/runScript", methods=["POST"])
def runScript():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        return json
    else:
        return 'Content-Type not supported!'

@app.route("/uploadFile", methods=["POST"])
def uploadFile():
    print("REQUEST", request.files)
    f = request.files['file']
    #   f.save(f.filename)
    f.save(f"data/{f.filename}" )
    print(f)
    srcLang = "java"
    tgtLang = "python"
    modelPath = "../model_2.pth"
    #p = subprocess.run(["python","../translate.py","--src_lang","cpp","--tgt_lang","java","--model_path","../model_1.pth", "--BPE_path", "../data/BPE_with_comments_codes", ">", f"data/{f.filename}"],  shell=True )
    p = subprocess.run(f"python ../translate.py --src_lang {srcLang} --tgt_lang {tgtLang} --model_path {modelPath} --BPE_path ../data/BPE_with_comments_codes < data/{f.filename}", shell=True)
    return "saved"

    

api.add_resource(HelloApiHandler, '/flask/hello')