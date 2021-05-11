from flask import Flask, render_template, url_for, request, redirect, send_file, send_from_directory
from flask_bootstrap import Bootstrap
import os
import glob
import Retrosynthesis.results_visualize as rv
from flask_cors import CORS, cross_origin

app = Flask(__name__)
Bootstrap(app)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'


# app.config["CLIENT_IMAGES"] = 'tmp/'

@app.route('/', methods=['GET'])

def home():
    print("x")
    return "<h1>Hello</h1><p>This site is a prototype API for distant reading of Drug Discovery.</p>"


@app.route('/testPost',methods=['POST'])

def testPost():
    return request.json['tweetId']

@app.route('/retrosynthesis/predict',methods=['POST'])
@cross_origin()
def retrosynthesisPredict():
    


    # print(request.get_json(),"gggggggg")
    # return request.get_json()
    try:
        smi = request.json['smi']
        print(smi)
        smi = " ".join(list(smi))
        smis = ['<RX_'+ str(e) +'> ' + smi for e in range(1,11)]

        f = open('tmp/src10.txt','w')
        for ele in smis:
            f.write(ele+'\n')
        f.close()
        
        os.system('python Retrosynthesis/translate.py -model Model/USPTO-50K_model_step_500000.pt -src tmp/src10.txt -output tmp/tgt10.txt -verbose -batch_size 64 -replace_unk -max_length 200 -beam_size 3 -n_best 1')
        f = open('tmp/tgt10.txt','r')
        f = [e.strip().replace(" ","") for e in f.readlines()]
        tmp =rv.draw_heat_map('tmp/')
        tmp = rv.draw_reaction('tmp/')

        # for c in os.listdir('tmp'):
        #     send_file('tmp/'+c)
        return {'result':f}
    except:
        return {'reuslt':[]}


@app.route("/get-image/<image_name>")
def get_image(image_name):
    
    app.config["CLIENT_IMAGES"] = 'tmp/'

    image_name = image_name.replace("$","#")
    
    try:
        return send_from_directory(app.config["CLIENT_IMAGES"], filename=image_name)
    except FileNotFoundError:
        abort(404)

# @app.route("/get-image2/<image_name>")
# def get_image2(image_name):
    
#     app.config["CLIENT_IMAGES"] = 'tmp2/'
#     print(image_name)
#     try:
#         return send_from_directory(app.config["CLIENT_IMAGES"], filename=image_name)
#     except FileNotFoundError:
#         abort(404)



@app.after_request
def add_header(response):
    response.cache_control.no_store = True
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    return response

# @app.route('/retrosynthesis',methoed='')
if __name__ == '__main__':
    app.run(debug=True)
    print("xx")
    x=5
