import sys
sys.path.insert(1, './Generative/CGVAE')

from flask import Flask, render_template, url_for, request, redirect, send_file, send_from_directory
from flask_bootstrap import Bootstrap
from flask_cors import CORS, cross_origin
import pickle
import os
import glob
from CGVAE import generate_from_model

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

@app.route('/generative/generate',methods=['POST'])
def generate():
    path = request.json['path']
    generated_smiles_with_qed = []
    if path=='CGVAE':        
        # choice 1 : pickle
        with open(f'./Generative/{path}/pkl/generated_smiles_with_qed.pkl', "rb") as generated_smiles_with_qed_file:
            generated_smiles_with_qed = pickle.load(generated_smiles_with_qed_file)

        # choice 2 : actual run
        # args = {'--config': '{"generation": true, "number_of_generation": 2, "random_seed":15}',
        #         '--config-file': None,
        #         '--data_dir': 'Generative/CGVAE',
        #         '--dataset': 'zinc',
        #         '--freeze-graph-model': False,
        #         '--help': False,
        #         '--log_dir': None,
        #         '--restore': 'Generative/CGVAE/pkl/3_zinc.pickle'}

        # generated_smiles_with_qed = generate_from_model(args)

    return {'result' : dict(generated_smiles_with_qed)}
    
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
    app.run(debug=True, port=5555)
