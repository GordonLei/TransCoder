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
    print("BODY", request.headers)
    f = request.files['file']
    #   f.save(f.filename)
    f.save(f"data/{f.filename}" )
    print(f)
    srcLang = request.headers["Sourcelang"]
    tgtLang = request.headers["Targetlang"]
    modelPath = "../model_1.pth"
    if (srcLang == "cpp" and tgtLang == "java") or \
        (srcLang == "java" and tgtLang == "cpp") or \
        (srcLang == "java" and tgtLang == "python"):
            modelPath = "../model_1.pth"
    elif (srcLang == "cpp" and tgtLang == "python") or \
    (srcLang == "python" and tgtLang == "cpp") or \
    (srcLang == "python" and tgtLang == "java"):
        modelPath = "../model_2.pth"
    print(f"python ../translate.py --src_lang {srcLang} --tgt_lang {tgtLang} --model_path {modelPath} --BPE_path ../data/BPE_with_comments_codes < data/{f.filename} > frontend/src/output.txt")
    #p = subprocess.run(["python","../translate.py","--src_lang","cpp","--tgt_lang","java","--model_path","../model_1.pth", "--BPE_path", "../data/BPE_with_comments_codes", ">", f"data/{f.filename}"],  shell=True )
    p = subprocess.run(f"python ../translate.py --src_lang {srcLang} --tgt_lang {tgtLang} --model_path {modelPath} --BPE_path ../data/BPE_with_comments_codes < data/{f.filename} > frontend/src/output.txt", shell=True)
    return "saved"

    

api.add_resource(HelloApiHandler, '/flask/hello')